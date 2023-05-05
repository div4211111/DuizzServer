import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteQuizResultException extends HttpException {
    constructor(id: number) {
        super(`Не удалось удалить результат с идентификатором: ${id}`, HttpStatus.BAD_REQUEST);
    }
}
