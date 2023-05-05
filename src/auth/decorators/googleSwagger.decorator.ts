import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/types/errorResponse';
import { UserAndTokenResponse } from '../types/userAndTokenResponse';

export function GoogleSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Авторизоваться с помощью Google' }),
        ApiOkResponse({
            description: 'Вы успешно авторизовались с помощью Google',
            type: UserAndTokenResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: 'Не удалось авторизоваться с помощью Google',
            type: ErrorResponse,
        }),
    );
}
