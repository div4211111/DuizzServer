import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserResponse } from '../../prisma/types/userResponse';
import { ErrorResponse } from '../../common/types/errorResponse';

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Удалить пользователя' }),
    ApiOkResponse({ description: 'Пользователь успешно удален', type: UserResponse }),
    ApiUnprocessableEntityResponse({
      description: 'Не удалось удалить пользователя',
      type: ErrorResponse,
    }),
  );
}
