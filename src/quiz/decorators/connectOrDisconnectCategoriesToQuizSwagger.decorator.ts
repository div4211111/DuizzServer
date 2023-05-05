import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResponse } from '../types/QuizResponse';
import { ConnectType } from '../../common/types/connect.type';

export function ConnectOrDisconnectCategoriesToQuizSwagger(type: ConnectType) {
    return applyDecorators(
        ApiOperation({
            summary:
                type === ConnectType.CONNECT
                    ? 'Связать квиз с категориями'
                    : 'Отвязать квиз от категорий',
        }),
        ApiOkResponse({
            description: `Квиз успешно ${
                type === ConnectType.CONNECT ? 'связан с категориями' : 'отвязан от категорий'
            }`,
            type: QuizResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: `Не удалось ${
                type === ConnectType.CONNECT
                    ? 'связать квиз  с категориями'
                    : 'отвязать квиз от категорий'
            }`,
            type: ErrorResponse,
        }),
    );
}
