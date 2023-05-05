import { HttpException, HttpStatus } from '@nestjs/common';

export class UsersNotFoundException extends HttpException {
    constructor() {
        super('Не удалось найти пользователей', HttpStatus.NOT_FOUND);
    }
}
