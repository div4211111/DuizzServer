import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResponse } from '../types/QuizResponse';

export function CreateQuizSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Создать квиз' }),
        ApiCreatedResponse({ description: 'Квиз успешно создан', type: QuizResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось создать квиз',
            type: ErrorResponse,
        }),
    );
}
