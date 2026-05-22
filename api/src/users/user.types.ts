import { User } from '@prisma/client';

export type PublicUser = {
  id: string;
  email: string;
  emailVerifiedAt: Date | null;
};

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    emailVerifiedAt: user.emailVerifiedAt
  };
}
