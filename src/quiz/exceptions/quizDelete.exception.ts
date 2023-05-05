import { HttpException, HttpStatus } from '@nestjs/common';

export class QuizDeleteException extends HttpException {
    constructor(id: number) {
        super(`Не удалось удалить квиз в индентификатором: ${id}`, HttpStatus.BAD_REQUEST);
    }
}
