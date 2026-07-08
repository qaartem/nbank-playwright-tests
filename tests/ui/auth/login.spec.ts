import { expect, test } from '@playwright/test';
import { env } from '../../../src/config/env';
import { createUser } from '../../../src/steps/adminSteps';
import { createApiContext } from '../../../src/ui/helpers/createApiContext';
import { AdminPanelPage } from '../../../src/ui/pages/AdminPanelPage';
import { LoginPage } from '../../../src/ui/pages/LoginPage';
import { UserDashboardPage } from '../../../src/ui/pages/UserDashboardPage';

test.describe('Login UI', () => {
  test('@smoke admin can login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminPanelPage = new AdminPanelPage(page);

    await loginPage.open();
    await loginPage.login(env.adminUsername, env.adminPassword);

    await adminPanelPage.expectLoaded();
  });

  test('@smoke user can login', async ({ page }) => {
    const apiContext = await createApiContext();
    const user = await createUser(apiContext);
    const loginPage = new LoginPage(page);
    const dashboardPage = new UserDashboardPage(page);

    try {
      await loginPage.open();
      await loginPage.login(user.request.username, user.request.password);

      await dashboardPage.expectLoaded();
      await expect(page.locator('.welcome-text')).toContainText('Welcome');
    } finally {
      await apiContext.dispose();
    }
  });
});
