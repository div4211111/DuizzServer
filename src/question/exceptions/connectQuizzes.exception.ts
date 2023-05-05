import { HttpException, HttpStatus } from '@nestjs/common';

export class ConnectQuizzesException extends HttpException {
    constructor(questionId: number) {
        super(`Не удалось удалить вопрос с идентификатором: ${questionId}`, HttpStatus.BAD_REQUEST);
    }
}
