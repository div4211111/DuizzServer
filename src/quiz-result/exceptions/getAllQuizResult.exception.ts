import { HttpException, HttpStatus } from '@nestjs/common';

export class GetAllQuizResultException extends HttpException {
    constructor() {
        super('Ошибка при поиске результатов', HttpStatus.BAD_REQUEST);
    }
}
