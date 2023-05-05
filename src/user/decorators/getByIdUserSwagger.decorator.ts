import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserResponse } from '../../prisma/types/userResponse';
import { ErrorResponse } from '../../common/types/errorResponse';

export function GetByIdUserSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Получить пользователя по идентификатору' }),
        ApiOkResponse({ description: 'Пользователь успешно получен', type: UserResponse }),
        ApiNotFoundResponse({ description: 'Не удалось найти пользователя', type: ErrorResponse }),
    );
}
