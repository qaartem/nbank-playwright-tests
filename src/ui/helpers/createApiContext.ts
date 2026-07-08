import { request, type APIRequestContext } from '@playwright/test';
import { apiUrl } from '../../config/env';

export const createApiContext = async (): Promise<APIRequestContext> =>
  request.newContext({
    baseURL: `${apiUrl}/`,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
