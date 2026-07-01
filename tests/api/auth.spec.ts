import { expect, test } from '@playwright/test';
import { endpoints } from '../../src/api/endpoints';
import { env } from '../../src/config/env';
import type { LoginResponse } from '../../src/models';
import { loginResponseSchema } from '../../src/schemas/apiSchemas';

test.describe('Auth API', () => {
  test('@smoke admin can login with valid credentials', async ({ request }) => {
    const response = await request.post(endpoints.login, {
      data: {
        username: env.adminUsername,
        password: env.adminPassword,
      },
    });

    expect(response.status()).toBe(200);

    const body = loginResponseSchema.parse(
      await response.json(),
    ) as LoginResponse;

    expect(body.username).toBe(env.adminUsername);
    expect(body.role).toBe('ADMIN');
  });
});
