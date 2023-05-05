import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResponse } from '../types/QuizResponse';

export function DeleteQuizSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Удалить квиз' }),
        ApiCreatedResponse({ description: 'Квиз успешно удален', type: QuizResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось удалить квиз',
            type: ErrorResponse,
        }),
    );
}
