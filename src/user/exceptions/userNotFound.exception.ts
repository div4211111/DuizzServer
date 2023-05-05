import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
    constructor(id?: number);
    constructor(email?: string);
    constructor(emailOrId?: string | number) {
        if (typeof emailOrId === 'string') {
            super(`Пользователь с email: ${emailOrId} не найден`, HttpStatus.NOT_FOUND);
        } else if (typeof emailOrId === 'number') {
            super(`Пользователь с идентификатором: ${emailOrId} не найден`, HttpStatus.NOT_FOUND);
        } else {
            super(`Пользователя с таким email или паролем не существует`, HttpStatus.NOT_FOUND);
        }
    }
}
