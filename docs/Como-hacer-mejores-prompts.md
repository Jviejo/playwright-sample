# Cómo Hacer Mejores Prompts para IA

## Análisis de las peticiones del proyecto

Este documento analiza las peticiones realizadas durante el desarrollo del proyecto y proporciona ejemplos de cómo podrían haberse formulado mejor para obtener resultados más eficientes.

---

## Petición 1: Implementación inicial con Playwright

### ✅ Lo que se pidió (bueno)
```
"hay un ejemplo de uso de playwright haciendo una ruta /login con usuario y password.
No guardadamos nada en base de datos. El endpoint del server valida en una lista de
usuario / password en memoria. Cuando la validacion es correcta se pasa a un dasboard.
Si no se saca un alert con usuario no existe. Probar el form con playwright tanto con
valores buenos y malos. Valores posibles admin admin, jvh jvh."
```

**Aspectos positivos:**
- ✅ Especificó claramente los requisitos funcionales
- ✅ Proporcionó datos de prueba específicos
- ✅ Explicó el flujo completo (login → dashboard / alert)
- ✅ Mencionó que no se usa base de datos

**Aspectos a mejorar:**
- ⚠️ No especificó el framework (Next.js, React, etc.)
- ⚠️ No mencionó si quería estructura de carpetas específica
- ⚠️ No indicó preferencias de estilo (CSS, Tailwind, etc.)

### 🚀 Cómo podría haberse pedido MEJOR

```
CONTEXTO:
- Proyecto: Next.js 16 con App Router
- TypeScript: Sí
- Framework de estilos: Tailwind CSS

OBJETIVO:
Crear una funcionalidad de login completa con tests de Playwright

REQUISITOS FUNCIONALES:
1. Página de login en /login con:
   - Campo de usuario
   - Campo de password
   - Botón de submit

2. API endpoint en /api/login que:
   - Valida contra array en memoria (NO base de datos)
   - Usuarios válidos:
     * admin/admin
     * jvh/jvh
   - Si login correcto: retornar success
   - Si login incorrecto: retornar error con mensaje "usuario no existe"

3. Página de dashboard en /dashboard
   - Mostrar mensaje de bienvenida

4. Comportamiento del frontend:
   - Login exitoso: redirigir a /dashboard
   - Login fallido: mostrar alert() con mensaje de error

TESTS DE PLAYWRIGHT:
- Test 1: Verificar que el formulario se muestra
- Test 2: Login exitoso con admin/admin → verificar redirección
- Test 3: Login exitoso con jvh/jvh → verificar redirección
- Test 4: Login fallido → verificar alert
- Test 5: Login con usuario correcto pero password incorrecta
- Test 6: Validación de campos vacíos

ESTRUCTURA ESPERADA:
app/
├── login/page.tsx
├── dashboard/page.tsx
└── api/login/route.ts
tests/
└── login.spec.ts

ENTREGABLES:
- Código funcional
- Tests que pasen
- README actualizado con instrucciones
```

**Por qué es mejor:**
1. ✅ Contexto técnico claro
2. ✅ Requisitos organizados por categorías
3. ✅ Tests específicos listados
4. ✅ Estructura de carpetas esperada
5. ✅ Lista de entregables clara

---

## Petición 2: Page Object Model

### ✅ Lo que se pidió (bueno)
```
"construye otro test con playwright llamado login2.spec.ts esta vez usando
el patron pom page object model"
```

**Aspectos positivos:**
- ✅ Específico sobre el nombre del archivo
- ✅ Mencionó el patrón a usar (POM)

**Aspectos a mejorar:**
- ⚠️ No especificó si quería mantener los tests anteriores
- ⚠️ No indicó qué tests adicionales quería
- ⚠️ No mencionó si quería documentación sobre POM

### 🚀 Cómo podría haberse pedido MEJOR

