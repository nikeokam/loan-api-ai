import {expect, Page} from '@playwright/test';
import {SmallLoanTemplate} from '../components/templates/SmallLoanTemplate';

/** Page Object for the public small-loan calculator page. */
export class SmallLoanPage {
    readonly template: SmallLoanTemplate;

    constructor(private readonly page: Page) {
        this.template = new SmallLoanTemplate(page);
    }

    async open(): Promise<void> {
        await this.page.goto('/small-loan');
        await this.template.calculator.expectReady();
    }

    async applyNow(): Promise<void> {
        await this.template.applyNowButton.scrollIntoViewIfNeeded();
        await expect(this.template.applyNowButton).toBeInViewport();
        await this.template.applyNowButton.click();
    }

    async expectAuthenticationForm(): Promise<void> {
        await expect(this.page.getByRole('heading', {name: 'Login'})).toBeVisible();
        await expect(this.page.getByRole('textbox', {name: /username/i})).toBeVisible();
        await expect(this.page.getByRole('textbox', {name: /password/i})).toBeVisible();
    }
}
