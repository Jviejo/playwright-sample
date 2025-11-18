import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByTestId('submit-button');
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginWithValidCredentials(user: 'admin' | 'jvh') {
    await this.login(user, user);
  }

  async loginWithInvalidCredentials(username: string, password: string) {
    await this.login(username, password);
  }

  async expectLoginPageToBeVisible() {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectToStayOnLoginPage() {
    await expect(this.page).toHaveURL('/login');
  }

  async setupDialogHandler(expectedMessage: string) {
    this.page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe(expectedMessage);
      await dialog.accept();
    });
  }

  async waitForAlert() {
    await this.page.waitForTimeout(500);
  }

  async clickSubmitWithoutFilling() {
    await this.submitButton.click();
  }
}
