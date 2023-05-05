import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateQuizException extends HttpException {
    constructor(id: number) {
        super(`Не удалось обновить квиз с идентификатором: ${id}`, HttpStatus.NOT_FOUND);
    }
}
