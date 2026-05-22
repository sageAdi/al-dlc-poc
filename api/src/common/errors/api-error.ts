import { HttpStatus } from '@nestjs/common';
import { ApiErrorCodeValue } from './api-error-codes';

export type ApiFieldError = {
  field: string;
  message: string;
};

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: ApiErrorCodeValue,
    message: string,
    public readonly fields: ApiFieldError[] = []
  ) {
    super(message);
  }

  static badRequest(code: ApiErrorCodeValue, message: string, fields: ApiFieldError[] = []) {
    return new ApiError(HttpStatus.BAD_REQUEST, code, message, fields);
  }

  static unauthorized(code: ApiErrorCodeValue, message: string) {
    return new ApiError(HttpStatus.UNAUTHORIZED, code, message);
  }

  static conflict(code: ApiErrorCodeValue, message: string) {
    return new ApiError(HttpStatus.CONFLICT, code, message);
  }

  static failedDependency(code: ApiErrorCodeValue, message: string) {
    return new ApiError(HttpStatus.FAILED_DEPENDENCY, code, message);
  }
}
