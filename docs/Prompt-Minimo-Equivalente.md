# Prompt Mínimo Equivalente

## Versión Compacta (Recomendada)

```markdown
Crear sistema de login Next.js 16 + TypeScript + Tailwind con tests E2E (Playwright + Selenium) + CI/CD.

FUNCIONALIDAD:
- /login → valida array memoria [admin/admin, jvh/jvh] → /dashboard o alert "usuario no existe"

TESTS (30 total):
Playwright (15): 6 básicos + 9 POM (incluir espacios, case-sensitivity)
Selenium (15): mismos tests, headless, runner custom colorizado

ESTRUCTURA:
app/{login,dashboard,api/login}
tests/{pages,login.spec.ts,login2.spec.ts}
tests-selenium/{config,helpers,pages,login-basic.test.ts,login-pom.test.ts}
.github/workflows/test.yml
docs/{POM-vs-Basic.md,Playwright-vs-Selenium.md}

CI/CD:
- GitHub Actions: jobs paralelos playwright + selenium
- Repo: Jviejo/playwright-sample (público)
- Badge en README

DOCS:
- README: badge, instalación, comandos, credenciales
- Comparativas POM vs Basic y Playwright vs Selenium (código, tiempos, uso)

RESTRICCIONES: NO DB, NO auth real, código educativo simple
```

---

## Versión Ultra-Compacta (Mínimo Absoluto)

```markdown
Next.js 16 login (/login→/dashboard) + tests Playwright/Selenium (15+15, básicos+POM) + GitHub Actions CI/CD.

Users: admin/admin, jvh/jvh (array memoria)
Alert si falla: "usuario no existe"

Estructura:
- app: login, dashboard, api/login
- tests: Playwright (pages/, login.spec.ts, login2.spec.ts)
- tests-selenium: Selenium (config/, helpers/, pages/, login-basic.test.ts, login-pom.test.ts)
- .github/workflows/test.yml
- docs: POM-vs-Basic.md, Playwright-vs-Selenium.md

Tests: 6 básicos, 9 POM (espacios, case-sensitivity)
Selenium: headless, runner custom
GitHub: Jviejo/playwright-sample (público), badge README
Docs: comparativas código/tiempos/cuándo usar
```

---

## Versión Bullet Points (Más Legible)

```markdown
# Login System con Playwright + Selenium + CI/CD

**Stack:** Next.js 16, TypeScript, Tailwind

**Features:**
- Login `/login` → Dashboard `/dashboard`
- Validación: array memoria [admin/admin, jvh/jvh]
- Error: alert "usuario no existe"

**Tests (30):**
- Playwright: 15 (6 basic + 9 POM)
- Selenium: 15 (6 basic + 9 POM, headless, custom runner)
- Casos: login ok/fail, espacios, case-sensitivity, campos vacíos

**Estructura:**
```
app/{login,dashboard,api/login}
tests/{pages/,login.spec.ts,login2.spec.ts}
tests-selenium/{config/,helpers/,pages/,*.test.ts}
.github/workflows/test.yml
docs/{POM-vs-Basic.md,Playwright-vs-Selenium.md}
```

**CI/CD:**
- GitHub Actions: playwright + selenium jobs paralelos
- Repo: Jviejo/playwright-sample (público)
- Badge en README

**Docs:**
- README: instalación, comandos, credenciales
- Comparativas: POM vs Basic, Playwright vs Selenium (código, velocidad, uso)

**No usar:** DB, auth real. **Mantener:** código simple y educativo
```

---

## Comparación de Longitud

| Versión | Líneas | Caracteres | Información Perdida |
|---------|--------|------------|---------------------|
| **Original** | ~120 | ~3,800 | 0% |
| **Compacta** | ~30 | ~1,100 | ~5% |
| **Ultra-compacta** | ~20 | ~700 | ~15% |
| **Bullet Points** | ~35 | ~1,000 | ~5% |

---

## Recomendación Final

Para la **mejor relación brevedad/claridad**, usa la **Versión Compacta**:

