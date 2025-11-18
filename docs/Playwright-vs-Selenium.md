# Playwright vs Selenium: Comparación

Este documento compara las implementaciones de los tests usando Playwright y Selenium WebDriver.

## Resultados de Tests

### Playwright
```
✅ 15 tests pasando en ~2.8s
- 6 tests básicos
- 9 tests con POM
```

### Selenium (Headless Mode)
```
✅ 15 tests pasando en ~15s
- 6 tests básicos (~6s)
- 9 tests con POM (~9s)
```

## Diferencias Clave

### 1. Configuración y Setup

#### Playwright
```typescript
// playwright.config.ts - Configuración declarativa
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
  },
});
```

- ✅ Configuración centralizada en un archivo
- ✅ Manejo automático del servidor web
- ✅ Navegadores descargados automáticamente

#### Selenium
```typescript
// tests-selenium/config/setup.ts - Configuración manual
export async function createDriver(): Promise<WebDriver> {
  const options = new chrome.Options();
  options.addArguments('--no-sandbox');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  return driver;
}
```

- ⚠️ Configuración manual del driver
- ⚠️ Necesita instalar drivers (chromedriver)
- ⚠️ Servidor web debe estar corriendo manualmente

### 2. Sintaxis de los Tests

#### Playwright
```typescript
test('login exitoso', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin');
  await page.getByTestId('submit-button').click();

  await expect(page).toHaveURL('/dashboard');
});
```

**Ventajas:**
- ✅ API moderna y fluida
- ✅ Auto-waiting integrado
- ✅ Selectores semánticos (getByRole, getByTestId, etc.)
- ✅ Assertions integradas
- ✅ Page fixture inyectado automáticamente

#### Selenium
```typescript
await runner.runTest('login exitoso', async (driver: WebDriver) => {
  await driver.get(`${BASE_URL}/login`);

  const usernameInput = await driver.findElement(
    By.css('[data-testid="username-input"]')
  );
  const passwordInput = await driver.findElement(
    By.css('[data-testid="password-input"]')
  );

  await usernameInput.sendKeys('admin');
  await passwordInput.sendKeys('admin');
  await submitButton.click();

  await driver.wait(until.urlContains('/dashboard'), 5000);
});
```

**Desventajas:**
- ⚠️ API más verbosa
- ⚠️ Esperas manuales (wait, until)
- ⚠️ Selectores solo con By (css, xpath, id, etc.)
- ⚠️ Assertions personalizadas necesarias
- ⚠️ Manejo manual del driver

### 3. Manejo de Alerts

#### Playwright
```typescript
page.on('dialog', async dialog => {
  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toBe('usuario no existe');
  await dialog.accept();
});
```

- ✅ Event-driven (on)
- ✅ Captura automática de alerts
- ✅ No necesita esperas explícitas

#### Selenium
```typescript
await driver.wait(until.alertIsPresent(), 2000);
const alert = await driver.switchTo().alert();
const alertText = await alert.getText();
await Assertions.assertEquals(alertText, 'usuario no existe');
await alert.accept();
```

- ⚠️ Necesita esperar explícitamente
- ⚠️ Cambio de contexto (switchTo)
- ⚠️ Manejo manual del alert

### 4. Page Object Model

#### Playwright - LoginPage
```typescript
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username-input');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    // ...
  }
}
```

**Ventajas:**
- ✅ Locators son lazy (se evalúan al usarse)
- ✅ No necesita await para definir elementos
- ✅ Más conciso

#### Selenium - LoginPage
```typescript
export class LoginPage {
  private driver: WebDriver;
  private usernameInputSelector = By.css('[data-testid="username-input"]');

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async getUsernameInput(): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(this.usernameInputSelector),
      5000
    );
  }

  async login(username: string, password: string) {
    const input = await this.getUsernameInput();
    await input.sendKeys(username);
    // ...
  }
}
```

**Desventajas:**
- ⚠️ Necesita métodos getter para elementos
- ⚠️ Esperas explícitas en cada método
- ⚠️ Más código boilerplate

### 5. Assertions

