import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResponse } from '../types/QuizResponse';

export function GetAllQuizSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить все квизы' }),
        ApiOkResponse({ description: 'Квизы успешно получены', type: [QuizResponse] }),
        ApiNotFoundResponse({ description: 'Не удалось получить квизы', type: ErrorResponse }),
    );
}
