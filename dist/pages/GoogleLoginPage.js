"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleLoginPage = void 0;
class GoogleLoginPage {
    constructor(page) {
        this.page = page;
        // Locators
        this.emailInput = 'input[type="email"]';
        this.passwordInput = 'input[type="password"]';
        this.identifierNextButton = '#identifierNext';
        this.passwordNextButton = '#passwordNext';
        this.continueButton = 'button:has-text("Continue")';
        this.selectAllCheckbox = 'input[type="checkbox"][aria-label="Select all"]';
        this.alreadyHasAccessText = 'text=Spikerz already has some access';
    }
    async enterEmail(username) {
        await this.page.fill(this.emailInput, username);
        await this.page.click(this.identifierNextButton);
    }
    async enterPassword(password) {
        await this.page.waitForSelector(this.passwordInput, { state: 'visible' });
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.passwordNextButton);
    }
    async handlePermissions() {
        await this.page.waitForSelector(this.continueButton, { state: 'visible' });
        await this.page.locator(this.continueButton).click();
    }
    async selectAllCheckboxes() {
        try {
            await this.page.waitForSelector(this.selectAllCheckbox, { state: 'visible', timeout: 50000 });
            await this.page.check(this.selectAllCheckbox);
        }
        catch (error) {
            const alreadyHasAccess = await this.page.isVisible(this.alreadyHasAccessText);
            if (!alreadyHasAccess) {
                throw new Error('Neither the "Select all" checkbox nor the "You already have access" message was found.');
            }
            console.log('User already has access. Skipping checkbox selection.');
        }
    }
    async finalizeLogin() {
        await this.page.locator(this.continueButton).click();
        await this.page.waitForEvent('close', { timeout: 30000 });
    }
}
exports.GoogleLoginPage = GoogleLoginPage;
//# sourceMappingURL=GoogleLoginPage.js.map