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
import { Quiz } from '@prisma/client';
import { AuthGuard } from 'src/common/decorators/auth.decorator';
import { CreateQuizSwagger } from './decorators/CreateQuizSwagger.decorator';
import { GetAllQuizSwagger } from './decorators/getAllQuizSwagger.decorator';
import { GetByIdQuizSwagger } from './decorators/getByIdQuizSwagger.decorator';
import { UpdateQuizSwagger } from './decorators/updateQuizSwagger.decorator';
import { ConnectOrDisconnectCatToQuizDto } from './dto/connectOrDisconnectCatToQuiz.dto';
import { ConnectOrDisconnectQuestionsToQuizDto } from './dto/connectOrDisconnectQuestionsToQuiz.dto';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { UpdateQuizDto } from './dto/updateQuiz.dto';
import { QuizService } from './quiz.service';
import { FindAllQuizQuery } from './types/findAllQuizQuery';
import { FindQuizByIdQuery } from './types/findQuizByIdQuery';
import { QuizResponse } from './types/QuizResponse';
import { ConnectType } from '../common/types/connect.type';
import { ConnectOrDisconnectCategoriesToQuizSwagger } from './decorators/connectOrDisconnectCategoriesToQuizSwagger.decorator';
import { ConnectOrDisconnectQuestionsToQuizSwagger } from './decorators/connectOrDisconnectQuestionsToQuizSwagger.decorator';
import { DeleteQuizSwagger } from './decorators/deleteQuizSwagger.decorator';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @GetAllQuizSwagger()
    @Get()
    async getAll(@Query() query: FindAllQuizQuery): Promise<QuizResponse[]> {
        return await this.quizService.getAll(query);
    }

    @GetByIdQuizSwagger()
    @Get(':id')
    async getById(
        @Param('id', ParseIntPipe) id: number,
        @Query() query: FindQuizByIdQuery,
    ): Promise<QuizResponse> {
        return await this.quizService.getById(id, query);
    }

    @CreateQuizSwagger()
    @AuthGuard('ADMIN')
    @Post()
    async createQuiz(@Body() dto: CreateQuizDto): Promise<QuizResponse> {
        return await this.quizService.createQuiz(dto);
    }

    @UpdateQuizSwagger()
    @AuthGuard('ADMIN')
    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateQuizDto,
    ): Promise<QuizResponse> {
        return await this.quizService.updateById(id, dto);
    }

    @ConnectOrDisconnectCategoriesToQuizSwagger(ConnectType.CONNECT)
    @AuthGuard('ADMIN')
    @Patch('/connect-to-categories')
    async connectCategoriesToQuiz(@Body() dto: ConnectOrDisconnectCatToQuizDto) {
        return await this.quizService.connectOrDisconnectCategoriesToQuiz(dto, ConnectType.CONNECT);
    }

    @ConnectOrDisconnectCategoriesToQuizSwagger(ConnectType.DISCONNECT)
    @AuthGuard('ADMIN')
    @Patch('/disconnect-to-categories')
    async disconnectCategoriesToQuiz(@Body() dto: ConnectOrDisconnectCatToQuizDto) {
        return await this.quizService.connectOrDisconnectCategoriesToQuiz(
            dto,
            ConnectType.DISCONNECT,
        );
    }

    @ConnectOrDisconnectQuestionsToQuizSwagger(ConnectType.CONNECT)
    @AuthGuard('ADMIN')
    @Patch('/connect-to-questions')
    async connectQuestionsToQuiz(@Body() dto: ConnectOrDisconnectQuestionsToQuizDto) {
        return await this.quizService.connectOrDisconnectQuestionsToQuiz(dto, ConnectType.CONNECT);
    }

    @ConnectOrDisconnectQuestionsToQuizSwagger(ConnectType.DISCONNECT)
    @AuthGuard('ADMIN')
    @Patch('/disconnect-to-questions')
    async disconnectQuestionsToQuiz(@Body() dto: ConnectOrDisconnectQuestionsToQuizDto) {
        return await this.quizService.connectOrDisconnectQuestionsToQuiz(
            dto,
            ConnectType.DISCONNECT,
        );
    }

    @DeleteQuizSwagger()
    @AuthGuard('ADMIN')
    @Delete(':id')
    async deleteQuiz(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
        return await this.quizService.deleteQuiz(id);
    }
}
