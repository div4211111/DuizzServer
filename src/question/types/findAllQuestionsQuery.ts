import { ApiPropertyOptional } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDivisibleBy, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortType } from '@/src/common/types/sort.type';

export class FindAllQuestionsQuery {
    @IsOptional()
    @IsEnum(Difficulty)
    @ApiPropertyOptional({
        description: 'Фильтрация по сложности вопроса',
        enum: Difficulty,
        examples: [
            { value: Difficulty.EASY, summary: 'Получить все легкие вопросы' },
            { value: Difficulty.MEDIUM, summary: 'Получить все средние вопросы' },
            { value: Difficulty.HARD, summary: 'Получить все сложные вопросы' },
        ],
    })
    difficulty?: Difficulty;

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
