import { WebDriver, By, until, WebElement } from 'selenium-webdriver';
import { BASE_URL } from '../config/setup';
import { Assertions } from '../helpers/assertions';

export class LoginPage {
  private driver: WebDriver;
  private url = `${BASE_URL}/login`;

  // Selectores
  private usernameInputSelector = By.css('[data-testid="username-input"]');
  private passwordInputSelector = By.css('[data-testid="password-input"]');
  private submitButtonSelector = By.css('[data-testid="submit-button"]');
  private loginHeadingSelector = By.xpath('//h1[text()="Login"]');

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async goto(): Promise<void> {
    await this.driver.get(this.url);
  }

  async getUsernameInput(): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(this.usernameInputSelector),
      5000,
      'Username input not found'
    );
  }

  async getPasswordInput(): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(this.passwordInputSelector),
      5000,
      'Password input not found'
    );
  }

  async getSubmitButton(): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(this.submitButtonSelector),
      5000,
      'Submit button not found'
    );
  }

  async getLoginHeading(): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(this.loginHeadingSelector),
      5000,
      'Login heading not found'
    );
  }

  async login(username: string, password: string): Promise<void> {
    const usernameInput = await this.getUsernameInput();
    const passwordInput = await this.getPasswordInput();
    const submitButton = await this.getSubmitButton();

    await usernameInput.clear();
    await usernameInput.sendKeys(username);

    await passwordInput.clear();
    await passwordInput.sendKeys(password);

    await submitButton.click();
  }

  async loginWithValidCredentials(user: 'admin' | 'jvh'): Promise<void> {
    await this.login(user, user);
  }

  async expectLoginPageToBeVisible(): Promise<void> {
    const heading = await this.getLoginHeading();
    await Assertions.assertElementVisible(heading, 'Login heading should be visible');

    const usernameInput = await this.getUsernameInput();
    await Assertions.assertElementVisible(usernameInput, 'Username input should be visible');

    const passwordInput = await this.getPasswordInput();
    await Assertions.assertElementVisible(passwordInput, 'Password input should be visible');

    const submitButton = await this.getSubmitButton();
    await Assertions.assertElementVisible(submitButton, 'Submit button should be visible');
  }

  async expectToStayOnLoginPage(): Promise<void> {
    await Assertions.assertUrlContains(this.driver, '/login');
  }

  async waitAndVerifyAlert(expectedMessage: string, timeout: number = 2000): Promise<void> {
    await this.driver.wait(until.alertIsPresent(), timeout, 'Alert did not appear');
    const alert = await this.driver.switchTo().alert();
    const alertMessage = await alert.getText();
    await Assertions.assertEquals(
      alertMessage,
      expectedMessage,
      `Expected alert message "${expectedMessage}" but got "${alertMessage}"`
    );
    await alert.accept();
  }

  async clickSubmitWithoutFilling(): Promise<void> {
    const submitButton = await this.getSubmitButton();
    await submitButton.click();
  }
}
