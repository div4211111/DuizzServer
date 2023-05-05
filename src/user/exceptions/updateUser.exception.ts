import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateUserException extends HttpException {
    constructor(id: number);
    constructor(email: string);
    constructor(idOrEmail: number | string) {
        if (typeof idOrEmail === 'number') {
            super(
                `Не удалось обновить пользователя с идентификатором: ${idOrEmail}`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        } else {
            super(
                `Не удалось обновить пользователя с email: ${idOrEmail}`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
}
