import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResponse } from '../types/QuizResponse';

export function GetByIdQuizSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить квиз по идентификатору' }),
        ApiOkResponse({ description: 'Квиз успешно получен', type: QuizResponse }),
        ApiNotFoundResponse({ description: 'Не удалось получить квиз', type: ErrorResponse }),
    );
}
