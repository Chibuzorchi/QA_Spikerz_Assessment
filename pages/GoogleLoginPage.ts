import { Page } from '@playwright/test';

class GoogleLoginPage {
  private page: Page;
  private emailInput: string;
  private passwordInput: string;
  private identifierNextButton: string;
  private passwordNextButton: string;
  private continueButton: string;
  private selectAllCheckbox: string;
  private alreadyHasAccessText: string;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.emailInput = 'input#identifierId, input[type="email"]';
    // Use the real password field, not the hidden mirror input
    this.passwordInput = 'input[name="Passwd"]';
    this.identifierNextButton = '#identifierNext';
    this.passwordNextButton = '#passwordNext';
    this.continueButton = 'button:has-text("Continue")';
    this.selectAllCheckbox = 'input[type="checkbox"][aria-labelledby="selectioni1"]';
    // this.selectAllCheckbox = 'div:has-text("Select all")';
    this.alreadyHasAccessText = 'text=Spikerz already has some access';
  }

  async enterEmail(username: string): Promise<void> {
    await this.page.waitForSelector(this.emailInput, { state: 'visible' });
    await this.page.fill(this.emailInput, username);
    await this.page.click(this.identifierNextButton);
    // Wait for the password step to load
    await this.page.waitForSelector(this.passwordInput, { state: 'visible' });
  }

  async enterPassword(password: string): Promise<void> {
    const passwordField = this.page.locator(this.passwordInput);
    await passwordField.waitFor({ state: 'visible' });
    await passwordField.fill(password);
    await this.page.click(this.passwordNextButton);
  }

  async handlePermissions(): Promise<void> {
    await this.page.waitForSelector(this.continueButton, { state: 'visible' });
    await this.page.locator(this.continueButton).click();
  }

  // 
  
  async selectAllCheckboxes(): Promise<void> {
    try {
      // Wait for the checkbox to be visible and stable
      await this.page.waitForSelector(this.selectAllCheckbox, { state: 'visible',  timeout: 50000 });
      
      // Wait a bit for any animations or dynamic content to settle
      await this.page.waitForTimeout(500);
      
      // Click the checkbox instead of using check() to trigger all event handlers
      await this.page.click(this.selectAllCheckbox, {
        force: true 
      
      });
      
      // Optional: Wait a moment to let the selection take effect
      await this.page.waitForTimeout(1000);
      
    } catch (error) {
      const alreadyHasAccess = await this.page.isVisible(this.alreadyHasAccessText);
      if (!alreadyHasAccess) {
        throw new Error('Neither the "Select all" checkbox nor the "You already have access" message was found.');
      }
      throw new Error('User already has access. Skipping checkbox selection.');
    }
  }


  async finalizeLogin(): Promise<void> {
    await this.page.locator(this.continueButton).click();
  }
}

export { GoogleLoginPage };
