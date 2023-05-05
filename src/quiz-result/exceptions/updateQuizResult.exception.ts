import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateQuizResultException extends HttpException {
    constructor(id: number) {
        super(`Не удалось обновить результат с идентификатором ${id}`, HttpStatus.BAD_REQUEST);
    }
}
