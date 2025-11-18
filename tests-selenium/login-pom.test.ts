import { WebDriver } from 'selenium-webdriver';
import { TestRunner } from './helpers/testRunner';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { Assertions } from './helpers/assertions';

const runner = new TestRunner();

async function runTests() {
  console.log('\n🚀 Starting Selenium POM Tests');
  console.log('='.repeat(60));

  await runner.runTest('debe mostrar el formulario de login correctamente', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);
    await loginPage.goto();
    await loginPage.expectLoginPageToBeVisible();
  });

  await runner.runTest('login exitoso con admin/admin usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);
    const dashboardPage = new DashboardPage(driver);

    await loginPage.goto();
    await loginPage.loginWithValidCredentials('admin');

    await dashboardPage.expectToBeOnDashboard();
    await dashboardPage.expectWelcomeMessageToBeVisible();
  });

  await runner.runTest('login exitoso con jvh/jvh usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);
    const dashboardPage = new DashboardPage(driver);

    await loginPage.goto();
    await loginPage.loginWithValidCredentials('jvh');

    await dashboardPage.expectToBeOnDashboard();
    await dashboardPage.expectWelcomeMessageToBeVisible();
  });

  await runner.runTest('login fallido con credenciales incorrectas usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);

    await loginPage.goto();
    await loginPage.login('usuario_invalido', 'password_invalido');

    // Esperar y verificar alert
    await loginPage.waitAndVerifyAlert('usuario no existe');

    await loginPage.expectToStayOnLoginPage();
  });

  await runner.runTest('login fallido con usuario correcto pero password incorrecto usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);

    await loginPage.goto();
    await loginPage.login('admin', 'password_incorrecto');

    // Esperar y verificar alert
    await loginPage.waitAndVerifyAlert('usuario no existe');

    await loginPage.expectToStayOnLoginPage();
  });

  await runner.runTest('login fallido con password correcto pero usuario incorrecto usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);

    await loginPage.goto();
    await loginPage.login('usuario_invalido', 'admin');

    // Esperar y verificar alert
    await loginPage.waitAndVerifyAlert('usuario no existe');

    await loginPage.expectToStayOnLoginPage();
  });

  await runner.runTest('validación de campos vacíos usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);

    await loginPage.goto();
    await loginPage.clickSubmitWithoutFilling();

    await loginPage.expectToStayOnLoginPage();
  });

  await runner.runTest('login con espacios en blanco usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);

    await loginPage.goto();
    await loginPage.login('   ', '   ');

    // Esperar y verificar alert
    await loginPage.waitAndVerifyAlert('usuario no existe');

    await loginPage.expectToStayOnLoginPage();
  });

  await runner.runTest('verificar sensibilidad a mayúsculas/minúsculas usando POM', async (driver: WebDriver) => {
    const loginPage = new LoginPage(driver);

    await loginPage.goto();
    await loginPage.login('ADMIN', 'admin');

    // Esperar y verificar alert
    await loginPage.waitAndVerifyAlert('usuario no existe');

    await loginPage.expectToStayOnLoginPage();
  });

  runner.printSummary();
}

// Ejecutar los tests
runTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});
