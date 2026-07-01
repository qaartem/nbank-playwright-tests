import { expect, test } from '@playwright/test';

test('@smoke api test framework is configured', async ({ request }) => {
  expect(request).toBeDefined();
});
