import { HttpException, HttpStatus } from '@nestjs/common';

export class GetByUserIdQuizResultNotFoundException extends HttpException {
    constructor(id: number) {
        super(
            `Не удалось найти результаты для пользователя с идентификатором: ${id}`,
            HttpStatus.NOT_FOUND,
        );
    }
}
