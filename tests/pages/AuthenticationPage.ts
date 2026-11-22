import {expect, Page} from '@playwright/test';

/** Page Object for the authentication step in the loan application flow. */
export class AuthenticationPage {
    constructor(private readonly page: Page) {
    }

    async signIn(username: string, password: string): Promise<void> {
        const usernameField = this.page.getByRole('textbox', {name: /username/i});
        const passwordField = this.page.getByRole('textbox', {name: /password/i});
        const continueButton = this.page.getByRole('button', {name: 'Continue'});

        await usernameField.scrollIntoViewIfNeeded();
        await expect(usernameField).toBeInViewport();
        await usernameField.fill(username);
        await passwordField.scrollIntoViewIfNeeded();
        await expect(passwordField).toBeInViewport();
        await passwordField.fill(password);
        await continueButton.scrollIntoViewIfNeeded();
        await expect(continueButton).toBeInViewport();
        await continueButton.click();
    }

    async expectLoanDetails(): Promise<void> {
        await expect(this.page).toHaveURL(/\/loan-decision\/?$/i);
        await expect(this.page.getByRole('heading', {name: /loan details|laenu andmed|детали кредита/i})).toBeVisible();
    }
}
