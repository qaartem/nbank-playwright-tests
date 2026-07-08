import { expect, type Page } from '@playwright/test';

export class UserDashboardPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('.welcome-text')).toBeVisible();
  }
}
