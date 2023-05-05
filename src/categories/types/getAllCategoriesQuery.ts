import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDivisibleBy, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortType } from '@/src/common/types/sort.type';

export class GetAllCategoryQuery {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Поиск',
        examples: [
            { value: 'Математика', summary: 'Будет выполнен поиск по ключевому слову математика' },
            { value: 'Ист', summary: 'Будет выполнен поиск по ключевому слову Ист' },
        ],
    })
    search?: string;

    @IsOptional()
    @IsEnum(SortType)
    @ApiPropertyOptional({
        description: 'Соритровка по дате создания',
        enum: SortType,
        examples: [
            { value: SortType.ASC, summary: 'Сортировка по возрастанию' },
            { value: SortType.DESC, summary: 'Сортировка по убыванию' },
        ],
    })
    sort?: SortType;

    @IsOptional()
    @IsNumber()
    @IsDivisibleBy(10)
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: 'Количество элементов в ответе',
        examples: [
            { value: 0, summary: 'Пропустить 0 элементов' },
            { value: 50, summary: 'Пропустить  50 элементов' },
            { value: 100, summary: 'Пропустить 100 элементов' },
        ],
        multipleOf: 10,
        type: 'integer',
    })
    take?: number;

    @IsOptional()
    @IsNumber()
    @IsDivisibleBy(10)
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: 'Количество элементов, которое нужно пропустить',
        examples: [
            { value: 0, summary: 'Пропустить 0 элементов' },
            { value: 50, summary: 'Пропустить  50 элементов' },
            { value: 100, summary: 'Пропустить 100 элементов' },
        ],
        multipleOf: 10,
        type: 'integer',
    })
    skip?: number;
}
