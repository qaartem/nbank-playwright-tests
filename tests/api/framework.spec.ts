import { expect, test } from '@playwright/test';

test('api test framework is configured', async ({ request }) => {
  expect(request).toBeDefined();
});
