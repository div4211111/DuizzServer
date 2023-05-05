import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResultResponse } from '../types/quizResultResponse';

export function CreateQuizResultSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Создать результат теста' }),
        ApiCreatedResponse({ description: 'Результат успешно создан', type: QuizResultResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось создать результат',
            type: ErrorResponse,
        }),
    );
}
