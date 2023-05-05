import { Injectable } from '@nestjs/common';

import { ConnectOrDisconnectCatToQuizDto } from './dto/connectOrDisconnectCatToQuiz.dto';
import { ConnectOrDisconnectQuestionsToQuizDto } from './dto/connectOrDisconnectQuestionsToQuiz.dto';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { UpdateQuizDto } from './dto/updateQuiz.dto';
import { CreateQuizExcpetion } from './exceptions/createQuiz.exception';
import { GetAllQuizExcpetion } from './exceptions/getAllQuiz.exception';
import { QuizDeleteException } from './exceptions/quizDelete.exception';
import { QuizNotFoundException } from './exceptions/quizNotFound.exception';
import { UpdateQuizException } from './exceptions/updateQuiz.exception';
import { FindAllQuizQuery } from './types/findAllQuizQuery';
import { FindQuizByIdQuery } from './types/findQuizByIdQuery';
import { IncludeQuiz } from './types/includeQuiz';
import { QuizResponse } from './types/QuizResponse';
import { getMaxDifficulty } from './utils/getMaxDifficylty';
import { ConnectType } from '../common/types/connect.type';
import { PrismaService } from '@/src/prisma/prisma.service';
import { SortType } from '@/src/common/types/sort.type';

@Injectable()
export class QuizService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll({
        categoryId,
        search,
        sort,
        include,
        take,
        skip,
    }: FindAllQuizQuery): Promise<QuizResponse[]> {
        try {
            return await this.prisma.quiz.findMany({
                where: {
                    ...(categoryId !== undefined
                        ? { categories: { some: { id: categoryId } } }
                        : {}),
                    ...(search !== undefined
                        ? {
                              title: {
                                  contains: search,
                                  mode: 'insensitive',
                              },
                              descriptions: {
                                  contains: search,
                                  mode: 'insensitive',
                              },
                          }
                        : {}),
                },
                orderBy:
                    sort === undefined
                        ? undefined
                        : sort === SortType.ASC
                        ? { id: 'asc' }
                        : { id: 'desc' },

                ...(include === IncludeQuiz.ALL && {
                    include: { questions: true, categories: true },
                }),
                ...(include === IncludeQuiz.QUESTIONS && {
                    include: { questions: true },
                }),
                ...(include === IncludeQuiz.CATEGORIES && {
                    include: { categories: true },
                }),
                ...(include === IncludeQuiz.RESULTS && {
                    include: { results: true },
                }),
                take,
                skip,
            });
        } catch (_) {
            throw new GetAllQuizExcpetion();
        }
    }

    async getById(id: number, query?: FindQuizByIdQuery): Promise<QuizResponse> {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            ...(query?.include === IncludeQuiz.ALL && {
                include: { questions: true, categories: true },
            }),
            ...(query?.include === IncludeQuiz.QUESTIONS && { include: { questions: true } }),
            ...(query?.include === IncludeQuiz.CATEGORIES && { include: { categories: true } }),
            ...(query?.include === IncludeQuiz.RESULTS && { include: { results: true } }),
        });
        if (!quiz) {
            throw new QuizNotFoundException(id);
        }
        return quiz;
    }

    async createQuiz(createQuizDto: CreateQuizDto): Promise<QuizResponse> {
        try {
            return this.prisma.quiz.create({
                data: {
                    title: createQuizDto.title,
                    descriptions: createQuizDto.description,
                    questions: {
                        create: [...createQuizDto.questions],
                    },
                    difficulty: getMaxDifficulty(createQuizDto.questions),
                    ...(createQuizDto.categories !== undefined
                        ? {
                              categories: {
                                  connectOrCreate: [
                                      ...createQuizDto.categories.map((el) => ({
                                          where: { title: el.title },
                                          create: { title: el.title },
                                      })),
                                  ],
                              },
                          }
                        : {}),
                },
            });
        } catch (_) {
            throw new CreateQuizExcpetion();
        }
    }

    async updateById(id: number, updateQuizDto: UpdateQuizDto): Promise<QuizResponse> {
        try {
            return await this.prisma.quiz.update({
                where: { id },
                data: {
                    ...updateQuizDto,
                },
            });
        } catch (_) {
            throw new UpdateQuizException(id);
        }
    }

    async deleteQuiz(id: number): Promise<QuizResponse> {
        try {
            return await this.prisma.quiz.delete({ where: { id } });
        } catch (e) {
            console.error(e);
            throw new QuizDeleteException(id);
        }
    }

    async connectOrDisconnectCategoriesToQuiz(
        { id, categoriesId }: ConnectOrDisconnectCatToQuizDto,
        type: ConnectType,
    ) {
        return await this.prisma.quiz.update({
            where: { id },
            data: {
                categories: {
                    ...(type === ConnectType.CONNECT
                        ? { connect: [...categoriesId.map((el) => ({ id: el }))] }
                        : { disconnect: [...categoriesId.map((el) => ({ id: el }))] }),
                },
            },
        });
    }

    async connectOrDisconnectQuestionsToQuiz(
        { id, questionsId }: ConnectOrDisconnectQuestionsToQuizDto,
        type: ConnectType,
    ) {
        return await this.prisma.quiz.update({
            where: { id },
            data: {
                questions: {
                    ...(type === ConnectType.CONNECT
                        ? { connect: [...questionsId.map((el) => ({ id: el }))] }
                        : { disconnect: [...questionsId.map((el) => ({ id: el }))] }),
                },
            },
        });
    }
}
