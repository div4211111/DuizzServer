import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConnectOrDisconnectCategoryToQuizzesDto } from './dto/connectOrDisconnectCategoryToQuizzes.dto';
import { CreateAndUpdateCategoryDto } from './dto/createCategory.dto';
import { CreateCategoryException } from './exceptions/createCategory.exception';
import { DeleteCategoryExcpetion } from './exceptions/deleteCategory.excpetion';
import { GetAllCategoriesException } from './exceptions/getAllCategories.exception';
import { GetByIdCategoryException } from './exceptions/getByIdCategory.exception';
import { UpdateCategoryException } from './exceptions/updateCategory.exception';
import { CategoriesResponse } from './types/categoriesResponse';
import { GetAllCategoryQuery } from './types/getAllCategoriesQuery';
import { ConnectType } from '../common/types/connect.type';
import { SortType } from '@/src/common/types/sort.type';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll({ search, sort, take, skip }: GetAllCategoryQuery): Promise<CategoriesResponse[]> {
        try {
            return await this.prisma.categories.findMany({
                where: {
                    ...(search !== undefined
                        ? { title: { contains: search, mode: 'insensitive' } }
                        : {}),
                },
                orderBy:
                    sort === undefined
                        ? undefined
                        : sort === SortType.ASC
                        ? { id: 'asc' }
                        : { id: 'desc' },
                take,
                skip,
            });
        } catch (_) {
            throw new GetAllCategoriesException();
        }
    }

    async getById(id: number): Promise<CategoriesResponse> {
        try {
            return this.prisma.categories.findUnique({ where: { id } });
        } catch (_) {
            throw new GetByIdCategoryException(id);
        }
    }

    async create(createCategoriesDto: CreateAndUpdateCategoryDto): Promise<CategoriesResponse> {
        try {
            return await this.prisma.categories.create({ data: { ...createCategoriesDto } });
        } catch (_) {
            throw new CreateCategoryException();
        }
    }

    async update(
        updateCategoryDto: CreateAndUpdateCategoryDto,
        id: number,
    ): Promise<CategoriesResponse> {
        try {
            return await this.prisma.categories.update({
                where: { id },
                data: { ...updateCategoryDto },
            });
        } catch (_) {
            throw new UpdateCategoryException();
        }
    }

    async connectOrDisconnectCategoryToQuizzes(
        { id, quizzesId }: ConnectOrDisconnectCategoryToQuizzesDto,
        type: ConnectType,
    ): Promise<CategoriesResponse> {
        try {
            return await this.prisma.categories.update({
                where: { id },
                data: {
                    quizzes: {
                        ...(type === ConnectType.CONNECT
                            ? { connect: [...quizzesId.map((el) => ({ id: el }))] }
                            : { disconnect: [...quizzesId.map((el) => ({ id: el }))] }),
                    },
                },
            });
        } catch (_) {}
    }

    async delete(id: number): Promise<CategoriesResponse> {
        try {
            return await this.prisma.categories.delete({ where: { id } });
        } catch (_) {
            throw new DeleteCategoryExcpetion(id);
        }
    }
}
