import { expect, test } from '@playwright/test';
import { AdminClient } from '../../src/api/clients/adminClient';
import { createUserData } from '../../src/data/userFactory';
import type { CreateUserRequest } from '../../src/models';

type InvalidCreateUserRequest = Omit<CreateUserRequest, 'role'> & {
  role: string;
};

interface InvalidUserCase {
  title: string;
  payload: InvalidCreateUserRequest;
  field: string;
}

test.describe('Admin users API', () => {
  test('admin can create user with valid data', async ({ request }) => {
    const adminClient = new AdminClient(request);
    const userData = createUserData();

    const createdUser = await adminClient.createUser(userData);

    expect(createdUser.id).toEqual(expect.any(Number));
    expect(createdUser.username).toBe(userData.username);
    expect(createdUser.role).toBe(userData.role);
  });

  const invalidUsers: InvalidUserCase[] = [
    {
      title: 'rejects username shorter than 3 characters',
      payload: createUserData({ username: 'ab' }),
      field: 'username',
    },
    {
      title: 'rejects username longer than 15 characters',
      payload: createUserData({ username: 'verylongusername' }),
      field: 'username',
    },
    {
      title: 'rejects weak password',
      payload: createUserData({ password: 'short' }),
      field: 'password',
    },
    {
      title: 'rejects invalid role',
      payload: { ...createUserData(), role: 'MANAGER' },
      field: 'role',
    },
  ];

  for (const invalidUser of invalidUsers) {
    test(invalidUser.title, async ({ request }) => {
      const adminClient = new AdminClient(request);

      const error = await adminClient.createUserExpectBadRequest(
        invalidUser.payload,
      );

      expect(error[invalidUser.field]).toEqual(expect.any(Array));
    });
  }

  test('admin cannot create duplicate user', async ({ request }) => {
    const adminClient = new AdminClient(request);
    const userData = createUserData();

    await adminClient.createUser(userData);

    const error = await adminClient.createUserExpectBadRequest(userData);

    expect(Object.keys(error).length).toBeGreaterThan(0);
  });
});
