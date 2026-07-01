import type { APIRequestContext } from '@playwright/test';
import { AdminClient } from '../api/clients/adminClient';
import { createUserData } from '../data/userFactory';
import type { CreateUserRequest, CreateUserResponse } from '../models';

export interface CreatedUser {
  request: CreateUserRequest;
  response: CreateUserResponse;
}

export const createUser = async (
  request: APIRequestContext,
  overrides: Partial<CreateUserRequest> = {},
): Promise<CreatedUser> => {
  const adminClient = new AdminClient(request);
  const userData = createUserData(overrides);
  const createdUser = await adminClient.createUser(userData);

  return {
    request: userData,
    response: createdUser,
  };
};
