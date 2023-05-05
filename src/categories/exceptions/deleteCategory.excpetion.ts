import { HttpException, HttpStatus } from '@nestjs/common';
export class DeleteCategoryExcpetion extends HttpException {
    constructor(id: number) {
        super(
            `Не удалось удалить категорию с идентификатором: ${id}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}
