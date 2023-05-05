import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDivisibleBy, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortType } from '@/src/common/types/sort.type';

export class GetAllUsersQueryType {
    @IsOptional()
    @IsEnum(SortType)
    @ApiPropertyOptional({
        enum: SortType,
        description: 'Сортировка по рейтингу',
        examples: [
            { value: SortType.ASC, summary: 'Сортировка по возрастанию' },
            { value: SortType.DESC, summary: 'Сортировка по убыванию' },
        ],
    })
    sortByRating?: SortType;

    @IsOptional()
    @IsEnum(SortType)
    @ApiPropertyOptional({
        enum: SortType,
        description: 'Сортировка по дате регистрации',
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
