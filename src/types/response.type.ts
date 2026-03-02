/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
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
