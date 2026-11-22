# Small loan Playwright checks

Набор критичных E2E сценариев страницы `small-loan`, написанный на Playwright и TypeScript. Тесты запускаются на Chromium в desktop-проекте и в мобильном профиле iPhone 13.

## Запуск

```bash
npm ci
npx playwright install chromium
npm test
```

Отдельные профили:

```bash
npm run test:desktop
npm run test:mobile
npm run test:report
```

Проверки используют фиксированные значения: сумма 500 €, срок 12 месяцев, месячный платёж 42.8 €, а для пересчёта сумма меняется на 1000 €. Для входа используются фиксированные демонстрационные строки `test-user` / `test-password`; `BASE_URL` задан в конфигурации.

## Структура

- `tests/components/atoms` — атомы для чтения значений полей.
- `tests/components/molecules` — связанные поля калькулятора.
- `tests/components/organisms` — калькулятор и его действия.
- `tests/components/templates` — шаблон страницы и основная кнопка.
- `tests/pages` — Page Objects публичной страницы и авторизации.
- `tests/small-loan.spec.ts` — четыре критичных сценария TL-20-1…TL-20-4.
- `.github/workflows/playwright.yml` — pipeline для push, pull request и ручного запуска.
- `USER_PROMPTS.md` — список пользовательских запросов по проекту.

## Сценарии

1. `TL-20-1` — значения калькулятора по умолчанию.
2. `TL-20-2` — пересчёт платежа после изменения суммы.
3. `TL-20-3` — открытие авторизации через Apply Now.
4. `TL-20-4` — вход и переход к Loan Details.
