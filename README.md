# NBank Playwright API Tests

Playwright + TypeScript проект для backend/API автотестов NBank.

Проект развивается поэтапно: один этап дорожной карты - отдельная ветка и отдельный осмысленный коммит. `main` содержит только завершенные и проверенные этапы.

## Требования

- Node.js 24
- npm
- Docker Desktop

## Быстрый старт

```bash
npm ci
npm run docker:up
npm run test:api
```

Остановить backend:

```bash
npm run docker:down
```

## Окружение

Пример переменных находится в `.env.example`.

Основные значения по умолчанию:

```text
API_BASE_URL=http://localhost:4111
API_VERSION=/api/v1
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
FRONTEND_BASE_URL=http://localhost:3000
```

## Команды

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test:api
npm run test:smoke
npm run test:regression
npm run report
```

## Структура

```text
src/api/clients      API clients
src/api/endpoints.ts централизованный список endpoint-ов
src/config           env config
src/data             test data factories
src/models           TypeScript DTO
src/schemas          zod validation schemas
src/setup            Playwright global setup
src/steps            reusable test steps
src/utils            auth и diagnostics helpers
tests/api            API specs
```

## Отчеты

После запуска тестов создаются:

- `playwright-report/`
- `test-results/junit.xml`

Эти директории не коммитятся.

## Git workflow

Правило проекта:

```text
main
  стабильные завершенные этапы

step-XX-description
  отдельная ветка под этап
```

Пример:

```bash
git switch -c step-16-quality-hardening
```

Коммит должен описывать смысл изменения:

```text
feat: add account api client
test: add backend scenario specs
ci: add api tests workflow
```
