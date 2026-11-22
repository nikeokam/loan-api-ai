import { test } from '@playwright/test';
import { AuthenticationPage } from './pages/AuthenticationPage';
import { SmallLoanPage } from './pages/SmallLoanPage';

const DEFAULT_AMOUNT = '500';
const DEFAULT_TERM = '12';
const DEFAULT_PAYMENT = '42.8';
const UPDATED_AMOUNT = '1000';
const TEST_USER = 'test-user';
const TEST_PASS = 'test-password';

test.describe('Калькулятор малого займа', () => {
  test('TL-20-1 Калькулятор показывает значения суммы, срока и платежа по умолчанию', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();
    await loanPage.template.calculator.expectDefaultValues(DEFAULT_AMOUNT, DEFAULT_TERM, DEFAULT_PAYMENT);
  });

  test('TL-20-2 При изменении суммы кредита ежемесячный платёж пересчитывается', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();
    await loanPage.template.calculator.changeAmountAndExpectPaymentUpdate(UPDATED_AMOUNT, DEFAULT_AMOUNT);
  });

  test('TL-20-3 Кнопка Apply Now открывает форму авторизации', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();
    await loanPage.applyNow();
    await loanPage.expectAuthenticationForm();
  });

  test('TL-20-4 После ввода данных авторизации открывается страница Loan Details', async ({ page }) => {
    const loanPage = new SmallLoanPage(page);
    await loanPage.open();
    await loanPage.applyNow();
    await loanPage.expectAuthenticationForm();

    const authenticationPage = new AuthenticationPage(page);
    await authenticationPage.signIn(TEST_USER, TEST_PASS);
    await authenticationPage.expectLoanDetails();
  });
});
