import { HttpException, HttpStatus } from '@nestjs/common';

export class CountAnswersInvalidException extends HttpException {
    constructor() {
        super(`количество ответов не совпадает с количеством вопросов`, HttpStatus.BAD_REQUEST);
    }
}
