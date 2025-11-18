import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('debe mostrar el formulario de login', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByTestId('username-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('submit-button')).toBeVisible();
  });

  test('login exitoso con admin/admin', async ({ page }) => {
    // Ingresar credenciales válidas
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('admin');

    // Click en el botón de submit
    await page.getByTestId('submit-button').click();

    // Esperar redirección al dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('dashboard-title')).toBeVisible();
    await expect(page.getByTestId('dashboard-title')).toHaveText('Dashboard');
  });

  test('login exitoso con jvh/jvh', async ({ page }) => {
    // Ingresar credenciales válidas
    await page.getByTestId('username-input').fill('jvh');
    await page.getByTestId('password-input').fill('jvh');

    // Click en el botón de submit
    await page.getByTestId('submit-button').click();

    // Esperar redirección al dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('dashboard-title')).toBeVisible();
  });

  test('login fallido con credenciales incorrectas', async ({ page }) => {
    // Setup dialog listener antes de triggerar el alert
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('usuario no existe');
      await dialog.accept();
    });

    // Ingresar credenciales inválidas
    await page.getByTestId('username-input').fill('usuario_invalido');
    await page.getByTestId('password-input').fill('password_invalido');

    // Click en el botón de submit
    await page.getByTestId('submit-button').click();

    // Esperar un poco para que el alert aparezca
    await page.waitForTimeout(500);

    // Verificar que sigue en la página de login
    await expect(page).toHaveURL('/login');
  });

  test('login fallido con usuario correcto pero password incorrecto', async ({ page }) => {
    // Setup dialog listener
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('usuario no existe');
      await dialog.accept();
    });

    // Ingresar admin con password incorrecto
    await page.getByTestId('username-input').fill('admin');
    await page.getByTestId('password-input').fill('password_incorrecto');

    // Click en el botón de submit
    await page.getByTestId('submit-button').click();

    // Esperar un poco para que el alert aparezca
    await page.waitForTimeout(500);

    // Verificar que sigue en la página de login
    await expect(page).toHaveURL('/login');
  });

  test('login fallido con campos vacíos', async ({ page }) => {
    // Click en el botón de submit sin llenar campos
    await page.getByTestId('submit-button').click();

    // El formulario HTML5 validation debería prevenir el submit
    // Verificar que sigue en la página de login
    await expect(page).toHaveURL('/login');
  });
});
