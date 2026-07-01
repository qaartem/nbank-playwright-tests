import { expect, test } from '@playwright/test';
import { AccountClient } from '../../src/api/clients/accountClient';
import { createUserWithAccount } from '../../src/steps/userSteps';

test.describe('Accounts API', () => {
  test('user can create account and see it in customer accounts', async ({
    request,
  }) => {
    const user = await createUserWithAccount(request);
    const accountClient = new AccountClient(
      request,
      user.request.username,
      user.request.password,
    );

    const accounts = await accountClient.getCustomerAccounts();

    expect(user.account.id).toEqual(expect.any(Number));
    expect(user.account.balance).toBe(0);
    expect(accounts.map((account) => account.id)).toContain(user.account.id);
  });
});
