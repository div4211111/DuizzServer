import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateQuizResultDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Значение результата',
        type: 'integer',
        example: 160,
    })
    value: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Идентификатор автора результата',
        type: 'integer',
        example: 10,
    })
    authorId: number;
}