```
OBJETIVO:
Crear una versión mejorada de los tests usando Page Object Model (POM)

REQUISITOS:
1. Mantener los tests existentes (login.spec.ts) intactos
2. Crear nueva suite de tests: login2.spec.ts
3. Implementar Page Objects:
   - tests/pages/LoginPage.ts con métodos:
     * goto()
     * login(username, password)
     * loginWithValidCredentials(user)
     * expectLoginPageToBeVisible()
     * waitAndVerifyAlert(message)
   - tests/pages/DashboardPage.ts con métodos:
     * goto()
     * expectToBeOnDashboard()
     * expectWelcomeMessageToBeVisible()

4. Tests en login2.spec.ts usando POM:
   - Todos los tests de login.spec.ts reescritos con POM
   - Tests adicionales:
     * Login con espacios en blanco
     * Verificar case-sensitivity
     * Login con usuario incorrecto pero password correcta

5. Documentación:
   - Crear docs/POM-vs-Basic.md comparando ambos enfoques
   - Incluir ventajas/desventajas de cada uno
   - Ejemplos de código lado a lado

RESULTADO ESPERADO:
- 2 suites de tests funcionando (basic y POM)
- Documentación clara sobre cuándo usar cada patrón
- README actualizado con instrucciones de ambos
```

**Por qué es mejor:**
1. ✅ Especifica qué mantener y qué crear
2. ✅ Define la estructura de los Page Objects
3. ✅ Lista tests adicionales
4. ✅ Pide documentación comparativa
5. ✅ Define resultado esperado claramente

---

## Petición 3: Migración a Selenium

### ✅ Lo que se pidió (correcto pero escueto)
```
"ahora usa el framework de selenium para pasar los test"
```

**Aspectos positivos:**
- ✅ Claro sobre qué framework usar

**Aspectos a mejorar:**
- ⚠️ No especificó si quería mantener Playwright
- ⚠️ No mencionó si quería estructura similar
- ⚠️ No indicó preferencias de test runner
- ⚠️ No especificó qué navegadores

### 🚀 Cómo podría haberse pedido MEJOR

```
OBJETIVO:
Crear versión paralela de tests usando Selenium WebDriver

CONTEXTO:
- Mantener todos los tests de Playwright existentes
- Selenium debe coexistir con Playwright
- Objetivo: comparar ambos frameworks

REQUISITOS TÉCNICOS:
1. Dependencias:
   - selenium-webdriver
   - chromedriver
   - @types/selenium-webdriver
   - tsx (para ejecutar TypeScript)

2. Estructura de carpetas:
   tests-selenium/
   ├── config/
   │   └── setup.ts          # Configuración del WebDriver
   ├── helpers/
   │   ├── testRunner.ts     # Runner personalizado
   │   └── assertions.ts     # Helpers de assertions
   ├── pages/
   │   ├── LoginPage.ts      # Page Object
   │   └── DashboardPage.ts  # Page Object
   ├── login-basic.test.ts   # Tests básicos
   └── login-pom.test.ts     # Tests con POM

3. Configuración:
   - Navegador: Chrome
   - Modo: Headless por defecto
   - Timeouts: implicit 10s, pageLoad 30s

4. Tests a implementar:
   - Mismos tests que en Playwright (15 total)
   - 6 tests básicos
   - 9 tests con POM

5. Scripts de NPM:
   - test:selenium
   - test:selenium:basic
   - test:selenium:pom

6. Documentación:
   - docs/Playwright-vs-Selenium.md
   - Comparación de velocidad
   - Comparación de sintaxis
   - Ventajas/desventajas de cada uno
   - Cuándo usar cada framework

RESULTADO ESPERADO:
- Ambos frameworks funcionando en paralelo
- Todos los tests (30 total) pasando
- Documentación comparativa completa
- README actualizado con comandos de ambos
```

**Por qué es mejor:**
1. ✅ Contexto claro sobre coexistencia
2. ✅ Estructura completa definida
3. ✅ Configuración específica
4. ✅ Lista exacta de tests
5. ✅ Scripts NPM específicos
6. ✅ Documentación detallada pedida

---

## Petición 4: Modo Headless

### ✅ Lo que se pidió (muy simple)
```
"que no se vea el navegador cuando se pasan los test en selenium"
```

**Aspectos positivos:**
- ✅ Claro sobre qué quiere

**Aspectos a mejorar:**
- ⚠️ No mencionó si quería opción para verlo cuando debugging
- ⚠️ No pidió actualizar documentación

### 🚀 Cómo podría haberse pedido MEJOR

