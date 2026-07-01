import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';
import { ApiError } from './api-error.js';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(ApiError.fromAxios(error))
);
