import { applyDecorators } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { CategoriesResponse } from '../types/categoriesResponse';

export function DeleteCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Удалить категорию' }),
        ApiOkResponse({ description: 'Категория успешно удалена', type: CategoriesResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Ну удалось удалить категорию',
            type: CategoriesResponse,
        }),
    );
}
