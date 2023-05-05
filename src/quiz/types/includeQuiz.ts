export const IncludeQuiz = {
    ALL: 'all',
    CATEGORIES: 'categories',
    QUESTIONS: 'questions',
    RESULTS: 'results',
} as const;

export type IncludeQuiz = (typeof IncludeQuiz)[keyof typeof IncludeQuiz];
