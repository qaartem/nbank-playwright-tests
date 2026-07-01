import { expect, test } from '@playwright/test';
import { AdminClient } from '../../src/api/clients/adminClient';
import { createUserData } from '../../src/data/userFactory';

test.describe('Admin users API', () => {
  test('admin can create user with valid data', async ({ request }) => {
    const adminClient = new AdminClient(request);
    const userData = createUserData();

    const createdUser = await adminClient.createUser(userData);

    expect(createdUser.id).toEqual(expect.any(Number));
    expect(createdUser.username).toBe(userData.username);
    expect(createdUser.role).toBe(userData.role);
  });
});
