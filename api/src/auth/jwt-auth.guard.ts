import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApiError } from '../common/errors/api-error';
import { ApiErrorCode } from '../common/errors/api-error-codes';
import { AppConfig } from '../config/app-config';
import { UsersService } from '../users/users.service';
import { toPublicUser } from '../users/user.types';
import { TokenService } from './token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly config: AppConfig,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request & { user?: unknown }>();
    const token = request.cookies?.[this.config.cookies.accessName];

    if (!token) {
      throw ApiError.unauthorized(ApiErrorCode.UNAUTHENTICATED, 'Authentication required.');
    }

    const payload = this.tokenService.verifyAccessToken(token);
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw ApiError.unauthorized(ApiErrorCode.UNAUTHENTICATED, 'Authentication required.');
    }

    request.user = toPublicUser(user);
    return true;
  }
}