```markdown
Crear sistema de login Next.js 16 + TypeScript + Tailwind con tests E2E (Playwright + Selenium) + CI/CD.

FUNCIONALIDAD:
- /login → valida array memoria [admin/admin, jvh/jvh] → /dashboard o alert "usuario no existe"

TESTS (30 total):
Playwright (15): 6 básicos + 9 POM (incluir espacios, case-sensitivity)
Selenium (15): mismos tests, headless, runner custom colorizado

ESTRUCTURA:
app/{login,dashboard,api/login}
tests/{pages,login.spec.ts,login2.spec.ts}
tests-selenium/{config,helpers,pages,login-basic.test.ts,login-pom.test.ts}
.github/workflows/test.yml
docs/{POM-vs-Basic.md,Playwright-vs-Selenium.md}

CI/CD:
- GitHub Actions: jobs paralelos playwright + selenium
- Repo: Jviejo/playwright-sample (público)
- Badge en README

DOCS:
- README: badge, instalación, comandos, credenciales
- Comparativas POM vs Basic y Playwright vs Selenium (código, tiempos, uso)

RESTRICCIONES: NO DB, NO auth real, código educativo simple
```

**Por qué esta versión es mejor:**
1. ✅ ~70% más corta que la original
2. ✅ Mantiene toda la información crítica
3. ✅ Fácil de escanear visualmente
4. ✅ Formato copy-paste friendly
5. ✅ Clara jerarquía de información

---

## Técnicas de Compresión Usadas

### 1. **Notación de Rutas Compacta**
❌ Antes:
```
app/
├── login/page.tsx
├── dashboard/page.tsx
└── api/login/route.ts
```

✅ Después:
```
app/{login,dashboard,api/login}
```

### 2. **Agregación de Información Similar**
❌ Antes:
```
- Login admin/admin → dashboard
- Login jvh/jvh → dashboard
```

✅ Después:
```
- Users: admin/admin, jvh/jvh → dashboard
```

### 3. **Abreviaciones Estándar**
- E2E = end-to-end
- CI/CD = Continuous Integration/Deployment
- POM = Page Object Model
- DB = Database

### 4. **Eliminación de Redundancia**
❌ Antes: "Tests con nombres descriptivos en español"
✅ Después: (implícito en ejemplos)

### 5. **Bullets en Lugar de Párrafos**
❌ Antes: "El workflow debe ejecutarse en ubuntu-latest con Node.js 20"
✅ Después: "ubuntu-latest, Node 20"

### 6. **Agrupar por Contexto**
En lugar de repetir "Playwright" y "Selenium" múltiples veces, agrupar toda su info junta.

---

## Cuándo Usar Cada Versión

### Versión Original (Detallada)
**Usar cuando:**
- Primera vez trabajando con la IA
- Proyecto complejo con muchas partes móviles
- Necesitas estar 100% seguro del resultado
- Trabajas con un equipo y necesitas documentación completa

### Versión Compacta (Recomendada)
**Usar cuando:**
- Ya tienes experiencia con la IA
- Proyecto de tamaño mediano
- Quieres rapidez pero sin ambigüedad
- **ESTE ES EL SWEET SPOT** 🎯

### Versión Ultra-compacta
**Usar cuando:**
- Tienes mucha experiencia con la IA
- Proyecto pequeño o prototipo
- Dispuesto a iterar si falta algo
- Necesitas rapidez extrema

### Versión Bullet Points
**Usar cuando:**
- Compartirás el prompt con otros
- Necesitas que sea fácil de escanear
- Proyecto de complejidad media
- Prefieres estructura visual clara

---

## Ejercicio: Comprime Tu Propio Prompt

**Prompt original largo:**
```
Necesito que me ayudes a crear un sistema de autenticación completo
usando Next.js como framework principal. Debería tener una página
de login donde el usuario ingresa su nombre de usuario y contraseña.
Cuando el usuario hace submit, debería validarse contra una lista
de usuarios que está en memoria...
```

**Versión comprimida equivalente:**
```
Next.js auth: /login (username/password) → validar array memoria → /dashboard o error

Tests: Playwright + Selenium (básicos + POM)
GitHub Actions CI/CD
```

**Ahorro:** ~90% caracteres, misma información esencial.
