import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { TokenVerificationDto } from './dto/tokenVerification.dto';
import { UserAndTokenResponse } from './types/userAndTokenResponse';
import { JWTPayload, User } from 'src/common/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignUpSwagger } from './decorators/signUpSwagger.decorator';
import { SignInSwagger } from './decorators/signInSwagger.decorator';
import { AuthGuard } from '../common/decorators/auth.decorator';
import { LogOutSwagger } from './decorators/logOutSwagger.decorator';
import { RefreshTokenSwagger } from './decorators/refreshTokenSwagger.decorator';
import { GoogleSwagger } from './decorators/googleSwagger.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SignUpSwagger()
    @Post('signup')
    async signUp(@Body() dto: CreateUserDto): Promise<UserAndTokenResponse> {
        return await this.authService.signUp(dto);
    }

    @SignInSwagger()
    @Post('signin')
    async signIn(@Body() dto: LoginUserDto): Promise<UserAndTokenResponse> {
        return await this.authService.signIn(dto);
    }

    @GoogleSwagger()
    @Post('google')
    async googleAuth(@Body() dto: TokenVerificationDto): Promise<UserAndTokenResponse> {
        return await this.authService.googleAuth(dto.token);
    }

    @LogOutSwagger()
    @AuthGuard('USER')
    @Patch('logout')
    async logOut(@User() user: JWTPayload): Promise<UserAndTokenResponse> {
        return await this.authService.logout(user.sub);
    }

    @RefreshTokenSwagger()
    @UseGuards(RefreshTokenGuard)
    @Patch('refresh')
    async refreshTokens(
        @User() user: JWTPayload & { refreshToken: string },
    ): Promise<UserAndTokenResponse> {
        const userId = user['sub'];
        const refreshToken = user['refreshToken'];
        return await this.authService.refreshTokens(userId, refreshToken);
    }
}
