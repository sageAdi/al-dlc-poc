import { PublicUser } from '../users/user.types';

export type AuthSession = {
  user: PublicUser;
  accessToken: string;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
};

export type AccessTokenPayload = {
  sub: string;
  email: string;
};
