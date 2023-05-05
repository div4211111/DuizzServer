import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResultResponse } from '../types/quizResultResponse';

export function UpdateQuizResultSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Обновить результат теста' }),
        ApiOkResponse({ description: 'Результат успешно обновлен', type: QuizResultResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось обновить результат',
            type: ErrorResponse,
        }),
    );
}
