import { Locator } from '@playwright/test';

/** Atomic Design atom: reads the value or displayed text of one field. */
export class ValueField {
  constructor(readonly locator: Locator) {}

  async value(): Promise<string> {
    return this.locator.evaluate((element) =>
      ('value' in element ? String(element.value) : element.textContent ?? '').trim(),
    );
  }
}
