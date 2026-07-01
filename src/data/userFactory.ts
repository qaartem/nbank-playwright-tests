import type { CreateUserRequest } from '../models';

export const uniqueUsername = (prefix = 'user'): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).slice(2, 8);

  return `${prefix}_${timestamp}_${randomSuffix}`;
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
