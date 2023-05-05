import { HttpException, HttpStatus } from '@nestjs/common';

export class QuestionByIdNotFoundException extends HttpException {
    constructor(id: number) {
        super(`Не удалось найти вопрос с идентификатором: ${id}`, HttpStatus.NOT_FOUND);
    }
}
