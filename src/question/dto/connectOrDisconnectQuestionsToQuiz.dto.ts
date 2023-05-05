import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class ConnectOrDisconnectQuizzesToQuestion {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty()
    quizzesId: number[];
}
