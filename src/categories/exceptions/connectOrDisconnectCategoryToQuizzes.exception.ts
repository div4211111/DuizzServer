import { HttpException, HttpStatus } from '@nestjs/common';
export class ConnectOrDisconnectCategoryToQuizzesException extends HttpException {
    constructor(id: number, quizzesId: number[], type: 'connect' | 'disconnect') {
        super(
            `Не удалось ${
                type === 'connect' ? 'связать' : 'отвязать'
            } квизы с идентификаторами: ${quizzesId.join(
                ',',
            )} с категорией с идентификатором: ${id}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}
