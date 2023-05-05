import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class ConnectOrDisconnectCatToQuizDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Идентификатор квиза',
        type: 'integer',
        example: 1,
    })
    id: number;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({
        description: 'Идентификаторы категорий',
        type: 'array',
        items: {
            type: 'integer',
        },
        example: [1, 4, 6, 7],
    })
    categoriesId: number[];
}
