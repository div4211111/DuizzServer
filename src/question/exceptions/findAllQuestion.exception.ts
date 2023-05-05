import { HttpException, HttpStatus } from '@nestjs/common';

export class FindAllQuestionException extends HttpException {
    constructor() {
        super('Не удалось найти вопросы', HttpStatus.NOT_FOUND);
    }
}
