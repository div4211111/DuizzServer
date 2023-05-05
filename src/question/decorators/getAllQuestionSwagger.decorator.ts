import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { QuestionResponse } from '../types/questionResponse';

export function GetAllQuestionSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить все вопросы' }),
        ApiOkResponse({ description: 'Вопросы успешно получены', type: [QuestionResponse] }),
        ApiNotFoundResponse({ description: 'Не удалось получить вопросы', type: ErrorResponse }),
    );
}
