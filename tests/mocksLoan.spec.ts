import { expect, test } from '@playwright/test';
import { SmallLoanPage } from './pages/SmallLoanPage';

test.describe('Обработка ошибки калькулятора', () => {
  test('TL-21-1 Для суммы ниже минимума отображается ошибка калькулятора', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();

    await page.route('**/api/loan-calc**', async (route) => {
      await route.continue();
    });

    await loanPage.template.calculator.setAmount('499');
    await loanPage.template.calculator.expectError();
  });

  test('TL-21-2 Код ответа 500 и отсутствие тела ответа', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();

    await page.route('**/api/loan-calc**', async (route) => {
      await route.fulfill({
        status: 500,
        body: '',
      });
    });

    const responsePromise = page.waitForResponse('**/api/loan-calc**');
    await loanPage.template.calculator.setAmount('1000');
    const response = await responsePromise;
    expect(response.status()).toBe(500);
    expect(await response.text()).toBe('');
    await loanPage.template.calculator.expectError();
  });

  test('TL-21-3 Код ответа 200, но тело ответа отсутствует.', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();

    await page.route('**/api/loan-calc**', async (route) => {
      await route.fulfill({
        status: 200,
        body: '',
      });
    });

    const responsePromise = page.waitForResponse('**/api/loan-calc**');
    await loanPage.template.calculator.setAmount('1000');
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    expect(await response.text()).toBe('');
    await loanPage.template.calculator.expectNoError();
    await loanPage.template.calculator.expectMonthlyPayment('undefined €');
  });

  test('TL-21-4 Код ответа 200, но тело ответа содержит неверное имя ключа.', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();

    await page.route('**/api/loan-calc**', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ monthlyPayment: 42.8 }),
      });
    });

    const responsePromise = page.waitForResponse('**/api/loan-calc**');
    await loanPage.template.calculator.setAmount('1000');
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ monthlyPayment: 42.8 });
    await loanPage.template.calculator.expectNoError();
    await loanPage.template.calculator.expectMonthlyPayment('undefined €');
  });

});
