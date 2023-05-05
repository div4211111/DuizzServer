import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Categories, Difficulty, Question, Quiz, QuizResult } from '@prisma/client';
import { QuestionResponse } from '../../question/types/questionResponse';
import { CategoriesResponse } from '../../categories/types/categoriesResponse';
import { QuizResultResponse } from '../../quiz-result/types/quizResultResponse';

export class QuizResponse implements Quiz {
    @ApiProperty({
        type: 'integer',
    })
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    descriptions: string;

    @ApiPropertyOptional({
        enum: Difficulty,
    })
    difficulty: Difficulty;

    @ApiPropertyOptional({
        type: [QuestionResponse],
    })
    questions?: QuestionResponse[];

    @ApiPropertyOptional({
        type: [CategoriesResponse],
    })
    categories?: CategoriesResponse[];

    @ApiPropertyOptional({
        type: [QuizResultResponse],
    })
    results?: QuizResultResponse[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
