import { WebDriver, By, until } from 'selenium-webdriver';
import { BASE_URL } from './config/setup';
import { TestRunner } from './helpers/testRunner';
import { Assertions } from './helpers/assertions';

const runner = new TestRunner();

async function runTests() {
  console.log('\n🚀 Starting Selenium Basic Tests');
  console.log('='.repeat(60));

  await runner.runTest('debe mostrar el formulario de login', async (driver: WebDriver) => {
    await driver.get(`${BASE_URL}/login`);

    const heading = await driver.findElement(By.xpath('//h1[text()="Login"]'));
    await Assertions.assertElementVisible(heading);

    const usernameInput = await driver.findElement(By.css('[data-testid="username-input"]'));
    await Assertions.assertElementVisible(usernameInput);

    const passwordInput = await driver.findElement(By.css('[data-testid="password-input"]'));
    await Assertions.assertElementVisible(passwordInput);

    const submitButton = await driver.findElement(By.css('[data-testid="submit-button"]'));
    await Assertions.assertElementVisible(submitButton);
  });

  await runner.runTest('login exitoso con admin/admin', async (driver: WebDriver) => {
    await driver.get(`${BASE_URL}/login`);

    const usernameInput = await driver.findElement(By.css('[data-testid="username-input"]'));
    const passwordInput = await driver.findElement(By.css('[data-testid="password-input"]'));
    const submitButton = await driver.findElement(By.css('[data-testid="submit-button"]'));

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('admin');
    await submitButton.click();

    // Esperar redirección al dashboard
    await driver.wait(until.urlContains('/dashboard'), 5000);
    await Assertions.assertUrlContains(driver, '/dashboard');

    const dashboardTitle = await driver.wait(
      until.elementLocated(By.css('[data-testid="dashboard-title"]')),
      5000
    );
    await Assertions.assertElementVisible(dashboardTitle);

    const titleText = await dashboardTitle.getText();
    await Assertions.assertEquals(titleText, 'Dashboard');
  });

  await runner.runTest('login exitoso con jvh/jvh', async (driver: WebDriver) => {
    await driver.get(`${BASE_URL}/login`);

    const usernameInput = await driver.findElement(By.css('[data-testid="username-input"]'));
    const passwordInput = await driver.findElement(By.css('[data-testid="password-input"]'));
    const submitButton = await driver.findElement(By.css('[data-testid="submit-button"]'));

    await usernameInput.sendKeys('jvh');
    await passwordInput.sendKeys('jvh');
    await submitButton.click();

    // Esperar redirección al dashboard
    await driver.wait(until.urlContains('/dashboard'), 5000);
    await Assertions.assertUrlContains(driver, '/dashboard');

    const dashboardTitle = await driver.wait(
      until.elementLocated(By.css('[data-testid="dashboard-title"]')),
      5000
    );
    await Assertions.assertElementVisible(dashboardTitle);
  });

  await runner.runTest('login fallido con credenciales incorrectas', async (driver: WebDriver) => {
    await driver.get(`${BASE_URL}/login`);

    const usernameInput = await driver.findElement(By.css('[data-testid="username-input"]'));
    const passwordInput = await driver.findElement(By.css('[data-testid="password-input"]'));
    const submitButton = await driver.findElement(By.css('[data-testid="submit-button"]'));

    await usernameInput.sendKeys('usuario_invalido');
    await passwordInput.sendKeys('password_invalido');
    await submitButton.click();

    // Esperar y manejar el alert
    await driver.wait(until.alertIsPresent(), 2000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await Assertions.assertEquals(alertText, 'usuario no existe');
    await alert.accept();

    // Verificar que permanece en login
    await Assertions.assertUrlContains(driver, '/login');
  });

  await runner.runTest('login fallido con usuario correcto pero password incorrecto', async (driver: WebDriver) => {
    await driver.get(`${BASE_URL}/login`);

    const usernameInput = await driver.findElement(By.css('[data-testid="username-input"]'));
    const passwordInput = await driver.findElement(By.css('[data-testid="password-input"]'));
    const submitButton = await driver.findElement(By.css('[data-testid="submit-button"]'));

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('password_incorrecto');
    await submitButton.click();

    // Esperar y manejar el alert
    await driver.wait(until.alertIsPresent(), 2000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await Assertions.assertEquals(alertText, 'usuario no existe');
    await alert.accept();

    // Verificar que permanece en login
    await Assertions.assertUrlContains(driver, '/login');
  });

  await runner.runTest('validación de campos vacíos', async (driver: WebDriver) => {
    await driver.get(`${BASE_URL}/login`);

    const submitButton = await driver.findElement(By.css('[data-testid="submit-button"]'));
    await submitButton.click();

    // Verificar que permanece en login (HTML5 validation previene el submit)
    await Assertions.assertUrlContains(driver, '/login');
  });

  runner.printSummary();
}

// Ejecutar los tests
runTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});
