import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResultResponse } from '../types/quizResultResponse';

export function GetAllQuizResultSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить все результаты' }),
        ApiOkResponse({ description: 'Результаты успешно получены', type: [QuizResultResponse] }),
        ApiNotFoundResponse({ description: 'Не удалось получить результаты', type: ErrorResponse }),
    );
}
