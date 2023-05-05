import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDivisibleBy, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortType } from '@/src/common/types/sort.type';

export class FindAllQuizResultQuery {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: 'Фильтрация по идентификатору пользователя',
        examples: [
            { value: 1, summary: 'Идентификатор пользователя: 1' },
            { value: 4, summary: 'Идентификатор пользователя: 4' },
            { value: 6, summary: 'Идентификатор пользователя: 6' },
        ],
        type: 'integer',
    })
    authorId?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: 'Фильтрация по идентификатору квиза',
        examples: [
            { value: 1, summary: 'Идентификатор квиза: 1' },
            { value: 4, summary: 'Идентификатор квиза: 4' },
            { value: 6, summary: 'Идентификатор квиза: 6' },
        ],
        type: 'integer',
    })
    quizId?: number;

    @IsEnum(SortType)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Сортировка по значению результата',
        enum: SortType,
        examples: [
            { value: SortType.ASC, summary: 'Сортировка по возрастанию' },
            { value: SortType.DESC, summary: 'Сортировка по убыванию' },
        ],
    })
    sortByValue?: SortType;

    @IsEnum(SortType)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Сортировка по дате создания',
        enum: SortType,
        examples: [
            { value: SortType.ASC, summary: 'Сортировка по возрастанию' },
            { value: SortType.DESC, summary: 'Сортировка по убыванию' },
        ],
    })
    sortByDate?: SortType;

    @IsOptional()
    @IsNumber()
    @IsDivisibleBy(10)
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: 'Количество элементов в ответе',
        multipleOf: 10,
        type: 'integer',
        examples: [
            { value: 0, summary: 'Получить 0 элементов' },
            { value: 50, summary: 'Получить 50 элементов' },
            { value: 100, summary: 'Получить 100 элементов' },
        ],
    })
    take?: number;

    @IsOptional()
    @IsNumber()
    @IsDivisibleBy(10)
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: 'Количество элементов, которое нужно пропустить',
        multipleOf: 10,
        type: 'integer',
        examples: [
            { value: 0, summary: 'Пропустить 0 элементов' },
            { value: 50, summary: 'Пропустить  50 элементов' },
            { value: 100, summary: 'Пропустить 100 элементов' },
        ],
    })
    skip?: number;
}
