import { applyDecorators } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { QuestionResponse } from '../types/questionResponse';

export function CreateQuestionSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Создать вопрос' }),
        ApiCreatedResponse({ description: 'Вопрос успешно создан', type: QuestionResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось создать вопрос',
            type: ErrorResponse,
        }),
    );
}
