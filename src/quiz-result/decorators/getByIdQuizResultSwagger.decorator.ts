import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResultResponse } from '../types/quizResultResponse';

export function GetByIdQuizResultSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить результат для своего пользователя' }),
        ApiOkResponse({ description: 'Результат успешно получен', type: QuizResultResponse }),
        ApiNotFoundResponse({ description: 'Не удалось получить результат', type: ErrorResponse }),
    );
}
