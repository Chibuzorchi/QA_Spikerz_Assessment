import { test, expect, Page } from '@playwright/test';
import { SocialConnectPage } from '../pages/SocialConnectPage';
import { loginToGoogle } from '../utils/authUtils';

test.describe('Social Connect Tests', () => {
  let socialConnectPage: SocialConnectPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    try {
      socialConnectPage = new SocialConnectPage(page);
      await page.context().clearCookies();
      await page.goto('https://demo.spikerz.com/', { timeout: 60000 });
    } catch (error: unknown) {
      console.error('Error during beforeEach setup:', error);
      if (error instanceof Error) {
        throw new Error(`BeforeEach failed: ${error.message}`);
      }
      throw new Error('BeforeEach failed with unknown error');
    }
  });

  test.only('should navigate to YouTube and verify image appears', async ({ page }: { page: Page }) => {
    test.slow();

    // Validate environment variables
    const googleUsername = process.env.GOOGLE_USERNAME;
    const googlePassword = process.env.GOOGLE_PASSWORD;
    const profilePictureUrl = process.env.PROFILE_PICTURE_URL;

    if (!googleUsername || !googlePassword) {
      throw new Error('Google credentials not set in environment variables');
    }
    if (!profilePictureUrl) {
      throw new Error('PROFILE_PICTURE_URL not set in environment variables');
    }

    await socialConnectPage.navigateToYoutube();
    await socialConnectPage.clickYoutubeSubscribe();
    await loginToGoogle(page, googleUsername, googlePassword);
    

    // Assertions to confirm image displayed and channel id is correct
    const confirmDetailsHeader = socialConnectPage.getConfirmDetailsHeader();
    await expect(confirmDetailsHeader).toBeVisible({ timeout: 15000 });

    const profilePicture = socialConnectPage.getProfilePicture();
    await expect(profilePicture).toHaveAttribute('src', profilePictureUrl);

    const channelIdText = socialConnectPage.getChannelIdText();
    await expect(channelIdText).toBeVisible();
  });
});