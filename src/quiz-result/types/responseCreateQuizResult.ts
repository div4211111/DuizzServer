import { Question } from '@prisma/client';

export interface ResponseCreateResult extends Question {
    userAnswer: number;
}