```
OBJETIVO:
Configurar Selenium para ejecutar en modo headless por defecto

REQUISITOS:
1. Modificar tests-selenium/config/setup.ts:
   - Agregar flag --headless=new
   - Documentar con comentario cómo desactivarlo para debugging

2. Actualizar documentación:
   - README.md: agregar nota sobre modo headless
   - Incluir instrucciones de cómo ver el navegador si se necesita
   - docs/Playwright-vs-Selenium.md: actualizar tiempos de ejecución

3. Verificar:
   - Ejecutar todos los tests en modo headless
   - Confirmar que tiempos mejoran
   - Confirmar que todos pasan

RESULTADO ESPERADO:
- Tests más rápidos
- Documentación actualizada con nuevos tiempos
- Instrucciones claras de cómo cambiar el modo
```

**Por qué es mejor:**
1. ✅ Especifica qué archivo modificar
2. ✅ Pide actualizar documentación
3. ✅ Incluye verificación
4. ✅ Considera caso de debugging

---

## Petición 5: GitHub Actions y Deployment

### ✅ Lo que se pidió (bueno pero podría ser mejor)
```
"Crea un workflow action para pasar los test en github. Crea un repo en github
en Jviejo, con el proyecto, subelo y verifica que los test han pasado"
```

**Aspectos positivos:**
- ✅ Claro sobre qué hacer
- ✅ Especificó el usuario de GitHub

**Aspectos a mejorar:**
- ⚠️ No especificó nombre del repositorio
- ⚠️ No mencionó si quería README badge
- ⚠️ No indicó estructura del workflow
- ⚠️ No especificó triggers

### 🚀 Cómo podría haberse pedido MEJOR

```
OBJETIVO:
Configurar CI/CD completo con GitHub Actions y crear repositorio

PARTE 1: WORKFLOW DE GITHUB ACTIONS
Archivo: .github/workflows/test.yml

Triggers:
- push a main/master
- pull_request a main/master

Jobs:
1. playwright-tests:
   - Node.js 20
   - npm ci
   - npx playwright install --with-deps
   - npm test
   - Upload playwright-report como artifact

2. selenium-tests:
   - Node.js 20
   - npm ci
   - Iniciar servidor (npm run dev en background)
   - wait-on http://localhost:3000
   - npm run test:selenium:basic
   - npm run test:selenium:pom

3. all-tests-passed:
   - needs: [playwright-tests, selenium-tests]
   - Echo mensaje de éxito

Runner: ubuntu-latest

PARTE 2: REPOSITORIO EN GITHUB
- Usuario: Jviejo
- Nombre: playwright-sample
- Visibilidad: Público
- Descripción: "Next.js login example with Playwright and Selenium tests"

PARTE 3: DEPLOYMENT
1. Verificar .gitignore incluye:
   - node_modules
   - test-results
   - playwright-report
   - .env

2. Hacer commit inicial:
   - Mensaje descriptivo
   - Incluir co-author de Claude

3. Crear repo y push:
   - gh repo create Jviejo/playwright-sample
   - git push origin main

4. Verificar workflow:
   - gh run watch para ver progreso
   - Confirmar que todos los tests pasan
   - Obtener URL del workflow

PARTE 4: ACTUALIZAR DOCUMENTACIÓN
1. README.md:
   - Agregar badge del workflow al inicio
   - Sección de CI/CD explicando el workflow

2. Crear docs/GitHub-Actions.md:
   - Explicar estructura del workflow
   - Cómo debuggear si falla
   - Cómo ver reportes de artifacts

RESULTADO ESPERADO:
- Repositorio público en GitHub
- Workflow funcionando y pasando
- Badge verde en el README
- Documentación completa del CI/CD
- Link al workflow en el README
```

**Por qué es mejor:**
1. ✅ Workflow completamente especificado
2. ✅ Jobs detallados con pasos
3. ✅ Proceso de deployment paso a paso
4. ✅ Actualización de documentación
5. ✅ Verificación incluida
6. ✅ Documentación adicional pedida

---

## Principios Generales para Mejores Prompts

### 1. **Estructura CONTEXTO-OBJETIVO-REQUISITOS-RESULTADO**

```markdown
CONTEXTO:
- [Situación actual, tecnologías usadas]

OBJETIVO:
- [Qué quieres lograr en una frase]

REQUISITOS:
- [Lista detallada de qué necesitas]

RESULTADO ESPERADO:
- [Qué consideras "terminado"]
```

### 2. **Sé Específico con Nombres y Rutas**

❌ Malo: "crea los archivos necesarios"
✅ Bueno:
```
Crear:
- app/login/page.tsx
- app/api/login/route.ts
- tests/login.spec.ts
```

### 3. **Define Estructura de Datos**

