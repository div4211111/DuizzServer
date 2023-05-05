import { HttpException, HttpStatus } from '@nestjs/common';
export class GetAllQuizExcpetion extends HttpException {
    constructor() {
        super(`Не удалось найти квизы`, HttpStatus.NOT_FOUND);
    }
}
