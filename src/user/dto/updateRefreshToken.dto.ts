import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRefreshTokenDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}
