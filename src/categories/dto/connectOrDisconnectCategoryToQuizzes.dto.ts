import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class ConnectOrDisconnectCategoryToQuizzesDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Идентификатор категории',
        examples: [
            { value: 1, summary: 'Категория с идентификатором 1' },
            { value: 5, summary: 'Категория с идентификатором 5' },
        ],
        type: 'integer',
    })
    id: number;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({
        description: 'Идентификаторы квизов',
        examples: [
            { value: [1, 2], summary: 'Квизы с идентификаторами 1,2' },
            { value: [5, 6, 7], summary: 'Квизы с идентификаторами 5,6,7' },
        ],
        type: 'array',
        items: {
            type: 'integer',
        },
    })
    quizzesId: number[];
}
