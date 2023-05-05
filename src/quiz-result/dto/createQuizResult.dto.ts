import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuizResultDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Время прохождения квиза в миллисекундах',
        type: 'integer',
        examples: [
            { value: 60000, summary: '1 минута' },
            { value: 300000, summary: '5 минут' },
            { value: 900000, summary: '15 минут' },
        ],
    })
    time: number;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({
        description: 'Ответы',
        type: 'array',
        items: {
            type: 'integer',
        },
        example: [0, 1, 3, 2, 0, 1, 3, 2, 1, 2],
    })
    answers: number[];

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Идентификатор квиза',
        type: 'integer',
        example: 10,
    })
    quizId: number;
}
