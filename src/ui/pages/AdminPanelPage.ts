import { expect, type Page } from '@playwright/test';

export class AdminPanelPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Admin Panel')).toBeVisible();
  }
}
