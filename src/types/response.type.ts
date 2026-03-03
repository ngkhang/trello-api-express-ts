/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-03
 ------------------------------------------------- */

export interface MetaData {
  requestTime: string;
  endpoint: string;
}

interface BaseResponse {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
}

export interface ErrorResponse extends BaseResponse {
  status: 'error';
}

export interface SuccessResponse<T> extends BaseResponse {
  status: 'success';
  data: T;
}
