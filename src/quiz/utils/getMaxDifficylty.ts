import { DifficultyType } from 'src/question/types/difficulty.type';
import { CreateQuestionDto } from '../../question/dto/createQuestion.dto';

export const getMaxDifficulty = (questions: CreateQuestionDto[]): DifficultyType => {
    const difficultyCount = {};

    questions.forEach((question) => {
        difficultyCount[question.difficulty] = (difficultyCount[question.difficulty] || 0) + 1;
    });

    const maxDifficulty = Object.keys(difficultyCount).reduce((a, b) =>
        difficultyCount[a] > difficultyCount[b] ? a : b,
    );

    return maxDifficulty as DifficultyType;
};
