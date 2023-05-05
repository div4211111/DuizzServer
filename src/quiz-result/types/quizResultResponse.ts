import { QuizResult } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class QuizResultResponse implements QuizResult {
    @ApiProperty({
        type: 'integer',
    })
    id: number;

    @ApiProperty({
        type: 'integer',
    })
    value: number;

    @ApiProperty({
        type: 'integer',
    })
    quizId: number;

    @ApiProperty({
        type: 'integer',
    })
    authorId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
