import { HttpException, HttpStatus } from '@nestjs/common';

export class QuestionNotFoundException extends HttpException {
    constructor(quizId: number) {
        super(`У квиза с идентификаторо ${quizId} вопросов не существует`, HttpStatus.NOT_FOUND);
    }
}
