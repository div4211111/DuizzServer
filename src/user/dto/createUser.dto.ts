import { IsOptional, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Электронная почта',
        format: 'email',
        example: 'my-email@mail.ru',
    })
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Пароль',
        minLength: 6,
        maxLength: 20,
        format: 'password',
        example: 'myPassword',
    })
    password?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @ApiProperty({
        description: 'Имя',
        minLength: 4,
        maxLength: 16,
        example: 'Виктор',
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Ссылка на фото профиля',
        format: 'uri',
        example: 'https://my-photo.com/101',
    })
    photoUrl?: string;
}
