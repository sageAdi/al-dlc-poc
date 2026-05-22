import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '../common/errors/api-error';
import { ApiErrorCode } from '../common/errors/api-error-codes';
import { AppConfig } from '../config/app-config';
import { CurrentUser } from './current-user.decorator';
import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto, VerifyEmailDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthSession } from './auth.types';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PublicUser } from '../users/user.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: AppConfig
  ) {}

  @Post('signup')
  signUp(@Body() input: SignUpDto) {
    return this.authService.signUp(input);
  }

  @Post('verify-email')
  verifyEmail(@Body() input: VerifyEmailDto) {
    return this.authService.verifyEmail(input);
  }

  @Post('signin')
  async signIn(@Body() input: SignInDto, @Res({ passthrough: true }) response: Response) {
    const session = await this.authService.signIn(input);
    this.setAuthCookies(response, session);
    return session.user;
  }

  @Post('refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies?.[this.config.cookies.refreshName];
    if (!refreshToken) {
      throw ApiError.unauthorized(ApiErrorCode.UNAUTHENTICATED, 'Authentication required.');
    }

    const session = await this.authService.refresh(refreshToken);
    this.setAccessCookie(response, session.accessToken);
    return { message: 'Session refreshed.' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: PublicUser) {
    return user;
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signOut(@CurrentUser() user: PublicUser, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.signOut(user.id);
    this.clearAuthCookies(response);
    return result;
  }

  @Post('forgot-password')
  forgotPassword(@Body() input: ForgotPasswordDto) {
    return this.authService.requestPasswordReset(input);
  }

  @Post('reset-password')
  resetPassword(@Body() input: ResetPasswordDto) {
    return this.authService.resetPassword(input);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protected(@CurrentUser() user: PublicUser) {
    return { message: 'Protected resource available.', user };
  }

  private setAuthCookies(response: Response, session: AuthSession) {
    this.setAccessCookie(response, session.accessToken);
    if (session.refreshToken && session.refreshTokenExpiresAt) {
      response.cookie(this.config.cookies.refreshName, session.refreshToken, {
        ...this.cookieOptions(),
        expires: session.refreshTokenExpiresAt
      });
    }
  }

  private setAccessCookie(response: Response, token: string) {
    response.cookie(this.config.cookies.accessName, token, {
      ...this.cookieOptions(),
      maxAge: this.config.auth.accessExpiresInSeconds * 1000
    });
  }

  private clearAuthCookies(response: Response) {
    response.clearCookie(this.config.cookies.accessName, this.cookieOptions());
    response.clearCookie(this.config.cookies.refreshName, this.cookieOptions());
  }

  private cookieOptions() {
    return {
      httpOnly: true,
      secure: this.config.cookies.secure,
      sameSite: this.config.cookies.sameSite,
      domain: this.config.cookies.domain,
      path: '/'
    } as const;
  }
}
