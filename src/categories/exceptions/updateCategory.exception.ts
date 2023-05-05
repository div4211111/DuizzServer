import { HttpException, HttpStatus } from '@nestjs/common';
export class UpdateCategoryException extends HttpException {
    constructor() {
        super(`Не удалось обновить категорию`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
