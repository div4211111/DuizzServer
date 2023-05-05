import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { QuizResponse } from '../types/QuizResponse';
import { ConnectType } from '../../common/types/connect.type';

export function ConnectOrDisconnectQuestionsToQuizSwagger(type: ConnectType) {
    return applyDecorators(
        ApiOperation({
            summary:
                type === ConnectType.CONNECT
                    ? 'Связать квиз с вопросами'
                    : 'Отвязать квиз от вопросов',
        }),
        ApiOkResponse({
            description: `Квиз успешно ${
                type === ConnectType.CONNECT ? 'связан с вопросами' : 'отвязан от вопросов'
            }`,
            type: QuizResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: `Не удалось ${
                type === ConnectType.CONNECT
                    ? 'связать квиз  с вопросами'
                    : 'отвязать квиз от вопросов'
            }`,
            type: ErrorResponse,
        }),
    );
}
