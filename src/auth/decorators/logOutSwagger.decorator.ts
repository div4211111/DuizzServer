import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { UserAndTokenResponse } from '../types/userAndTokenResponse';

export function LogOutSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Выйти' }),
        ApiCreatedResponse({
            description: 'Вы успешно вышли',
            type: UserAndTokenResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось выйти',
            type: ErrorResponse,
        }),
    );
}
