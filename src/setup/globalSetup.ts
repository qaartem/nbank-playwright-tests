import { request } from '@playwright/test';
import { endpoints } from '../api/endpoints';
import { apiUrl, env } from '../config/env';
import { basicAuth } from '../utils/auth';

const readinessTimeoutMs = 60_000;
const readinessIntervalMs = 1_000;

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

async function globalSetup(): Promise<void> {
  const startedAt = Date.now();
  const context = await request.newContext({ baseURL: `${apiUrl}/` });
  let lastReadinessError = 'no response';

  try {
    while (Date.now() - startedAt < readinessTimeoutMs) {
      try {
        const response = await context.post(endpoints.login, {
          headers: {
            Authorization: basicAuth(env.adminUsername, env.adminPassword),
          },
          data: {
            username: env.adminUsername,
            password: env.adminPassword,
          },
          failOnStatusCode: false,
        });

        if (response.ok()) {
          return;
        }

        lastReadinessError = `HTTP ${response.status()} ${response.statusText()}`;
      } catch (error) {
        lastReadinessError =
          error instanceof Error ? error.message : 'request failed';
      }

      await delay(readinessIntervalMs);
    }
  } finally {
    await context.dispose();
  }

  throw new Error(`Backend is not ready at ${apiUrl}: ${lastReadinessError}`);
}

export default globalSetup;
