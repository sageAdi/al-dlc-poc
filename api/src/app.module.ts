import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ApiConfigModule } from './config/config.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ApiConfigModule, PrismaModule, UsersModule, EmailModule, AuthModule]
})
export class AppModule {}
