import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import { UpdateRefreshTokenDto } from './dto/updateRefreshToken.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { GetAllUsersQueryType } from './types/getAllUserQueryType';
import { UsersNotFoundException } from './exceptions/usersNotFound.exception';
import { UpdateUserException } from './exceptions/updateUser.exception';
import { DeleteUserException } from './exceptions/deleteUser.exception';
import { SortType } from '../common/types/sort.type';
import { UserResponse } from '@/src/prisma/types/userResponse';
import { CreateUserException } from '@/src/user/exceptions/createUser.exception';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getAll({
        sortByDate,
        sortByRating,
        skip,
        take,
    }: GetAllUsersQueryType): Promise<UserResponse[]> {
        try {
            const users = await this.prisma.user.findMany({
                orderBy: [
                    sortByRating === SortType.ASC
                        ? { rating: 'asc' }
                        : sortByRating === SortType.DESC
                            ? { rating: 'desc' }
                            : undefined,
                    sortByDate === SortType.ASC
                        ? { createdAt: 'asc' }
                        : sortByRating === SortType.DESC
                            ? { createdAt: 'desc' }
                            : undefined,
                ],
                skip,
                take,
            });

            return users.map((user) =>
                this.excludeUser(user, ['hashedPassword', 'refreshToken', 'roles']),
            );
        } catch (_) {
            throw new UsersNotFoundException();
        }
    }

    async create({ password, email, name, photoUrl }: CreateUserDto): Promise<User> {
        try {
            return this.prisma.user.create({
                data: {
                    email: email,
                    ...(password !== undefined
                        ? {
                            hashedPassword: password,
                        }
                        : {
                            photoUrl,
                            googleAuth: true,
                        }),
                    name: name,
                },
            });
        } catch (_) {
            throw new CreateUserException();
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return this.prisma.user.findMany();
        } catch (_) {
            throw new UserNotFoundException();
        }
    }

    async findById(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new UserNotFoundException(email);
        }
        return user;
    }

    async updateRefreshToken(updateRefreshTokenDto: UpdateRefreshTokenDto): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: {
                    id: updateRefreshTokenDto.userId,
                },
                data: {
                    refreshToken: updateRefreshTokenDto.refreshToken,
                },
            });
        } catch (_) {
            throw new UpdateUserException(updateRefreshTokenDto.userId);
        }
    }

    async updateUserWithGoogle(picture: string, email: string): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: {
                    email,
                },
                data: {
                    googleAuth: true,
                    photoUrl: picture,
                },
            });
        } catch (_) {
            throw new UpdateUserException(email);
        }
    }

    async updateRating(value: number, userId: number): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    rating: value,
                },
            });
        } catch (_) {
            throw new UpdateUserException(userId);
        }
    }

    async update(id: number, name: string): Promise<UserResponse> {
        try {
            const user = await this.prisma.user.update({
                where: { id },
                data: { name },
            });
            return this.excludeUser(user, ['refreshToken', 'hashedPassword', 'roles']);
        } catch (_) {
            throw new UpdateUserException(id);
        }
    }

    async delete(id: number) {
        try {
            const user = await this.prisma.user.delete({
                where: {
                    id,
                },
            });

            return this.excludeUser(user, ['refreshToken', 'hashedPassword', 'roles']);
        } catch (_) {
            throw new DeleteUserException(id);
        }
    }

    excludeUser<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
        for (const key of keys) {
            delete user[key];
        }
        return user;
    }
}
