import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { ConnectType } from '../../common/types/connect.type';
import { CategoriesResponse } from '../types/categoriesResponse';

export function ConnectOrDisconnectCategoryToQuizzesSwagger(type: ConnectType) {
    return applyDecorators(
        ApiOperation({
            summary:
                type === ConnectType.CONNECT
                    ? 'Связать категорию с квизами'
                    : 'Отвязать категорию от квизов',
        }),
        ApiOkResponse({
            description: `Категория успешно ${
                type === ConnectType.CONNECT ? 'связана с квизами' : 'отвязана от квизов'
            }`,
            type: CategoriesResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: `Не удалось ${
                type === ConnectType.CONNECT
                    ? 'связать категорию с квизами'
                    : 'отвязать категорию от квизов'
            }`,
            type: ErrorResponse,
        }),
    );
}
