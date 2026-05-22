import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { ApiError } from '../common/errors/api-error';
import { ApiErrorCode } from '../common/errors/api-error-codes';
import { AppConfig } from '../config/app-config';
import {
  passwordResetEmail,
  unknownAccountPasswordResetNotification,
  verificationEmail
} from './email.templates';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: Transporter;

  constructor(private readonly config: AppConfig) {
    const smtp = this.config.smtp;
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: smtp.user && smtp.pass ? { user: smtp.user, pass: smtp.pass } : undefined
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const template = verificationEmail({
      appUrl: this.config.frontendUrl,
      email,
      token
    });
    await this.send(email, template.subject, template.text, template.html);
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const template = passwordResetEmail({
      appUrl: this.config.frontendUrl,
      email,
      token
    });
    await this.send(email, template.subject, template.text, template.html);
  }

  async sendUnknownAccountPasswordResetNotification(email: string) {
    const template = unknownAccountPasswordResetNotification();
    await this.send(email, template.subject, template.text, template.html);
  }

  private async send(to: string, subject: string, text: string, html: string) {
    try {
      await this.transporter.sendMail({
        from: this.config.smtp.from,
        to,
        subject,
        text,
        html
      });
    } catch (error) {
      this.logger.error('SMTP send failed', error instanceof Error ? error.stack : String(error));
      throw ApiError.failedDependency(
        ApiErrorCode.EMAIL_DELIVERY_FAILED,
        'We could not send the email. Please try again.'
      );
    }
  }
}
