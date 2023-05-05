import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ErrorResponse } from '../types/errorResponse';

export function AuthGuard(...roles: Role[]) {
    return applyDecorators(
        ApiUnauthorizedResponse({
            description: 'Вы не авторизованы или у вас нет доступа',
            type: ErrorResponse,
        }),
        SetMetadata('roles', roles),
        UseGuards(AccessTokenGuard, RoleGuard),
        ApiBearerAuth(),
    );
}
