import { UserResponse } from 'src/prisma/types/userResponse';
import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse {
    @ApiProperty({
        description: 'Токен доступа пользователя',
    })
    accessToken: string;

    @ApiProperty({
        description: 'Токен обновления пользователя',
    })
    refreshToken: string;
}
export class UserAndTokenResponse {
    @ApiProperty({
        description: 'Данные пользователя',
        type: UserResponse,
    })
    user: UserResponse;

    @ApiProperty({
        description: 'Токены пользователя',
        type: TokensResponse,
    })
    tokens: TokensResponse;
}
