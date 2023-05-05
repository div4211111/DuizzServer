import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { UserAndTokenResponse } from '../types/userAndTokenResponse';

export function SignInSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Войти' }),
        ApiCreatedResponse({
            description: 'Вы успешно вошли',
            type: UserAndTokenResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось войти',
            type: ErrorResponse,
        }),
    );
}
