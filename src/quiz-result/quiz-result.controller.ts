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
import { JWTPayload, User } from 'src/common/decorators/user.decorator';
import { CreateQuizResultDto } from './dto/createQuizResult.dto';
import { UpdateQuizResultDto } from './dto/updateQuizResult.dto';
import { QuizResultService } from './quiz-result.service';
import { FindAllQuizResultQuery } from './types/findAllQuizResultQuery';
import { ResponseCreateResult } from './types/responseCreateQuizResult';
import { QuizResultResponse } from './types/quizResultResponse';
import { AuthGuard } from '../common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetAllQuizResultSwagger } from './decorators/getAllQuizResultSwagger.decorator';
import { GetByIdQuizResultSwagger } from './decorators/getByIdQuizResultSwagger.decorator';
import { CreateQuizResultSwagger } from './decorators/createQuizResultSwagger.decorator';
import { UpdateQuizResultSwagger } from './decorators/updateQuizResultSwagger.decorator';
import { DeleteQuizResultSwagger } from './decorators/deleteQuizResultSwagger.decorator';

@ApiTags('quiz-result')
@Controller('quiz-result')
export class QuizResultController {
    constructor(private readonly quizResultService: QuizResultService) {}

    @GetAllQuizResultSwagger()
    @Get()
    async getAll(@Query() query: FindAllQuizResultQuery): Promise<QuizResultResponse[]> {
        return await this.quizResultService.getAll(query);
    }

    @GetByIdQuizResultSwagger()
    @AuthGuard('USER')
    @Get('for-user')
    async getByUserId(@User() { sub }: JWTPayload): Promise<QuizResultResponse[]> {
        return await this.quizResultService.getById(sub);
    }

    @CreateQuizResultSwagger()
    @AuthGuard('USER')
    @Post()
    async createQuizResult(
        @Body() dto: CreateQuizResultDto,
        @User() user: JWTPayload,
    ): Promise<ResponseCreateResult[]> {
        return await this.quizResultService.createQuizResult(dto, user.sub);
    }

    @UpdateQuizResultSwagger()
    @AuthGuard('ADMIN')
    @Patch('/:id')
    async updateQuizResult(
        @Body() dto: UpdateQuizResultDto,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<QuizResultResponse> {
        return await this.quizResultService.update(dto, id);
    }

    @DeleteQuizResultSwagger()
    @AuthGuard('ADMIN')
    @Delete('/:id')
    async deleteQuizResult(@Param('id', ParseIntPipe) id: number): Promise<QuizResultResponse> {
        return await this.quizResultService.delete(id);
    }
}
