import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserResponse } from '../../prisma/types/userResponse';
import { ErrorResponse } from '../../common/types/errorResponse';

export function GetAllUsersSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить всех пользователей' }),
        ApiOkResponse({ description: 'Пользователи успешно получены', type: [UserResponse] }),
        ApiNotFoundResponse({ description: 'Не удалось найти пользователей', type: ErrorResponse }),
    );
}
