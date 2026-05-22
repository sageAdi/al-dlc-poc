import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Response } from 'express';
import { ApiError } from './api-error';
import { ApiErrorCode } from './api-error-codes';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ApiError) {
      return response.status(exception.statusCode).json({
        error: {
          code: exception.code,
          message: exception.message,
          fields: exception.fields
        }
      });
    }

    if (exception instanceof BadRequestException) {
      const payload = exception.getResponse() as { message?: string[] | string };
      const messages = Array.isArray(payload.message) ? payload.message : [payload.message || 'Validation failed'];

      return response.status(HttpStatus.BAD_REQUEST).json({
        error: {
          code: ApiErrorCode.VALIDATION_FAILED,
          message: 'Validation failed.',
          fields: messages.map((message) => ({ field: 'request', message }))
        }
      });
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        error: {
          code: ApiErrorCode.INTERNAL_ERROR,
          message: exception.message,
          fields: []
        }
      });
    }

    this.logger.error('Unexpected API error', exception instanceof Error ? exception.stack : String(exception));

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        code: ApiErrorCode.INTERNAL_ERROR,
        message: 'Unexpected server error.',
        fields: []
      }
    });
  }
}
