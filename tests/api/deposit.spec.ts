import { expect, test } from '@playwright/test';
import { createUserWithAccountAndBalance } from '../../src/steps/userSteps';

test.describe('Deposit API', () => {
  test('@regression user can deposit money to own account', async ({
    request,
  }) => {
    const user = await createUserWithAccountAndBalance(request, 100);

    expect(user.account.id).toEqual(expect.any(Number));
    expect(user.account.balance).toBe(100);
    expect(user.account.transactions[0]?.type).toBe('DEPOSIT');
    expect(user.account.transactions[0]?.amount).toBe(100);
  });
});
