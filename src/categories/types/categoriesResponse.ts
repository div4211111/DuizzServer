import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';

export class CategoriesResponse implements Categories {
    @ApiProperty({
        type: 'integer',
    })
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