❌ Malo: "valida usuarios"
✅ Bueno:
```typescript
const validUsers = [
  { username: 'admin', password: 'admin' },
  { username: 'jvh', password: 'jvh' }
]
```

### 4. **Especifica Tests Esperados**

❌ Malo: "prueba todo"
✅ Bueno:
```
Tests:
1. Formulario visible
2. Login exitoso admin/admin → /dashboard
3. Login exitoso jvh/jvh → /dashboard
4. Login fallido → alert "usuario no existe"
5. Password incorrecta → alert
6. Campos vacíos → validación HTML5
```

### 5. **Menciona Restricciones y Preferencias**

```
RESTRICCIONES:
- NO usar base de datos
- Headless mode por defecto
- Compatible con CI/CD

PREFERENCIAS:
- TypeScript estricto
- ESLint sin warnings
- Comentarios en español
```

### 6. **Pide Documentación Específica**

❌ Malo: "documenta esto"
✅ Bueno:
```
Documentación:
- README.md con:
  * Instrucciones de instalación
  * Comandos disponibles
  * Credenciales de prueba
- docs/Architecture.md explicando:
  * Estructura de carpetas
  * Flujo de autenticación
  * Decisiones de diseño
```

### 7. **Define Criterios de Éxito**

```
CRITERIOS DE ÉXITO:
✅ Todos los tests pasan localmente
✅ Todos los tests pasan en GitHub Actions
✅ README tiene badge verde
✅ Código sin warnings de ESLint
✅ TypeScript sin errores
```

### 8. **Pide Comparaciones y Alternativas**

```
Implementa X pero también:
- Documenta por qué elegiste X sobre Y
- Crea tabla comparativa X vs Y
- Menciona casos de uso para cada uno
```

### 9. **Sé Explícito sobre Mantenimiento**

```
Además de la implementación:
- Agrega comentarios explicando partes complejas
- Documenta cómo extender para nuevos casos
- Lista posibles mejoras futuras
```

### 10. **Pide Validación y Tests**

```
Después de implementar:
- Ejecuta los tests y muestra resultados
- Verifica que no hay warnings
- Confirma que funciona en modo headless
- Sube a GitHub y confirma que CI pasa
```

---

## Template de Prompt Ideal

```markdown
# [TÍTULO DE LA TAREA]

## CONTEXTO
- Proyecto: [tipo de proyecto, framework]
- Stack: [tecnologías principales]
- Estado actual: [qué existe ya]

## OBJETIVO
[Una frase clara de qué quieres lograr]

## REQUISITOS FUNCIONALES
1. [Requisito 1]
   - Detalle A
   - Detalle B
2. [Requisito 2]
   - Detalle A

## REQUISITOS TÉCNICOS
- Framework: [específico]
- Dependencias: [listar]
- Configuración: [detalles]

## ESTRUCTURA ESPERADA
```
[árbol de carpetas]
```

## TESTS
1. Test 1: [descripción] → [resultado esperado]
2. Test 2: [descripción] → [resultado esperado]

## DOCUMENTACIÓN REQUERIDA
- [archivo 1]: [qué debe contener]
- [archivo 2]: [qué debe contener]

## RESTRICCIONES
- NO hacer: [X]
- Preferir: [Y sobre Z]

## CRITERIOS DE ÉXITO
✅ [Criterio 1]
✅ [Criterio 2]

## ENTREGABLES
- [ ] [Item 1]
- [ ] [Item 2]
```

---

## Ejemplo Completo Aplicado a Este Proyecto

Si hubieras empezado con este prompt, el proyecto habría sido más eficiente:

