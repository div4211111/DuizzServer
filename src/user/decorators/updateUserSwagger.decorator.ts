import { applyDecorators } from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserResponse } from '../../prisma/types/userResponse';
import { ErrorResponse } from '../../common/types/errorResponse';

export function UpdateUserSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Обновить данные своего профиля' }),
        ApiOkResponse({ description: 'Пользователь успешно обновлен', type: UserResponse }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось обновить пользователя',
            type: ErrorResponse,
        }),
    );
}
