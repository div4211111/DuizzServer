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

export function UpdateQuestionSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Обновить вопрос по идентификатору' }),
        ApiOkResponse({ description: 'Вопрос успешно обновлен', type: QuestionResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось обновить вопрос',
            type: ErrorResponse,
        }),
    );
}
