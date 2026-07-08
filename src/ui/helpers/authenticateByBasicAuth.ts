import type { Page } from '@playwright/test';
import { basicAuth } from '../../utils/auth';

interface BasicAuthCredentials {
  username: string;
  password: string;
}

const authTokenStorageKey = 'authToken';

export const authenticateByBasicAuth = async (
  page: Page,
  credentials: BasicAuthCredentials,
): Promise<void> => {
  const token = basicAuth(credentials.username, credentials.password);

  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, value);
    },
    {
      key: authTokenStorageKey,
      value: token,
    },
  );
};
