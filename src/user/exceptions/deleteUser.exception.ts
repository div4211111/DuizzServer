import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteUserException extends HttpException {
    constructor(id: number) {
        super(
            `Не удалось удалить пользователя с идентификатором: ${id}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}
