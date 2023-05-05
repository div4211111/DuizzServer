import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/types/errorResponse';
import { ConnectType } from '../../common/types/connect.type';
import { QuestionResponse } from '../types/questionResponse';

export function ConnectOrDisconnectQuizzesToQuestionSwagger(type: ConnectType) {
    return applyDecorators(
        ApiOperation({
            summary:
                type === ConnectType.CONNECT
                    ? 'Связать вопрос с квизами'
                    : 'Отвязать вопрос от квизов',
        }),
        ApiOkResponse({
            description: `Вопрос успешно ${
                type === ConnectType.CONNECT ? 'связан с квизами' : 'отвязан от квизов'
            }`,
            type: QuestionResponse,
        }),
        ApiUnprocessableEntityResponse({
            description: `Не удалось ${
                type === ConnectType.CONNECT
                    ? 'связать вопрос с квизами'
                    : 'отвязать вопрос от квизов'
            }`,
            type: ErrorResponse,
        }),
    );
}
