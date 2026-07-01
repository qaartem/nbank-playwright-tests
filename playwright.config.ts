import { defineConfig } from '@playwright/test';
import { apiUrl, env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  globalSetup: './src/setup/globalSetup',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: `${apiUrl}/`,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'on-first-retry',
  },
});
