import { DEFAULT_ERROR_MESSAGE } from '../utils/constants.js';

export class ApiError extends Error {
  constructor(message = DEFAULT_ERROR_MESSAGE, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }

  static fromAxios(error) {
    if (error instanceof ApiError) return error;

    const responseData = error?.response?.data ?? null;
    const message =
      responseData?.message ??
      responseData?.error ??
      (error?.code === 'ECONNABORTED'
        ? 'The server took too long to respond.'
        : error?.message) ??
      DEFAULT_ERROR_MESSAGE;

    return new ApiError(message, error?.response?.status ?? 0, responseData);
  }
}
