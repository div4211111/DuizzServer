import { HttpException, HttpStatus } from '@nestjs/common';

export class QuizNotFoundException extends HttpException {
    constructor(id: number) {
        super(`Квиз с идентификатором: ${id} не существет`, HttpStatus.NOT_FOUND);
    }
}
