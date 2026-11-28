import { expect, Page } from '@playwright/test';
import { CalculatorFields } from '../molecules/CalculatorFields';

/** Atomic Design organism: calculator inputs and its monthly-payment output. */
export class LoanCalculator {
  readonly fields: CalculatorFields;

  constructor(private readonly page: Page) {
    this.fields = new CalculatorFields(page);
  }

  async expectReady(): Promise<void> {
    await expect(this.fields.amount.locator).toBeVisible();
    await expect(this.fields.term.locator).toBeVisible();
    await expect(this.fields.monthlyPayment.locator).toBeVisible();
  }

  async expectError(): Promise<void> {
    await expect(this.page.getByTestId('id-small-loan-calculator-field-error')).toBeVisible();
  }

  async expectNoError(): Promise<void> {
    await expect(this.page.getByTestId('id-small-loan-calculator-field-error')).toBeHidden();
  }

  async expectMonthlyPayment(value: string): Promise<void> {
    await expect(this.page.getByTestId('ib-small-loan-calculator-field-monthlyPayment')).toHaveText(value);
  }

  async expectDefaultValues(amount: string, term: string, monthlyPayment: string): Promise<void> {
    await expect(this.fields.amount.locator).toHaveValue(amount);
    await expect(this.fields.term.locator).toHaveValue(term);
    await expect(this.fields.monthlyPayment.locator).toContainText(monthlyPayment);
  }

  async setAmount(value: string): Promise<void> {
    await this.fields.amount.locator.fill(value);
  }

  async expectPaymentChangedFrom(previousValue: string): Promise<void> {
    await expect.poll(() => this.fields.monthlyPayment.value()).not.toBe(previousValue);
  }

  async changeAmountAndExpectPaymentUpdate(amount: string, expectedCurrentAmount: string): Promise<void> {
    await expect(this.fields.amount.locator).toHaveValue(expectedCurrentAmount);
    const previousPayment = await this.fields.monthlyPayment.value();
    await this.setAmount(amount);
    await this.expectPaymentChangedFrom(previousPayment);
  }

}
