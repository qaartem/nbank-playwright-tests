import { expect, test } from '@playwright/test';
import { ProfileClient } from '../../src/api/clients/profileClient';
import { createUser } from '../../src/steps/adminSteps';

test.describe('Profile API', () => {
  test('user can update own profile name', async ({ request }) => {
    const user = await createUser(request);
    const profileClient = new ProfileClient(
      request,
      user.request.username,
      user.request.password,
    );

    const update = await profileClient.updateProfile({ name: 'New Name' });
    const profile = await profileClient.getProfile();

    expect(update.message).toBe('Profile updated successfully');
    expect(update.customer.name).toBe('New Name');
    expect(profile.name).toBe('New Name');
    expect(profile.username).toBe(user.request.username);
  });
});
