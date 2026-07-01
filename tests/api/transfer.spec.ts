import { expect, test } from '@playwright/test';
import { AccountClient } from '../../src/api/clients/accountClient';
import { createTwoUsersForTransfer } from '../../src/steps/userSteps';

test.describe('Transfer API', () => {
  test('user can transfer money to another user account', async ({ request }) => {
    const { sender, receiver } = await createTwoUsersForTransfer(request, 100);
    const accountClient = new AccountClient(
      request,
      sender.request.username,
      sender.request.password,
    );

    const transfer = await accountClient.transfer({
      senderAccountId: sender.account.id,
      receiverAccountId: receiver.account.id,
      amount: 50,
    });

    expect(transfer.senderAccountId).toBe(sender.account.id);
    expect(transfer.receiverAccountId).toBe(receiver.account.id);
    expect(transfer.amount).toBe(50);
    expect(transfer.message).toBe('Transfer successful');
  });
});
