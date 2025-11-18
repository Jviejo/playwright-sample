import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.getByTestId('dashboard-title');
    this.welcomeMessage = page.getByText('¡Bienvenido al dashboard!');
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async expectToBeOnDashboard() {
    await expect(this.page).toHaveURL('/dashboard');
    await expect(this.dashboardTitle).toBeVisible();
    await expect(this.dashboardTitle).toHaveText('Dashboard');
  }

  async expectWelcomeMessageToBeVisible() {
    await expect(this.welcomeMessage).toBeVisible();
  }
}
