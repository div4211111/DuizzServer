import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuizDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Заголовок квиза',
        example: 'Любой заголовок',
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Описание квиза',
        example: 'Любое описание',
    })
    description: string;
}