```markdown
# Sistema de Login con Tests Automatizados (Playwright y Selenium)

## CONTEXTO
- Proyecto: Next.js 16 con App Router
- Stack: TypeScript, Tailwind CSS, React 19
- Estado: Proyecto nuevo (create-next-app recién ejecutado)

## OBJETIVO
Crear un sistema completo de autenticación simple con tests end-to-end usando dos frameworks (Playwright y Selenium) implementando el patrón Page Object Model, con CI/CD en GitHub Actions.

## REQUISITOS FUNCIONALES

### 1. Autenticación
- Página de login en /login
- Validación contra array en memoria (usuarios: admin/admin, jvh/jvh)
- Redirección a /dashboard si login exitoso
- Alert "usuario no existe" si login falla

### 2. UI/UX
- Formulario con campos username y password
- Botón de submit
- Validación HTML5 de campos requeridos
- Diseño responsive con Tailwind

## REQUISITOS TÉCNICOS

### Estructura de Carpetas
```
app/
├── login/page.tsx
├── dashboard/page.tsx
└── api/login/route.ts
tests/                      # Playwright
├── pages/
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── login.spec.ts
└── login2.spec.ts
tests-selenium/             # Selenium
├── config/setup.ts
├── helpers/
│   ├── testRunner.ts
│   └── assertions.ts
├── pages/
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── login-basic.test.ts
└── login-pom.test.ts
.github/workflows/test.yml
docs/
├── POM-vs-Basic.md
└── Playwright-vs-Selenium.md
```

### Dependencias
```json
{
  "devDependencies": {
    "@playwright/test": "latest",
    "selenium-webdriver": "latest",
    "chromedriver": "latest",
    "@types/selenium-webdriver": "latest",
    "tsx": "latest",
    "wait-on": "latest"
  }
}
```

## TESTS REQUERIDOS

### Playwright (15 tests total)
**Basic (6):**
1. Formulario visible
2. Login admin/admin → dashboard
3. Login jvh/jvh → dashboard
4. Credenciales incorrectas → alert
5. Usuario correcto + password incorrecta → alert
6. Campos vacíos → permanece en /login

**POM (9):**
- Todos los anteriores +
- Login con espacios en blanco
- Case sensitivity
- Password correcta + usuario incorrecto

### Selenium (15 tests total)
- Misma estructura que Playwright
- Modo headless por defecto
- Runner personalizado con output colorizado

## GITHUB ACTIONS

### Workflow (.github/workflows/test.yml)
- Trigger: push/PR a main
- Jobs paralelos:
  * playwright-tests (ubuntu-latest, Node 20)
  * selenium-tests (ubuntu-latest, Node 20)
  * all-tests-passed (needs ambos anteriores)
- Artifacts: playwright-report

## DOCUMENTACIÓN

### README.md
- Badge de GitHub Actions
- Sección de instalación
- Comandos para ambos frameworks
- Credenciales de prueba
- Instrucciones de CI/CD

### docs/POM-vs-Basic.md
- Comparación código lado a lado
- Cuándo usar cada patrón
- Ventajas/desventajas

### docs/Playwright-vs-Selenium.md
- Comparación de sintaxis
- Tiempos de ejecución
- Cuándo usar cada framework
- Tabla comparativa completa

## DEPLOYMENT

### GitHub
- Usuario: Jviejo
- Repo: playwright-sample
- Visibilidad: Público
- Branch: main

### Commits
- Mensaje descriptivo
- Co-authored-by: Claude

## CRITERIOS DE ÉXITO
✅ 30 tests pasando (15 Playwright + 15 Selenium)
✅ Workflow de GitHub Actions verde
✅ README con badge verde
✅ Documentación completa
✅ Modo headless funcionando
✅ Tests ejecutándose en < 3 min en CI/CD

## RESTRICCIONES
- NO usar base de datos
- NO usar autenticación real (JWT, sessions, etc.)
- NO crear más páginas que login y dashboard
- Mantener código simple y educativo

## PREFERENCIAS
- Comentarios en español
- Tests con nombres descriptivos en español
- Console output colorizado para Selenium
- TypeScript strict mode
```

---

## Conclusión

### Lo que hiciste bien:
✅ Fuiste directo y claro
✅ Proporcionaste datos de prueba específicos
✅ Fuiste iterativo (pediste cosas paso a paso)
✅ Validaste resultados en cada paso

### Lo que podrías mejorar:
📝 Dar más contexto inicial
📝 Especificar estructura completa desde el inicio
📝 Pedir documentación explícitamente
📝 Definir criterios de éxito claramente
📝 Mencionar todas las tecnologías del stack

### Resultado:
A pesar de que los prompts podrían haber sido más detallados,
logramos completar un proyecto excelente con:
- ✅ 30 tests pasando
- ✅ Dos frameworks implementados
- ✅ Page Object Model en ambos
- ✅ CI/CD funcionando
- ✅ Documentación completa
- ✅ Repositorio en GitHub

**El proyecto fue un éxito!** 🎉

Estos principios te ayudarán en futuros proyectos a obtener
resultados aún mejores con menos iteraciones.
