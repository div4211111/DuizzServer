import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserAndTokenResponse } from './types/userAndTokenResponse';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { TokenVerificationDto } from './dto/tokenVerification.dto';
import { JWTPayload } from '../common/decorators/user.decorator';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    const mockUserAndTokenResponse: UserAndTokenResponse = {
        user: {
            id: 1,
            email: 'some-email@mail.com',
            name: 'егор',
            photoUrl: null,
            rating: 0,
            googleAuth: false,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        },
        tokens: {
            accessToken: 'randomToken',
            refreshToken: 'randomToken',
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        signUp: jest.fn(),
                        signIn: jest.fn(),
                        googleAuth: jest.fn(),
                        logout: jest.fn(),
                        refreshTokens: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });
    describe('signUp', () => {
        it('should return a UserAndTokenResponse', async () => {
            const mockCreateUserDto: CreateUserDto = {
                email: 'some-email@mail.com',
                name: 'егор',
                password: 'some-password',
            };

            (authService.signUp as jest.Mock).mockResolvedValue(mockUserAndTokenResponse);

            expect(await controller.signUp(mockCreateUserDto)).toBe(mockUserAndTokenResponse);
            expect(authService.signUp).toHaveBeenCalledWith(mockCreateUserDto);
        });
    });
    describe('SignIn', () => {
        it('should return a UserAndTokenResponse', async () => {
            const mockLoginUserDto: LoginUserDto = {
                email: 'some-email@mail.com',
                password: 'some-password',
            };
            (authService.signIn as jest.Mock).mockResolvedValue(mockUserAndTokenResponse);

            expect(await controller.signIn(mockLoginUserDto)).toBe(mockUserAndTokenResponse);
            expect(authService.signIn).toHaveBeenCalledWith(mockLoginUserDto);
        });
    });
    describe('googleAuth', () => {
        it('should return a UserAndTokenResponse', async () => {
            const mockTokenVerificationDto: TokenVerificationDto = { token: 'random-google-token' };
            (authService.googleAuth as jest.Mock).mockResolvedValue(mockUserAndTokenResponse);

            expect(await controller.googleAuth(mockTokenVerificationDto)).toBe(
                mockUserAndTokenResponse,
            );
            expect(authService.googleAuth).toHaveBeenCalledWith(mockTokenVerificationDto.token);
        });
    });
    describe('logOut', () => {
        it('should return a UserAndTokenResponse', async () => {
            const mockUserJWTPayload: JWTPayload = {
                sub: 1,
                email: 'some-email@mail.com',
                roles: ['USER'],
            };
            (authService.logout as jest.Mock).mockResolvedValue(mockUserAndTokenResponse);

            expect(await controller.logOut(mockUserJWTPayload)).toBe(mockUserAndTokenResponse);
            expect(authService.logout).toHaveBeenCalledWith(mockUserJWTPayload.sub);
        });
    });
    describe('refreshToken', () => {
        it('should return a UserAndTokenResponse', async () => {
            const mockUserJWTPayload: JWTPayload & { refreshToken: string } = {
                sub: 1,
                email: 'some-email@mail.com',
                roles: ['USER'],
                refreshToken: 'some-refresh-token',
            };

            (authService.refreshTokens as jest.Mock).mockResolvedValue(mockUserAndTokenResponse);

            expect(await controller.refreshTokens(mockUserJWTPayload)).toBe(
                mockUserAndTokenResponse,
            );

            expect(authService.refreshTokens).toHaveBeenCalledWith(
                mockUserJWTPayload.sub,
                mockUserJWTPayload.refreshToken,
            );
        });
    });
});
