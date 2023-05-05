import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class TokenVerificationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Токен доступа Google',
    })
    token: string;
}
