import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponse {
    @ApiProperty()
    message: string;

    @ApiProperty({
        enum: HttpStatus,
    })
    statusCode: HttpStatus;

    @ApiPropertyOptional()
    error?: string;
}
