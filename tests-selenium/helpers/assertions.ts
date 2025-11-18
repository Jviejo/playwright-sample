import { WebDriver, WebElement, until } from 'selenium-webdriver';

export class Assertions {
  static async assertEquals(actual: any, expected: any, message?: string): Promise<void> {
    if (actual !== expected) {
      throw new Error(
        message || `Expected "${expected}" but got "${actual}"`
      );
    }
  }

  static async assertTrue(condition: boolean, message?: string): Promise<void> {
    if (!condition) {
      throw new Error(message || 'Assertion failed: expected true but got false');
    }
  }

  static async assertContains(text: string, substring: string, message?: string): Promise<void> {
    if (!text.includes(substring)) {
      throw new Error(
        message || `Expected text to contain "${substring}" but got "${text}"`
      );
    }
  }

  static async assertElementVisible(element: WebElement, message?: string): Promise<void> {
    const isDisplayed = await element.isDisplayed();
    if (!isDisplayed) {
      throw new Error(message || 'Element is not visible');
    }
  }

  static async assertUrlEquals(driver: WebDriver, expectedUrl: string): Promise<void> {
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`Expected URL to contain "${expectedUrl}" but got "${currentUrl}"`);
    }
  }

  static async assertUrlContains(driver: WebDriver, substring: string): Promise<void> {
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes(substring)) {
      throw new Error(`Expected URL to contain "${substring}" but got "${currentUrl}"`);
    }
  }

  static async waitForUrl(driver: WebDriver, urlSubstring: string, timeout: number = 5000): Promise<void> {
    try {
      await driver.wait(
        until.urlContains(urlSubstring),
        timeout,
        `Timeout waiting for URL to contain "${urlSubstring}"`
      );
    } catch (error) {
      const currentUrl = await driver.getCurrentUrl();
      throw new Error(`Expected URL to contain "${urlSubstring}" but got "${currentUrl}"`);
    }
  }
}
