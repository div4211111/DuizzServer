export const ConnectType = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
} as const;
export type ConnectType = (typeof ConnectType)[keyof typeof ConnectType];
