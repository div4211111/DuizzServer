import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { CategoriesResponse } from '../types/categoriesResponse';

export function GetByIdCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить категорию по идентификатору' }),
        ApiOkResponse({ description: 'Категория успешно получена', type: CategoriesResponse }),
        ApiNotFoundResponse({ description: 'Не удалось найти категорию', type: ErrorResponse }),
    );
}
