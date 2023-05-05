import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAndUpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Имя категории',
        examples: [
            { value: 'Наука', summary: 'Наука' },
            { value: 'Спорт', summary: 'Спорт' },
        ],
    })
    title: string;
}
