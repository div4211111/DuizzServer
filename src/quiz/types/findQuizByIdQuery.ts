import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { IncludeQuiz } from './includeQuiz';

export class FindQuizByIdQuery {
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
}
