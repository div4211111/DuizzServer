import { HttpException, HttpStatus } from '@nestjs/common';
export class GetByIdCategoryException extends HttpException {
    constructor(id: number) {
        super(`Не удалось найти категорию с идентификатором: ${id}`, HttpStatus.NOT_FOUND);
    }
}
