import { applyDecorators } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { UserAndTokenResponse } from '../types/userAndTokenResponse';

export function RefreshTokenSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Обновить токен доступа' }),
        ApiCreatedResponse({
            description: 'Вы успешно обновили токен доступа',
            type: UserAndTokenResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось обновить токен доступа',
            type: ErrorResponse,
        }),
        ApiUnauthorizedResponse({
            description: 'Вы не авторизованы или у вас нет доступа',
            type: ErrorResponse,
        }),
        ApiBearerAuth(),
    );
}
