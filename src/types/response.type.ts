/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-05
 ------------------------------------------------- */

import type { ERROR_CODE } from '~/utils/constants';

export interface MetaData {
  requestTime: string;
  endpoint: string;
}

export interface ErrorDetail {
  code?: (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
  details?: Array<{
    key: string;
    message: string;
  }>;
}

interface BaseResponse {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
}

export interface ErrorResponse extends BaseResponse {
  status: 'error';
  error?: ErrorDetail;
}

export interface SuccessResponse<T> extends BaseResponse {
  status: 'success';
  data: T;
}
