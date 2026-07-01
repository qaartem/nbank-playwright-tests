import type { APIRequestContext } from '@playwright/test';
import { AccountClient } from '../api/clients/accountClient';
import type {
  CreateAccountResponse,
  CreateUserRequest,
  DepositResponse,
} from '../models';
import { createUser, type CreatedUser } from './adminSteps';

export interface CreatedUserWithAccount extends CreatedUser {
  account: CreateAccountResponse;
}

export interface CreatedUserWithBalance extends CreatedUserWithAccount {
  account: DepositResponse;
}

export interface TransferUsers {
  sender: CreatedUserWithBalance;
  receiver: CreatedUserWithAccount;
}

export const createUserWithAccount = async (
  request: APIRequestContext,
  overrides: Partial<CreateUserRequest> = {},
): Promise<CreatedUserWithAccount> => {
  const user = await createUser(request, overrides);
  const accountClient = createAccountClient(request, user);
  const account = await accountClient.createAccount();

  return {
    ...user,
    account,
  };
};

export const createUserWithAccountAndBalance = async (
  request: APIRequestContext,
  balance: number,
  overrides: Partial<CreateUserRequest> = {},
): Promise<CreatedUserWithBalance> => {
  const user = await createUserWithAccount(request, overrides);
  const accountClient = createAccountClient(request, user);
  const account = await accountClient.deposit({
    id: user.account.id,
    balance,
  });

  return {
    ...user,
    account,
  };
};

export const createTwoUsersForTransfer = async (
  request: APIRequestContext,
  senderBalance: number,
): Promise<TransferUsers> => {
  const sender = await createUserWithAccountAndBalance(request, senderBalance);
  const receiver = await createUserWithAccount(request);

  return {
    sender,
    receiver,
  };
};

const createAccountClient = (
  request: APIRequestContext,
  user: CreatedUser,
): AccountClient =>
  new AccountClient(request, user.request.username, user.request.password);
