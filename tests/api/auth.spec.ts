import { expect, test } from '@playwright/test';
import { endpoints } from '../../src/api/endpoints';
import { env } from '../../src/config/env';
import type { LoginResponse } from '../../src/models';

test.describe('Auth API', () => {
  test('admin can login with valid credentials', async ({ request }) => {
    const response = await request.post(endpoints.login, {
      data: {
        username: env.adminUsername,
        password: env.adminPassword,
      },
    });

    expect(response.status()).toBe(200);

    const body = (await response.json()) as LoginResponse;

    expect(body.username).toBe(env.adminUsername);
    expect(body.role).toBe('ADMIN');
  });
});
