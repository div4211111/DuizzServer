import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedUserException extends HttpException {
    constructor() {
        super('Вы не авторизованы, доступ запрещен', HttpStatus.UNAUTHORIZED);
    }
}
