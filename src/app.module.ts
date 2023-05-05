import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { CategoriesModule } from './categories/categories.module';
import { QuizResultModule } from './quiz-result/quiz-result.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        AuthModule,
        UserModule,
        QuestionModule,
        QuizModule,
        CategoriesModule,
        QuizResultModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
