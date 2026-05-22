import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const stringBoolean = z.preprocess((value) => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return value;
}, z.boolean());

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  FRONTEND_ORIGIN: z.string().url(),
  FRONTEND_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(900),
  REFRESH_TOKEN_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(604800),
  EMAIL_TOKEN_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(3600),
  ACCESS_COOKIE_NAME: z.string().min(1).default('aidlc_access'),
  REFRESH_COOKIE_NAME: z.string().min(1).default('aidlc_refresh'),
  COOKIE_SECURE: stringBoolean.default(false),
  COOKIE_SAME_SITE: z.enum(['lax', 'strict', 'none']).default('lax'),
  COOKIE_DOMAIN: z.string().optional().default(''),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_SECURE: stringBoolean.default(false),
  SMTP_USER: z.string().optional().default(''),
  SMTP_PASS: z.string().optional().default(''),
  SMTP_FROM: z.string().email()
});

export type AppEnv = z.infer<typeof envSchema>;

export type CookieSameSite = 'lax' | 'strict' | 'none';

@Injectable()
export class AppConfig {
  private readonly env: AppEnv;

  constructor() {
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
      const details = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
      throw new Error(`Invalid API configuration: ${details}`);
    }

    this.env = parsed.data;
  }

  get nodeEnv() {
    return this.env.NODE_ENV;
  }

  get port() {
    return this.env.PORT;
  }

  get databaseUrl() {
    return this.env.DATABASE_URL;
  }

  get frontendOrigin() {
    return this.env.FRONTEND_ORIGIN;
  }

  get frontendUrl() {
    return this.env.FRONTEND_URL;
  }

  get auth() {
    return {
      accessSecret: this.env.JWT_ACCESS_SECRET,
      accessExpiresInSeconds: this.env.JWT_ACCESS_EXPIRES_IN_SECONDS,
      refreshExpiresInSeconds: this.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
      emailTokenExpiresInSeconds: this.env.EMAIL_TOKEN_EXPIRES_IN_SECONDS
    };
  }

  get cookies() {
    return {
      accessName: this.env.ACCESS_COOKIE_NAME,
      refreshName: this.env.REFRESH_COOKIE_NAME,
      secure: this.env.COOKIE_SECURE,
      sameSite: this.env.COOKIE_SAME_SITE as CookieSameSite,
      domain: this.env.COOKIE_DOMAIN || undefined
    };
  }

  get smtp() {
    return {
      host: this.env.SMTP_HOST,
      port: this.env.SMTP_PORT,
      secure: this.env.SMTP_SECURE,
      user: this.env.SMTP_USER || undefined,
      pass: this.env.SMTP_PASS || undefined,
      from: this.env.SMTP_FROM
    };
  }
}