#### Playwright
```typescript
// Built-in assertions
await expect(page).toHaveURL('/dashboard');
await expect(element).toBeVisible();
await expect(element).toHaveText('Dashboard');
```

- ✅ Assertions integradas y descriptivas
- ✅ Auto-retry de assertions
- ✅ Mensajes de error claros

#### Selenium
```typescript
// Custom assertions
await Assertions.assertUrlContains(driver, '/dashboard');
await Assertions.assertElementVisible(element);
const text = await element.getText();
await Assertions.assertEquals(text, 'Dashboard');
```

- ⚠️ Necesita implementar assertions personalizadas
- ⚠️ No tiene auto-retry
- ⚠️ Más verboso

### 6. Velocidad y Performance

| Framework  | Tests Básicos | Tests POM | Total  | Modo |
|-----------|---------------|-----------|--------|------|
| Playwright | ~3s           | ~3s       | ~6s    | Headless |
| Selenium   | ~6s           | ~9s       | ~15s   | Headless |

**Playwright es ~2.5x más rápido**

Razones:
- Playwright usa protocolo CDP (Chrome DevTools Protocol)
- Selenium usa WebDriver protocol (más overhead)
- Playwright tiene mejor manejo de esperas automáticas

### 7. Test Runner

#### Playwright
```typescript
// Usa el test runner integrado de Playwright
test('login exitoso', async ({ page }) => {
  // test code
});
```

- ✅ Test runner incluido
- ✅ Parallel execution por defecto
- ✅ Fixtures y hooks integrados
- ✅ Reportes HTML automáticos

#### Selenium
```typescript
// Necesita test runner personalizado
const runner = new TestRunner();
await runner.runTest('login exitoso', async (driver) => {
  // test code
});
runner.printSummary();
```

- ⚠️ Necesita implementar test runner personalizado
- ⚠️ Ejecución secuencial (más lenta)
- ⚠️ Reportes personalizados necesarios

### 8. Debugging

#### Playwright
```bash
# UI Mode interactivo
npm run test:ui

# Headed mode (ver navegador)
npm run test:headed

# Trace viewer
npx playwright show-trace trace.zip
```

- ✅ UI mode para debugging interactivo
- ✅ Time travel debugging
- ✅ Screenshots y videos automáticos
- ✅ Trace viewer integrado

#### Selenium
```typescript
// Comentar headless en config
// options.addArguments('--headless');
```

- ⚠️ Solo puede ver el navegador ejecutándose
- ⚠️ No hay time travel
- ⚠️ Screenshots manuales
- ⚠️ No hay trace viewer

## Resumen de Ventajas

### Playwright ✅
- API moderna y concisa
- Más rápido (3.5x)
- Auto-waiting automático
- Test runner integrado
- Mejor debugging
- Menos código boilerplate
- Mejor developer experience

### Selenium ⚠️
- API más madura y estable
- Más ampliamente adoptado en la industria
- Soporta más lenguajes (Java, Python, C#, Ruby, etc.)
- Más recursos y comunidad grande
- Mejor para equipos con experiencia en Selenium

## ¿Cuál usar?

### Usa Playwright si:
- ✅ Estás empezando un proyecto nuevo
- ✅ Usas TypeScript/JavaScript
- ✅ Necesitas velocidad
- ✅ Quieres mejor developer experience
- ✅ Trabajas con aplicaciones web modernas

### Usa Selenium si:
- ✅ Ya tienes tests en Selenium
- ✅ Necesitas soportar múltiples lenguajes
- ✅ Tu equipo tiene experiencia con Selenium
- ✅ Necesitas soportar navegadores muy antiguos
- ✅ Tienes requerimientos específicos de la industria

## Conclusión

Ambos frameworks funcionan correctamente y todos los 30 tests pasan exitosamente.

**Playwright** ofrece una mejor experiencia de desarrollo, es más rápido y requiere menos código, lo que lo hace ideal para proyectos nuevos.

**Selenium** es más maduro y ampliamente adoptado, lo que lo hace ideal para equipos que ya tienen experiencia con él o necesitan soportar múltiples lenguajes.

Para este proyecto de ejemplo, **recomendamos Playwright** por su simplicidad, velocidad y mejor experiencia de desarrollo.
