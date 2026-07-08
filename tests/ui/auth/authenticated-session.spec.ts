import { test } from '@playwright/test';
import { env } from '../../../src/config/env';
import { createUser } from '../../../src/steps/adminSteps';
import { authenticateByBasicAuth } from '../../../src/ui/helpers/authenticateByBasicAuth';
import { createApiContext } from '../../../src/ui/helpers/createApiContext';
import { AdminPanelPage } from '../../../src/ui/pages/AdminPanelPage';
import { UserDashboardPage } from '../../../src/ui/pages/UserDashboardPage';

test.describe('Authenticated UI session', () => {
  test('@smoke admin can open admin panel without login form', async ({
    page,
  }) => {
    const adminPanelPage = new AdminPanelPage(page);

    await authenticateByBasicAuth(page, {
      username: env.adminUsername,
      password: env.adminPassword,
    });
    await page.goto('/admin');

    await adminPanelPage.expectLoaded();
  });

  test('@smoke user can open dashboard without login form', async ({
    page,
  }) => {
    const apiContext = await createApiContext();
    const user = await createUser(apiContext);
    const dashboardPage = new UserDashboardPage(page);

    try {
      await authenticateByBasicAuth(page, {
        username: user.request.username,
        password: user.request.password,
      });
      await page.goto('/dashboard');

      await dashboardPage.expectLoaded();
    } finally {
      await apiContext.dispose();
    }
  });
});
