import { Page } from '@playwright/test';
import { LoanCalculator } from '../organisms/LoanCalculator';

/** Atomic Design template: the calculator screen and its primary action. */
export class SmallLoanTemplate {
  readonly calculator: LoanCalculator;

  constructor(private readonly page: Page) {
    this.calculator = new LoanCalculator(page);
  }

  get applyNowButton() {
    return this.page.getByRole('link', { name: /apply now/i })
      .or(this.page.getByRole('button', { name: /apply now/i }));
  }
}
