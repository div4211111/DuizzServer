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

export function DeleteQuestionSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Удалить вопрос по идентификатору' }),
        ApiOkResponse({ description: 'Вопрос успешно удален', type: QuestionResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось удалить вопрос',
            type: ErrorResponse,
        }),
    );
}
