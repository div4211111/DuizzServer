import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { UserAndTokenResponse } from '../types/userAndTokenResponse';

export function SignUpSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Зарегистрироваться' }),
        ApiCreatedResponse({
            description: 'Вы успешно зарегистрированы',
            type: UserAndTokenResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось зарегистрироваться',
            type: ErrorResponse,
        }),
    );
}
