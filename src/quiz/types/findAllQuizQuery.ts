import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDivisibleBy, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IncludeQuiz } from './includeQuiz';
import { SortType } from '@/src/common/types/sort.type';

export class FindAllQuizQuery {
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
    @IsEnum(IncludeQuiz)
    @ApiPropertyOptional({
        description: 'Изменение вложенных полей',
        enum: IncludeQuiz,
        examples: [
            { value: IncludeQuiz.ALL, summary: 'Получить все связанные поля' },
            { value: IncludeQuiz.CATEGORIES, summary: 'Получить все связанные категории' },
            { value: IncludeQuiz.QUESTIONS, summary: 'Получить все связанные вопросы' },
            { value: IncludeQuiz.RESULTS, summary: 'Получить все связанные результаты' },
        ],
    })
    include?: IncludeQuiz;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiPropertyOptional({
        description: 'Фильтрация по идентификатору категории',
        examples: [
            { value: 1, summary: 'Идентификатор категории: 1' },
            { value: 4, summary: 'Идентификатор категории: 4' },
            { value: 6, summary: 'Идентификатор категории: 6' },
        ],
        type: 'integer',
    })
    categoryId?: number;

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
