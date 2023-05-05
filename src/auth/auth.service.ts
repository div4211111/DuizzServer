import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/createUser.dto';
import * as argon2 from 'argon2';
import { LoginUserDto } from './dto/loginUser.dto';
import { google, Auth } from 'googleapis';
import { UserAndTokenResponse } from './types/userAndTokenResponse';
import { UserAlreadyExistException } from './exceptions/userAlreadyExist.exception';
import { UnauthorizedUserException } from './exceptions/unauthorizedUser.exception';
import { UserNotFoundException } from 'src/user/exceptions/userNotFound.exception';

@Injectable()
export class AuthService {
    oauthClient: Auth.OAuth2Client;
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        const clientID = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');

        this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
    }

    async googleAuth(token: string): Promise<UserAndTokenResponse> {
        const userInfo = await this.getUserData(token);
        let user = await this.userService.findByEmail(userInfo.email);
        if (user) {
            user = await this.userService.updateUserWithGoogle(userInfo.picture, userInfo.email);
        } else {
            user = await this.userService.create({
                email: userInfo.email,
                name: userInfo.given_name,
                photoUrl: userInfo.picture,
            });
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: this.userService.excludeUser(user, ['hashedPassword', 'refreshToken', 'roles']),
            tokens,
        };
    }

    async getUserData(token: string) {
        const userInfoClient = google.oauth2('v2').userinfo;

        this.oauthClient.setCredentials({
            access_token: token,
        });

        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient,
        });

        return userInfoResponse.data;
    }

    async signUp(createUserDto: CreateUserDto): Promise<UserAndTokenResponse> {
        const userExists = await this.userService.findByEmail(createUserDto.email);
        if (userExists) {
            throw new UserAlreadyExistException(createUserDto.email);
        }

        if (!createUserDto.password) {
            throw new UserNotFoundException();
        }

        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.userService.create({
            ...createUserDto,
            password: hash,
        });

        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return {
            user: this.userService.excludeUser(newUser, [
                'hashedPassword',
                'refreshToken',
                'roles',
            ]),
            tokens,
        };
    }

    async signIn(loginUserDto: LoginUserDto): Promise<UserAndTokenResponse> {
        const user = await this.userService.findByEmail(loginUserDto.email);
        if (!user) throw new UserNotFoundException();
        const passwordMatches = await argon2.verify(user.hashedPassword, loginUserDto.password);
        if (!passwordMatches) {
            throw new UserNotFoundException();
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: this.userService.excludeUser(user, ['hashedPassword', 'refreshToken', 'roles']),
            tokens,
        };
    }

    async logout(userId: number): Promise<UserAndTokenResponse> {
        const user = await this.userService.updateRefreshToken({ userId, refreshToken: null });
        const tokens = { accessToken: '', refreshToken: '' };
        return {
            user: this.userService.excludeUser(user, ['hashedPassword', 'refreshToken', 'roles']),
            tokens,
        };
    }

    async hashData(data: string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userService.updateRefreshToken({ userId, refreshToken: hashedRefreshToken });
    }

    async getTokens(userId: number, email: string) {
        const { roles } = await this.userService.findByEmail(email);
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    roles,
                },
                {
                    secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(userId: number, refreshToken: string): Promise<UserAndTokenResponse> {
        const user = await this.userService.findById(userId);
        if (!user || !user.refreshToken) {
            throw new UnauthorizedUserException();
        }
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if (!refreshTokenMatches) {
            throw new UnauthorizedUserException();
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: this.userService.excludeUser(user, ['hashedPassword', 'refreshToken', 'roles']),
            tokens,
        };
    }
}
