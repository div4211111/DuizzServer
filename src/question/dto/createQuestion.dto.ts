import { ApiProperty } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';
import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
} from 'class-validator';
import { IsLessArrayLength } from '../../common/decorators/validator/isLessArrayLength.decorator';

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Заголовок вопроса',
        example: 'Сколько будет 2+2?',
    })
    title: string;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({
        description: 'Ответы на вопрос',
        type: 'array',
        items: {
            type: 'string',
        },
        example: ['Два', 'Три', 'Четыре', 'Пять'],
    })
    answers: string[];

    @IsNumber()
    @IsNotEmpty()
    @IsLessArrayLength('answers')
    @Min(0)
    @ApiProperty({
        description: 'Правильный ответ - номер элемента в массиве ответов',
        example: 2,
        type: 'integer',
    })
    correctAnswer: number;

    @IsEnum(Difficulty)
    @IsNotEmpty()
    @ApiProperty({
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
