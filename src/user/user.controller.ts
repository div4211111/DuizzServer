import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTPayload, User } from 'src/common/decorators/user.decorator';
import { UserResponse } from 'src/prisma/types/userResponse';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetAllUsersQueryType } from './types/getAllUserQueryType';
import { UserService } from './user.service';
import { AuthGuard } from '../common/decorators/auth.decorator';
import { GetAllUsersSwagger } from './decorators/getAllUsersSwagger.decorator';
import { GetByIdUserSwagger } from './decorators/getByIdUserSwagger.decorator';
import { UpdateUserSwagger } from './decorators/updateUserSwagger.decorator';
import { DeleteUserSwagger } from './decorators/deleteUserSwagger.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @GetAllUsersSwagger()
    @AuthGuard('USER')
    async getAll(@Query() query: GetAllUsersQueryType): Promise<UserResponse[]> {
        return await this.userService.getAll(query);
    }

    @Get(':id')
    @GetByIdUserSwagger()
    @AuthGuard('ADMIN')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
        return await this.userService.findById(id);
    }

    @Patch()
    @UpdateUserSwagger()
    @AuthGuard('USER')
    async update(
        @User() { sub }: JWTPayload,
        @Body() { name }: UpdateUserDto,
    ): Promise<UserResponse> {
        return await this.userService.update(sub, name);
    }

    @Delete('/:id')
    @DeleteUserSwagger()
    @AuthGuard('ADMIN')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
        return await this.userService.delete(id);
    }
}
