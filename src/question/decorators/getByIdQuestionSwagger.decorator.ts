import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { QuestionResponse } from '../types/questionResponse';

export function GetByIdQuestionSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить вопрос по идентификатору' }),
        ApiOkResponse({ description: 'Вопрос успешно получен', type: QuestionResponse }),
        ApiNotFoundResponse({ description: 'Не удалось получить вопрос', type: ErrorResponse }),
    );
}
