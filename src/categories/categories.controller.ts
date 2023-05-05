import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { ConnectOrDisconnectCategoryToQuizzesDto } from './dto/connectOrDisconnectCategoryToQuizzes.dto';
import { CreateAndUpdateCategoryDto } from './dto/createCategory.dto';
import { CategoriesResponse } from './types/categoriesResponse';
import { GetAllCategoryQuery } from './types/getAllCategoriesQuery';
import { ConnectType } from '../common/types/connect.type';
import { AuthGuard } from '../common/decorators/auth.decorator';
import { GetAllCategoriesSwagger } from './decorators/getAllCategoriesSwagger.decorator';
import { GetByIdCategoriesSwagger } from './decorators/getByIdCategoriesSwagger.decorator';
import { CreateCategoriesSwagger } from './decorators/createCategoriesSwagger.decorator';
import { UpdateCategoriesSwagger } from './decorators/updateCategoriesSwagger.decorator';
import { ConnectOrDisconnectCategoryToQuizzesSwagger } from './decorators/connectOrDisconnectCategoryToQuizzesSwagger.decorator';
import { DeleteCategoriesSwagger } from './decorators/deleteCategoriesSwagger.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @GetAllCategoriesSwagger()
    @Get()
    async getAll(@Query() query: GetAllCategoryQuery): Promise<CategoriesResponse[]> {
        return await this.categoriesService.getAll(query);
    }

    @GetByIdCategoriesSwagger()
    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<CategoriesResponse> {
        return await this.categoriesService.getById(id);
    }

    @CreateCategoriesSwagger()
    @AuthGuard('ADMIN')
    @Post()
    async create(@Body() dto: CreateAndUpdateCategoryDto): Promise<CategoriesResponse> {
        return await this.categoriesService.create(dto);
    }

    @UpdateCategoriesSwagger()
    @AuthGuard('ADMIN')
    @Patch('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateAndUpdateCategoryDto,
    ): Promise<CategoriesResponse> {
        return await this.categoriesService.update(dto, id);
    }

    @ConnectOrDisconnectCategoryToQuizzesSwagger(ConnectType.CONNECT)
    @AuthGuard('ADMIN')
    @Patch('/connect-to-quizzes')
    async connectCategoryToQuizzes(
        @Body() dto: ConnectOrDisconnectCategoryToQuizzesDto,
    ): Promise<CategoriesResponse> {
        return await this.categoriesService.connectOrDisconnectCategoryToQuizzes(
            dto,
            ConnectType.CONNECT,
        );
    }

    @ConnectOrDisconnectCategoryToQuizzesSwagger(ConnectType.DISCONNECT)
    @AuthGuard('ADMIN')
    @Patch('/disconnect-to-quizzes')
    async disconnectCategoryToQuizzes(
        @Body() dto: ConnectOrDisconnectCategoryToQuizzesDto,
    ): Promise<CategoriesResponse> {
        return await this.categoriesService.connectOrDisconnectCategoryToQuizzes(dto, 'disconnect');
    }

    @DeleteCategoriesSwagger()
    @AuthGuard('ADMIN')
    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CategoriesResponse> {
        return await this.categoriesService.delete(id);
    }
}
