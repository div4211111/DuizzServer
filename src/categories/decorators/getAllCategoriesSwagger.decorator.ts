import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { CategoriesResponse } from '../types/categoriesResponse';

export function GetAllCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить все категории' }),
        ApiOkResponse({ description: 'Категории успешно получены', type: [CategoriesResponse] }),
        ApiNotFoundResponse({ description: 'Не удалось найти категории', type: ErrorResponse }),
    );
}
