import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { JWTPayload } from 'src/common/decorators/user.decorator';
import { NoAccessException } from '../exceptions/noAccess.exception';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user as JWTPayload;

        const isValidRole = user.roles.some((role) => roles.includes(role));
        if (!isValidRole) {
            throw new NoAccessException();
        }
        return isValidRole;
    }
}
