import { applyDecorators } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { CategoriesResponse } from '../types/categoriesResponse';

export function UpdateCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Обновить категорию' }),
        ApiOkResponse({ description: 'Категория успешно обновлена', type: CategoriesResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Ну удалось обновить категорию',
            type: ErrorResponse,
        }),
    );
}
