"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const SocialConnectPage_1 = require("../pages/SocialConnectPage");
const authUtils_1 = require("../utils/authUtils");
test_1.test.describe('Social Connect Tests', () => {
    let socialConnectPage;
    test_1.test.beforeEach(async ({ page }) => {
        try {
            socialConnectPage = new SocialConnectPage_1.SocialConnectPage(page);
            await page.context().clearCookies();
            await page.goto('/');
        }
        catch (error) {
            console.error('Error during beforeEach setup:', error);
            if (error instanceof Error) {
                throw new Error(`BeforeEach failed: ${error.message}`);
            }
            throw new Error('BeforeEach failed with unknown error');
        }
    });
    test_1.test.only('should navigate to YouTube and verify image appears', async ({ page }) => {
        test_1.test.slow();
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
        const popup = await socialConnectPage.handlePopup();
        await (0, authUtils_1.loginToGoogle)(popup, googleUsername, googlePassword);
        await page.bringToFront();
        // Assertions to confirm image displayed and channel id is correct
        const confirmDetailsHeader = socialConnectPage.getConfirmDetailsHeader();
        await (0, test_1.expect)(confirmDetailsHeader).toBeVisible();
        const profilePicture = socialConnectPage.getProfilePicture();
        await (0, test_1.expect)(profilePicture).toHaveAttribute('src', profilePictureUrl);
        const channelIdText = socialConnectPage.getChannelIdText();
        await (0, test_1.expect)(channelIdText).toBeVisible();
    });
});
//# sourceMappingURL=socialConnect.spec.js.map