import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateQuestionException extends HttpException {
    constructor(id: number) {
        super(
            `Не удалось обновить вопрос с идентификатором ${id}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}
