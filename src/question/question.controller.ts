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
import { AuthGuard } from 'src/common/decorators/auth.decorator';
import { ConnectOrDisconnectQuizzesToQuestion } from './dto/connectOrDisconnectQuestionsToQuiz.dto';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { QuestionService } from './question.service';
import { FindAllQuestionsQuery } from './types/findAllQuestionsQuery';
import { QuestionResponse } from './types/questionResponse';
import { GetAllQuestionSwagger } from './decorators/getAllQuestionSwagger.decorator';
import { GetByIdQuestionSwagger } from './decorators/getByIdQuestionSwagger.decorator';
import { CreateQuestionSwagger } from './decorators/CreateQuestionSwagger.decorator';
import { UpdateQuestionSwagger } from './decorators/updateQuestionSwagger.decorator';
import { ConnectOrDisconnectQuizzesToQuestionSwagger } from './decorators/connectOrDisconnectQuizzesToQuestionSwagger.decorator';
import { ConnectType } from '../common/types/connect.type';
import { DeleteQuestionSwagger } from './decorators/deleteQuestionSwagger.decorator';
import { UpdateQuestionDto } from './dto/updateQueston.dto';

@ApiTags('question')
@AuthGuard('ADMIN')
@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @GetAllQuestionSwagger()
    @Get()
    async getAll(@Query() query: FindAllQuestionsQuery): Promise<QuestionResponse[]> {
        return this.questionService.qetAll(query);
    }

    @GetByIdQuestionSwagger()
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<QuestionResponse> {
        return await this.questionService.getById(id);
    }

    @CreateQuestionSwagger()
    @Post()
    async create(@Body() dto: CreateQuestionDto): Promise<QuestionResponse> {
        return await this.questionService.createQuestion(dto);
    }

    @UpdateQuestionSwagger()
    @Patch('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateQuestionDto,
    ): Promise<QuestionResponse> {
        return await this.questionService.updateById(dto, id);
    }

    @ConnectOrDisconnectQuizzesToQuestionSwagger(ConnectType.CONNECT)
    @Patch('/connect-quizzes')
    async connectQuizzesToQuestion(
        @Body() dto: ConnectOrDisconnectQuizzesToQuestion,
    ): Promise<QuestionResponse> {
        return await this.questionService.connectOrDisconnectQuizzesToQuestion(
            dto,
            ConnectType.CONNECT,
        );
    }

    @ConnectOrDisconnectQuizzesToQuestionSwagger(ConnectType.DISCONNECT)
    @Patch('/disconnect-quizzes')
    async disconnectQuizzesToQuestion(
        @Body() dto: ConnectOrDisconnectQuizzesToQuestion,
    ): Promise<QuestionResponse> {
        return await this.questionService.connectOrDisconnectQuizzesToQuestion(
            dto,
            ConnectType.DISCONNECT,
        );
    }

    @DeleteQuestionSwagger()
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<QuestionResponse> {
        return await this.questionService.deleteById(id);
    }
}
