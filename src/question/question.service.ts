import { Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';
import { ConnectOrDisconnectQuizzesToQuestion } from './dto/connectOrDisconnectQuestionsToQuiz.dto';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { UpdateQuestionDto } from './dto/updateQueston.dto';
import { ConnectQuizzesException } from './exceptions/connectQuizzes.exception';
import { CreateQuestionException } from './exceptions/createQuestion.exception';
import { FindAllQuestionException } from './exceptions/findAllQuestion.exception';
import { QuestionByIdNotFoundException } from './exceptions/questionByIdNotFound.exception';
import { QuestionNotFoundException } from './exceptions/questionNotFound.exception';
import { UpdateQuestionException } from './exceptions/updateQuestion.exception';
import { FindAllQuestionsQuery } from './types/findAllQuestionsQuery';
import { ConnectType } from '../common/types/connect.type';
import { PrismaService } from '@/src/prisma/prisma.service';
import { SortType } from '@/src/common/types/sort.type';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}

    async qetAll(findAllQuestionsQuery: FindAllQuestionsQuery) {
        try {
            return await this.prisma.question.findMany({
                where: {
                    ...(findAllQuestionsQuery.difficulty !== undefined
                        ? { difficulty: findAllQuestionsQuery.difficulty }
                        : {}),
                },
                orderBy:
                    findAllQuestionsQuery.sort === SortType.ASC ? { id: 'asc' } : { id: 'desc' },
                take: findAllQuestionsQuery.take,
                skip: findAllQuestionsQuery.skip,
            });
        } catch (_) {
            throw new FindAllQuestionException();
        }
    }

    async getById(id: number): Promise<Question> {
        try {
            return this.prisma.question.findUnique({ where: { id } });
        } catch (_) {
            throw new QuestionByIdNotFoundException(id);
        }
    }

    async getByQuizId(id: number): Promise<Question[]> {
        const questions = await this.prisma.question.findMany({
            where: { quizzes: { some: { id } } },
        });
        if (!questions) {
            throw new QuestionNotFoundException(id);
        }
        return questions;
    }

    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
        try {
            return await this.prisma.question.create({
                data: {
                    ...createQuestionDto,
                },
            });
        } catch (_) {
            throw new CreateQuestionException();
        }
    }

    async connectOrDisconnectQuizzesToQuestion(
        { id, quizzesId }: ConnectOrDisconnectQuizzesToQuestion,
        type: ConnectType,
    ): Promise<Question> {
        try {
            return this.prisma.question.update({
                where: {
                    id: id,
                },
                data: {
                    quizzes: {
                        ...(type === ConnectType.CONNECT
                            ? { connect: [...quizzesId.map((el) => ({ id: el }))] }
                            : { disconnect: [...quizzesId.map((el) => ({ id: el }))] }),
                    },
                },
            });
        } catch (_) {
            throw new ConnectQuizzesException(id);
        }
    }

    async updateById(updateQuestionDto: UpdateQuestionDto, id: number): Promise<Question> {
        try {
            return await this.prisma.question.update({
                where: { id },
                data: { ...updateQuestionDto },
            });
        } catch (_) {
            throw new UpdateQuestionException(id);
        }
    }

    async deleteById(id: number): Promise<Question> {
        return await this.prisma.question.delete({ where: { id } });
    }
}
