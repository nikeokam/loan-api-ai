import { Page } from '@playwright/test';
import { ValueField } from '../atoms/ValueField';

/** Atomic Design molecule: the three values shown by the loan calculator. */
export class CalculatorFields {
  readonly amount: ValueField;
  readonly term: ValueField;
  readonly monthlyPayment: ValueField;

  constructor(page: Page) {
    this.amount = new ValueField(page.getByRole('spinbutton').first());
    this.term = new ValueField(page.getByRole('combobox').first());
    this.monthlyPayment = new ValueField(page.getByText(/Monthly payment\s*[\d,.]+\s*€/i));
  }
}
