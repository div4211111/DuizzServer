import { HttpException, HttpStatus } from '@nestjs/common';
export class CreateQuizExcpetion extends HttpException {
    constructor() {
        super(`Не удалось создать квиз`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
