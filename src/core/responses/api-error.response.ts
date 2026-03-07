/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-07
 ------------------------------------------------- */

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { envConfig } from '~/config/env.config';
import type { ErrorDetail, ErrorResponse } from '~/types/response.type';

export class ApiErrorResponse extends Error implements ErrorResponse {
  public readonly statusCode: StatusCodes;
  public readonly status = 'error';
  public readonly error?: ErrorDetail;
  constructor({ message, statusCode, error }: Omit<ErrorResponse, 'status'>) {
    super();

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON(): Record<string, unknown> {
    const base: Record<string, unknown> = {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
      error: this.error,
    };

    if (envConfig.nodeEnv !== 'production' && this.stack) {
      base.stack = this.stack;
      base.name = this.name;
    }

    return base;
  }
}

/**
 * Internal Server Error (500)
 */
export class InternalServerError extends ApiErrorResponse {
  constructor(
    message: ErrorResponse['message'] = ReasonPhrases.INTERNAL_SERVER_ERROR,
    error?: ErrorDetail,
  ) {
    super({ message, statusCode: StatusCodes.INTERNAL_SERVER_ERROR, error });
  }
}

/**
 * Bad Request Error (400)
 */
export class BadRequestError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.BAD_REQUEST, error?: ErrorDetail) {
    super({ message, statusCode: StatusCodes.BAD_REQUEST, error });
  }
}

/**
 * UnAuthorized (401)
 */
export class UnauthorizedError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.UNAUTHORIZED, error?: ErrorDetail) {
    super({ message, statusCode: StatusCodes.UNAUTHORIZED, error });
  }
}

/**
 * Forbidden Error (403)
 */
export class ForbiddenError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.FORBIDDEN, error?: ErrorDetail) {
    super({ message, statusCode: StatusCodes.FORBIDDEN, error });
  }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.NOT_FOUND, error?: ErrorDetail) {
    super({ message, statusCode: StatusCodes.NOT_FOUND, error });
  }
}

/**
 * Conflict Error (409)
 */
export class ConflictError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.CONFLICT, error?: ErrorDetail) {
    super({ message, statusCode: StatusCodes.CONFLICT, error });
  }
}
