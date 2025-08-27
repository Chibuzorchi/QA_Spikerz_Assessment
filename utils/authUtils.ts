import { GoogleLoginPage } from '../pages/GoogleLoginPage';
import { Page } from '@playwright/test';

export const loginToGoogle = async (
  page: Page,
  username: string,
  password: string
): Promise<void> => {
  const googleLoginPage = new GoogleLoginPage(page);

  try {
    await googleLoginPage.enterEmail(username);
    await googleLoginPage.enterPassword(password);
    await googleLoginPage.selectAllCheckboxes();
    await googleLoginPage.finalizeLogin();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Google login process failed: ${error.message}`);
    }
    throw new Error('Google login process failed due to an unknown error');
  }
};