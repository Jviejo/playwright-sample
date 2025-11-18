# Comparación: Tests Básicos vs Page Object Model

Este documento compara los dos enfoques de testing implementados en el proyecto.

## Tests Básicos (login.spec.ts)

### Ventajas
- Más directo y simple
- Fácil de entender para principiantes
- Menos archivos para mantener
- Ideal para proyectos pequeños

### Desventajas
- Código duplicado entre tests
- Difícil de mantener cuando la UI cambia
- Tests más largos y verbosos
- Acoplamiento directo con los selectores

### Ejemplo de código

```typescript
test('login exitoso con admin/admin', async ({ page }) => {
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin');
  await page.getByTestId('submit-button').click();

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByTestId('dashboard-title')).toBeVisible();
});
```

## Tests con Page Object Model (login2.spec.ts)

### Ventajas
- ✅ **Reutilización de código**: Los métodos se usan en múltiples tests
- ✅ **Fácil mantenimiento**: Cambios en UI solo requieren actualizar Page Objects
- ✅ **Tests más legibles**: Código más descriptivo y declarativo
- ✅ **Separación de responsabilidades**: Lógica de interacción separada de assertions
- ✅ **Escalabilidad**: Ideal para proyectos grandes
- ✅ **Abstracción**: Oculta complejidad de la implementación

### Desventajas
- Más archivos para mantener
- Curva de aprendizaje inicial
- Puede ser overkill para proyectos muy pequeños

### Ejemplo de código

```typescript
test('login exitoso con admin/admin usando POM', async () => {
  await loginPage.loginWithValidCredentials('admin');
  await dashboardPage.expectToBeOnDashboard();
  await dashboardPage.expectWelcomeMessageToBeVisible();
});
```

## Comparación lado a lado

### Escenario: Login exitoso

#### Enfoque Básico
```typescript
test('login exitoso', async ({ page }) => {
  // Navegar
  await page.goto('/login');

  // Llenar formulario
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin');
  await page.getByTestId('submit-button').click();

  // Verificaciones
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByTestId('dashboard-title')).toBeVisible();
  await expect(page.getByTestId('dashboard-title')).toHaveText('Dashboard');
});
```

#### Enfoque POM
```typescript
test('login exitoso usando POM', async () => {
  await loginPage.loginWithValidCredentials('admin');
  await dashboardPage.expectToBeOnDashboard();
});
```

### ¿Qué pasa si cambia el selector del username?

#### Enfoque Básico
Hay que actualizar TODOS los tests que usan ese selector:
- login.spec.ts línea 20
- login.spec.ts línea 35
- login.spec.ts línea 52
- login.spec.ts línea 68
... y así sucesivamente

#### Enfoque POM
Solo hay que actualizar UN archivo:
- `tests/pages/LoginPage.ts` línea 7

Todos los tests que usan `loginPage.login()` funcionarán automáticamente.

## ¿Cuándo usar cada enfoque?

### Usa Tests Básicos cuando:
- Proyecto muy pequeño (1-3 páginas)
- Prototipo rápido
- Tests únicos que no se repiten
- El equipo no está familiarizado con POM

### Usa Page Object Model cuando:
- Proyecto mediano a grande
- Múltiples tests que interactúan con las mismas páginas
- Necesitas mantener los tests a largo plazo
- El equipo tiene experiencia con testing
- Hay cambios frecuentes en la UI

## Recomendación

Para este proyecto de login, aunque es pequeño, **recomendamos usar Page Object Model** porque:

1. Es una buena práctica para aprender
2. Facilita agregar más tests en el futuro
3. El código es más limpio y profesional
4. Es fácil extender para agregar nuevas páginas

## Estructura de archivos recomendada

```
tests/
├── pages/              # Page Objects
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── ...
├── fixtures/           # Datos de prueba reutilizables
├── helpers/            # Funciones auxiliares
└── *.spec.ts          # Archivos de test que usan los Page Objects
```

## Mejores prácticas con POM

1. **Un Page Object por página**: Cada clase representa una página o componente
2. **Métodos descriptivos**: Usa nombres que describan la acción del usuario
3. **Encapsula selectores**: Los tests no deben conocer los selectores
4. **Retorna Page Objects**: Los métodos que navegan pueden retornar nuevos Page Objects
5. **Evita assertions en Page Objects**: Preferiblemente usa métodos `expect*` separados

## Ejemplo de método que retorna Page Object

```typescript
class LoginPage {
  async loginAndNavigateToDashboard(username: string, password: string): Promise<DashboardPage> {
    await this.login(username, password);
    return new DashboardPage(this.page);
  }
}

// Uso en test
test('flujo completo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  const dashboardPage = await loginPage.loginAndNavigateToDashboard('admin', 'admin');
  await dashboardPage.expectWelcomeMessageToBeVisible();
});
```
