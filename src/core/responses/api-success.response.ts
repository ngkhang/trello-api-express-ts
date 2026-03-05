/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-05
 ------------------------------------------------- */

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import type { SuccessResponse } from '~/types/response.type';

export class ApiSuccessResponse<T> implements SuccessResponse<T> {
  public readonly status = 'success';
  public readonly statusCode: StatusCodes;
  public readonly message: string;
  public readonly data: T;

  constructor({ message, statusCode, data }: Omit<SuccessResponse<T>, 'status'>) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  public toJSON(): Record<string, unknown> {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}

/**
 * Ok Response (200)
 */
export class OkResponse<T> extends ApiSuccessResponse<T> {
  constructor({ data, message = ReasonPhrases.OK }: Pick<SuccessResponse<T>, 'data' | 'message'>) {
    super({ message, data, statusCode: StatusCodes.OK });
  }
}

/**
 * Created Response (201)
 */
export class CreatedResponse<T> extends ApiSuccessResponse<T> {
  constructor({
    data,
    message = ReasonPhrases.CREATED,
  }: Pick<SuccessResponse<T>, 'data' | 'message'>) {
    super({ message, data, statusCode: StatusCodes.CREATED });
  }
}
