import type { CreateUserRequest } from '../models';

export const uniqueUsername = (prefix = 'user'): string => {
  const normalizedPrefix = prefix.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4);
  const timestamp = Date.now().toString(36).slice(-6);
  const randomSuffix = Math.random().toString(36).slice(2, 6);

  return `${normalizedPrefix}_${timestamp}${randomSuffix}`;
};

export const validPassword = (): string => 'VeryStrongPassword33$';

export const createUserData = (
  overrides: Partial<CreateUserRequest> = {},
): CreateUserRequest => ({
  username: uniqueUsername(),
  password: validPassword(),
  role: 'USER',
  ...overrides,
});
