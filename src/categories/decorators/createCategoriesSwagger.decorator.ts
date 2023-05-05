import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { CategoriesResponse } from '../types/categoriesResponse';

export function CreateCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Создать категорию' }),
        ApiCreatedResponse({ description: 'Категория успешно создана', type: CategoriesResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Ну удалось создать категорию',
            type: ErrorResponse,
        }),
    );
}
