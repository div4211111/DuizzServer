import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateQuestionException extends HttpException {
    constructor() {
        super('Не удалось создать вопрос', HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
