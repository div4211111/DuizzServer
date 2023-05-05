import { ApiProperty } from '@nestjs/swagger';
import { Difficulty, Question } from '@prisma/client';

export class QuestionResponse implements Question {
    @ApiProperty({
        type: 'integer',
    })
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    answers: string[];

    @ApiProperty({
        type: 'integer',
    })
    correctAnswer: number;

    @ApiProperty({
        enum: Difficulty,
    })
    difficulty: Difficulty;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
