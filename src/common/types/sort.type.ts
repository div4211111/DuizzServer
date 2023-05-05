export const SortType = {
    ASC: 'asc',
    DESC: 'desc',
} as const;
export type SortType = (typeof SortType)[keyof typeof SortType];
