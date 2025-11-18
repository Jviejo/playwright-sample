import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Login Page - POM Pattern', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test('debe mostrar el formulario de login correctamente', async () => {
    await loginPage.expectLoginPageToBeVisible();
  });

  test('login exitoso con admin/admin usando POM', async () => {
    // Realizar login con credenciales válidas
    await loginPage.loginWithValidCredentials('admin');

    // Verificar redirección al dashboard
    await dashboardPage.expectToBeOnDashboard();
    await dashboardPage.expectWelcomeMessageToBeVisible();
  });

  test('login exitoso con jvh/jvh usando POM', async () => {
    // Realizar login con credenciales válidas
    await loginPage.loginWithValidCredentials('jvh');

    // Verificar redirección al dashboard
    await dashboardPage.expectToBeOnDashboard();
    await dashboardPage.expectWelcomeMessageToBeVisible();
  });

  test('login fallido con credenciales incorrectas usando POM', async () => {
    // Configurar el handler del dialog antes de hacer login
    await loginPage.setupDialogHandler('usuario no existe');

    // Intentar login con credenciales inválidas
    await loginPage.loginWithInvalidCredentials('usuario_invalido', 'password_invalido');

    // Esperar a que aparezca el alert
    await loginPage.waitForAlert();

    // Verificar que permanece en la página de login
    await loginPage.expectToStayOnLoginPage();
  });

  test('login fallido con usuario correcto pero password incorrecto usando POM', async () => {
    // Configurar el handler del dialog
    await loginPage.setupDialogHandler('usuario no existe');

    // Intentar login con password incorrecta
    await loginPage.loginWithInvalidCredentials('admin', 'password_incorrecto');

    // Esperar a que aparezca el alert
    await loginPage.waitForAlert();

    // Verificar que permanece en la página de login
    await loginPage.expectToStayOnLoginPage();
  });

  test('login fallido con password correcto pero usuario incorrecto usando POM', async () => {
    // Configurar el handler del dialog
    await loginPage.setupDialogHandler('usuario no existe');

    // Intentar login con usuario incorrecto
    await loginPage.loginWithInvalidCredentials('usuario_invalido', 'admin');

    // Esperar a que aparezca el alert
    await loginPage.waitForAlert();

    // Verificar que permanece en la página de login
    await loginPage.expectToStayOnLoginPage();
  });

  test('validación de campos vacíos usando POM', async () => {
    // Intentar submit sin llenar campos
    await loginPage.clickSubmitWithoutFilling();

    // Verificar que permanece en la página de login (HTML5 validation previene el submit)
    await loginPage.expectToStayOnLoginPage();
  });

  test('login con espacios en blanco usando POM', async () => {
    // Configurar el handler del dialog
    await loginPage.setupDialogHandler('usuario no existe');

    // Intentar login con espacios
    await loginPage.loginWithInvalidCredentials('   ', '   ');

    // Esperar a que aparezca el alert
    await loginPage.waitForAlert();

    // Verificar que permanece en la página de login
    await loginPage.expectToStayOnLoginPage();
  });

  test('verificar sensibilidad a mayúsculas/minúsculas usando POM', async () => {
    // Configurar el handler del dialog
    await loginPage.setupDialogHandler('usuario no existe');

    // Intentar login con usuario en mayúsculas
    await loginPage.loginWithInvalidCredentials('ADMIN', 'admin');

    // Esperar a que aparezca el alert
    await loginPage.waitForAlert();

    // Verificar que permanece en la página de login
    await loginPage.expectToStayOnLoginPage();
  });
});
