import { HttpException, HttpStatus } from '@nestjs/common';

export class NoAccessException extends HttpException {
    constructor() {
        super('Не достаточно прав', HttpStatus.BAD_REQUEST);
    }
}
