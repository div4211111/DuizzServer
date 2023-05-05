import { Injectable } from '@nestjs/common';
import { Difficulty, Question, QuizResult } from '@prisma/client';

import { CreateQuizResultDto } from './dto/createQuizResult.dto';
import { CountAnswersInvalidException } from './exceptions/countAnswerInvalid.exception';
import { CreateQuizResultException } from './exceptions/createQuizResult.exception';
import { DeleteQuizResultException } from './exceptions/deleteQuizResult.exception';
import { GetAllQuizResultException } from './exceptions/getAllQuizResult.exception';
import { GetByUserIdQuizResultNotFoundException } from './exceptions/getByUserIdQuizResultNotFound.exception';
import { UpdateQuizResultException } from './exceptions/updateQuizResult.exception';
import { FindAllQuizResultQuery } from './types/findAllQuizResultQuery';
import { ResponseCreateResult } from './types/responseCreateQuizResult';
import { UpdateQuizResultDto } from './dto/updateQuizResult.dto';
import { PrismaService } from '@/src/prisma/prisma.service';
import { QuizService } from '@/src/quiz/quiz.service';
import { QuestionService } from '@/src/question/question.service';
import { UserService } from '@/src/user/user.service';
import { SortType } from '@/src/common/types/sort.type';

@Injectable()
export class QuizResultService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly quizService: QuizService,
        private readonly questionService: QuestionService,
        private readonly userService: UserService,
    ) {}

    async getAll({
        authorId,
        quizId,
        sortByDate,
        sortByValue,
        take,
        skip,
    }: FindAllQuizResultQuery): Promise<QuizResult[]> {
        try {
            return this.prisma.quizResult.findMany({
                where: {
                    ...(authorId !== undefined ? { authorId } : {}),
                    ...(quizId !== undefined ? { quizId } : {}),
                },
                orderBy: [
                    sortByDate === undefined
                        ? null
                        : sortByDate === SortType.ASC
                        ? { createdAt: 'asc' }
                        : { createdAt: 'desc' },
                    sortByValue === undefined
                        ? null
                        : sortByDate === SortType.ASC
                        ? { value: 'asc' }
                        : { value: 'desc' },
                ],
                skip,
                take,
            });
        } catch (_) {
            throw new GetAllQuizResultException();
        }
    }

    async getById(id: number): Promise<QuizResult[]> {
        try {
            return await this.prisma.quizResult.findMany({ where: { authorId: id } });
        } catch (_) {
            throw new GetByUserIdQuizResultNotFoundException(id);
        }
    }

    async createQuizResult(
        { quizId, answers, time }: CreateQuizResultDto,
        userId: number,
    ): Promise<ResponseCreateResult[]> {
        const quiz = await this.quizService.getById(quizId);
        const questions = await this.questionService.getByQuizId(quizId);
        const { value, result } = this.calculateValue(questions, answers, time, quiz.difficulty);

        const quizResult = await this.prisma.quizResult.findFirst({
            where: {
                authorId: userId,
                quizId,
            },
        });

        if (!quizResult) {
            await this.create(value, quizId, userId);
        } else if (quizResult.value <= value) {
            await this.update({ value, authorId: userId }, quizResult.id);
        }

        return result;
    }

    async update({ value, authorId }: UpdateQuizResultDto, id: number): Promise<QuizResult> {
        try {
            const quizResult = await this.prisma.quizResult.update({
                where: { id },
                data: { value },
            });
            const newRating = await this.getAllQuizResultValueByUserId(authorId);
            await this.userService.updateRating(newRating, authorId);
            return quizResult;
        } catch (e) {
            console.error(e);
            throw new UpdateQuizResultException(id);
        }
    }

    async create(value: number, quizId: number, authorId: number): Promise<QuizResult> {
        try {
            const quizResult = await this.prisma.quizResult.create({
                data: {
                    value,
                    quizId,
                    authorId,
                },
            });
            const newRating = await this.getAllQuizResultValueByUserId(authorId);
            await this.userService.updateRating(newRating, authorId);
            return quizResult;
        } catch (_) {
            throw new CreateQuizResultException();
        }
    }

    async delete(id: number): Promise<QuizResult> {
        try {
            return this.prisma.quizResult.delete({ where: { id } });
        } catch (_) {
            throw new DeleteQuizResultException(id);
        }
    }

    async getAllQuizResultValueByUserId(authorId: number): Promise<number> {
        const results = await this.getAll({ authorId });
        return results.reduce((pv, cv) => pv + cv.value, 0);
    }

    private getValueByDifficulty(difficulty: Difficulty): number {
        switch (difficulty) {
            case 'EASY':
                return 10;
            case 'MEDIUM':
                return 15;
            case 'HARD':
                return 20;
            default:
                return 10;
        }
    }

    private calculateValue(
        questions: Question[],
        answers: number[],
        time: number,
        quizDifficulty: Difficulty,
    ) {
        let value = 0;
        if (questions.length !== answers.length) {
            throw new CountAnswersInvalidException();
        }
        const result = questions.map((el, i) => {
            const { difficulty, correctAnswer } = el;
            const userAnswer = answers[i];
            if (correctAnswer === userAnswer) {
                value += this.getValueByDifficulty(difficulty);
            }
            return { ...el, userAnswer };
        });

        value *= Math.round(QuizResultService.getCoefficient(time, quizDifficulty));

        return { value, result };
    }

    private static getCoefficient(time: number, difficulty: Difficulty): number {
        let maxTime = 0;
        const minCoefficient = 1.0;
        const maxCoefficient = 2.0;
        switch (difficulty) {
            case 'EASY':
                maxTime = 600000;
            case 'MEDIUM':
                maxTime = 900000;
            case 'HARD':
                maxTime = 1200000;

            default:
                maxTime = 600000;
        }
        if (time <= 0) return maxCoefficient;
        if (time >= maxTime) return minCoefficient;

        return Number(
            (maxCoefficient - (time / maxTime) * (maxCoefficient - minCoefficient)).toFixed(2),
        );
    }
}
