import { WebDriver, By, until, WebElement } from 'selenium-webdriver';
import { BASE_URL } from '../config/setup';
import { Assertions } from '../helpers/assertions';

export class DashboardPage {
  private driver: WebDriver;
  private url = `${BASE_URL}/dashboard`;

  // Selectores
  private dashboardTitleSelector = By.css('[data-testid="dashboard-title"]');
  private welcomeMessageSelector = By.xpath('//*[contains(text(), "¡Bienvenido al dashboard!")]');

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async goto(): Promise<void> {
    await this.driver.get(this.url);
  }

  async getDashboardTitle(): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(this.dashboardTitleSelector),
      5000,
      'Dashboard title not found'
    );
  }

  async getWelcomeMessage(): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(this.welcomeMessageSelector),
      5000,
      'Welcome message not found'
    );
  }

  async expectToBeOnDashboard(): Promise<void> {
    await Assertions.waitForUrl(this.driver, '/dashboard', 5000);
    await Assertions.assertUrlContains(this.driver, '/dashboard');

    const title = await this.getDashboardTitle();
    await Assertions.assertElementVisible(title, 'Dashboard title should be visible');

    const titleText = await title.getText();
    await Assertions.assertEquals(titleText, 'Dashboard', 'Dashboard title should say "Dashboard"');
  }

  async expectWelcomeMessageToBeVisible(): Promise<void> {
    const welcomeMessage = await this.getWelcomeMessage();
    await Assertions.assertElementVisible(welcomeMessage, 'Welcome message should be visible');
  }
}
