import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserException extends HttpException {
    constructor() {
        super('Не удалось создать пользователя', HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
