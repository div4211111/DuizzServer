import { HttpException, HttpStatus } from '@nestjs/common';
export class CreateCategoryException extends HttpException {
    constructor() {
        super(`Не удалось создать категорию`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
