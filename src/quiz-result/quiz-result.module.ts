import { Module } from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { QuizResultController } from './quiz-result.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [PrismaModule, QuizModule, QuestionModule, UserModule],
    providers: [QuizResultService],
    controllers: [QuizResultController],
    exports: [QuizResultService],
})
export class QuizResultModule {}
