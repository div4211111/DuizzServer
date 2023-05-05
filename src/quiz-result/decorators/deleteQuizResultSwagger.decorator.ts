import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResultResponse } from '../types/quizResultResponse';

export function DeleteQuizResultSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Удалить результат теста' }),
        ApiOkResponse({ description: 'Результат успешно удален', type: QuizResultResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось удалить результат',
            type: ErrorResponse,
        }),
    );
}
