import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistException extends HttpException {
    constructor(email: string) {
        super(`Пользователь с email: ${email} уже существует`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
