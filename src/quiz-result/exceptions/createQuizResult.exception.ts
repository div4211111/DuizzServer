import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateQuizResultException extends HttpException {
    constructor() {
        super(`Не удалось создать результат`, HttpStatus.BAD_REQUEST);
    }
}
