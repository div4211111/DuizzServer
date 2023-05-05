import { HttpException, HttpStatus } from '@nestjs/common';
export class GetAllCategoriesException extends HttpException {
    constructor() {
        super(`Не удалось найти категории`, HttpStatus.NOT_FOUND);
    }
}
