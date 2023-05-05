import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserResponse implements Omit<User, 'hashedPassword' | 'refreshToken' | 'roles'> {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        type: 'integer',
        example: 4,
    })
    id: number;

    @ApiProperty({
        description: 'Электронная почта пользователя',
        format: 'email',
        example: 'my-email@mail.com',
    })
    email: string;

    @ApiProperty({
        description: 'Имя пользователя',
        example: 'Владимир',
    })
    name: string;

    @ApiProperty({
        description: 'Ссылка на фотографию профиля',
        format: 'uri',
        example: 'https://my-pofile-image.com/101',
    })
    photoUrl: string | null;

    @ApiProperty({
        description: 'Сумма всех результатов квизов',
        type: 'integer',
        example: 1024,
    })
    rating: number;

    @ApiProperty({
        description: 'Авторизация через Google',
        example: false,
    })
    googleAuth: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
