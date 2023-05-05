import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResponse } from '../types/QuizResponse';

export function UpdateQuizSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Обновить квиз' }),
        ApiOkResponse({ description: 'Квиз успешно обновлен', type: QuizResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось обновить квиз',
            type: ErrorResponse,
        }),
    );
}
