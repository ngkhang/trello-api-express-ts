/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import type { ErrorResponse } from '~/types/response.type';

export class ApiErrorResponse extends Error implements ErrorResponse {
  public readonly statusCode: StatusCodes;
  public readonly status = 'error';
  constructor({ message, statusCode }: Pick<ErrorResponse, 'message' | 'statusCode'>) {
    super();

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Internal Server Error (500)
 */
export class InternalServerError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super({ message, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.NOT_FOUND) {
    super({ message, statusCode: StatusCodes.NOT_FOUND });
  }
}

/**
 * Forbidden Error (403)
 */
export class ForbiddenError extends ApiErrorResponse {
  constructor(message: ErrorResponse['message'] = ReasonPhrases.FORBIDDEN) {
    super({ message, statusCode: StatusCodes.FORBIDDEN });
  }
}
