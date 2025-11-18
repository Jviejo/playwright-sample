# Playwright Login Example

Ejemplo de implementación de login con Next.js y Playwright para testing.

## Características

- Formulario de login funcional
- Validación de credenciales en memoria (sin base de datos)
- Redirección al dashboard cuando el login es exitoso
- Alert cuando las credenciales son incorrectas
- Tests automatizados con Playwright

## Credenciales válidas

- Usuario: `admin` / Password: `admin`
- Usuario: `jvh` / Password: `jvh`

## Estructura del proyecto

```
app/
├── login/
│   └── page.tsx          # Página de login
├── dashboard/
│   └── page.tsx          # Dashboard (protegido)
└── api/
    └── login/
        └── route.ts      # Endpoint de validación

tests/                    # Tests de Playwright
├── pages/
│   ├── LoginPage.ts      # Page Object para Login
│   └── DashboardPage.ts  # Page Object para Dashboard
├── login.spec.ts         # Tests básicos de Playwright
└── login2.spec.ts        # Tests POM de Playwright

tests-selenium/           # Tests de Selenium
├── config/
│   └── setup.ts          # Configuración de Selenium
├── helpers/
│   ├── testRunner.ts     # Runner personalizado para tests
│   └── assertions.ts     # Assertions helpers
├── pages/
│   ├── LoginPage.ts      # Page Object para Login (Selenium)
│   └── DashboardPage.ts  # Page Object para Dashboard (Selenium)
├── login-basic.test.ts   # Tests básicos de Selenium
└── login-pom.test.ts     # Tests POM de Selenium

docs/
└── POM-vs-Basic.md       # Documentación comparativa
```

## Instalación

```bash
npm install
```

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Acceder a http://localhost:3000/login

## Testing

El proyecto incluye tests implementados con dos frameworks: **Playwright** y **Selenium WebDriver**.

### Tests con Playwright

#### Ejecutar todos los tests

```bash
npm test
```

#### Ejecutar tests con UI

```bash
npm run test:ui
```

#### Ejecutar tests con navegador visible

```bash
npm run test:headed
```

#### Ver reporte de tests

```bash
npx playwright show-report
```

### Tests con Selenium WebDriver

> **Nota:** Los tests de Selenium se ejecutan en modo headless (sin mostrar el navegador) por defecto.

#### Ejecutar todos los tests de Selenium

```bash
npm run test:selenium
```

#### Ejecutar solo tests básicos de Selenium

```bash
npm run test:selenium:basic
```

#### Ejecutar solo tests POM de Selenium

```bash
npm run test:selenium:pom
```

#### Ver el navegador durante los tests de Selenium

Para ver el navegador mientras se ejecutan los tests, comenta la línea de headless en `tests-selenium/config/setup.ts`:

```typescript
// options.addArguments('--headless=new');  // Comentar esta línea
```

## Tests incluidos

### Tests con Playwright

#### Tests básicos (login.spec.ts)
6 tests que cubren:
1. ✅ Verificar que el formulario de login se muestra correctamente
2. ✅ Login exitoso con admin/admin
3. ✅ Login exitoso con jvh/jvh
4. ✅ Login fallido con credenciales incorrectas
5. ✅ Login fallido con usuario correcto pero password incorrecto
6. ✅ Validación de campos vacíos

#### Tests con Page Object Model - POM (login2.spec.ts)
9 tests usando el patrón POM:
1. ✅ Verificar que el formulario de login se muestra correctamente
2. ✅ Login exitoso con admin/admin usando POM
3. ✅ Login exitoso con jvh/jvh usando POM
4. ✅ Login fallido con credenciales incorrectas usando POM
5. ✅ Login fallido con usuario correcto pero password incorrecto usando POM
6. ✅ Login fallido con password correcto pero usuario incorrecto usando POM
7. ✅ Validación de campos vacíos usando POM
8. ✅ Login con espacios en blanco usando POM
9. ✅ Verificar sensibilidad a mayúsculas/minúsculas usando POM

**Total Playwright: 15 tests**

### Tests con Selenium WebDriver

#### Tests básicos (login-basic.test.ts)
6 tests implementados con Selenium:
1. ✅ Debe mostrar el formulario de login
2. ✅ Login exitoso con admin/admin
3. ✅ Login exitoso con jvh/jvh
4. ✅ Login fallido con credenciales incorrectas
5. ✅ Login fallido con usuario correcto pero password incorrecto
6. ✅ Validación de campos vacíos

#### Tests con Page Object Model - POM (login-pom.test.ts)
9 tests usando el patrón POM con Selenium:
1. ✅ Debe mostrar el formulario de login correctamente
2. ✅ Login exitoso con admin/admin usando POM
3. ✅ Login exitoso con jvh/jvh usando POM
4. ✅ Login fallido con credenciales incorrectas usando POM
5. ✅ Login fallido con usuario correcto pero password incorrecto usando POM
6. ✅ Login fallido con password correcto pero usuario incorrecto usando POM
7. ✅ Validación de campos vacíos usando POM
8. ✅ Login con espacios en blanco usando POM
9. ✅ Verificar sensibilidad a mayúsculas/minúsculas usando POM

**Total Selenium: 15 tests**

**🎯 TOTAL GENERAL: 30 tests pasando**

## Page Object Model (POM)

El proyecto implementa el patrón Page Object Model para los tests, lo que proporciona:

- **Mejor mantenibilidad**: Los cambios en la UI solo requieren actualizar los Page Objects
- **Reutilización de código**: Los métodos de interacción se pueden reusar en múltiples tests
- **Lectura clara**: Los tests son más descriptivos y fáciles de entender
- **Separación de responsabilidades**: La lógica de interacción está separada de la lógica de testing

### Page Objects disponibles

#### LoginPage (`tests/pages/LoginPage.ts`)
- `goto()`: Navegar a la página de login
- `login(username, password)`: Hacer login con credenciales
- `loginWithValidCredentials(user)`: Login rápido con usuarios válidos
- `expectLoginPageToBeVisible()`: Verificar que la página de login está visible
- `setupDialogHandler(message)`: Configurar handler para alerts
- Y más métodos...

#### DashboardPage (`tests/pages/DashboardPage.ts`)
- `goto()`: Navegar al dashboard
- `expectToBeOnDashboard()`: Verificar que estamos en el dashboard
- `expectWelcomeMessageToBeVisible()`: Verificar mensaje de bienvenida

## Endpoints

### POST /api/login

Request:
```json
{
  "username": "admin",
  "password": "admin"
}
```

Response exitoso (200):
```json
{
  "success": true,
  "message": "Login exitoso"
}
```

Response fallido (401):
```json
{
  "success": false,
  "message": "usuario no existe"
}
```
