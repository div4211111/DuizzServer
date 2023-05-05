import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsLessArrayLength } from '../../common/decorators/validator/isLessArrayLength.decorator';
import { Difficulty } from '@prisma/client';

export class UpdateQuestionDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Заголовок вопроса',
        example: 'Сколько будет 2+2?',
    })
    title: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Ответы на вопрос',
        type: 'array',
        items: {
            type: 'string',
        },
        example: ['Два', 'Три', 'Четыре', 'Пять'],
    })
    answers: string[];

    @IsNumber()
    @IsOptional()
    @IsLessArrayLength('answers', {
        message: 'Правильный ответ должен быть меньше длины массива вопросов',
    })
    @Min(0)
    @ApiPropertyOptional({
        description: 'Правильный ответ - номер элемента в массиве ответов',
        example: 2,
        type: 'integer',
    })
    correctAnswer: number;

    @IsEnum(Difficulty)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Сложность вопроса',
        enum: Difficulty,
        examples: [
            { value: Difficulty.EASY, summary: 'Простой вопрос' },
            { value: Difficulty.MEDIUM, summary: 'Средней сложности вопрос' },
            { value: Difficulty.HARD, summary: 'Сложный вопрос' },
        ],
    })
    difficulty: Difficulty;
}
