import { Page, Locator } from '@playwright/test';

export class SocialConnectPage {
  private readonly page: Page;
  
  // Locators
  private readonly youtubeCard: Locator;
  private readonly youtubeSubscribeButton: Locator;
  private readonly confirmDetailsHeader: Locator;
  private readonly profilePicture: Locator;
  private readonly channelIdText: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.youtubeCard = page.locator(':nth-child(4) > .ant-card-body');
    this.youtubeSubscribeButton = page.locator('.google-and-youtube-login-container > div > app-button > .ant-btn');
    this.confirmDetailsHeader = page.locator('h5:has-text("Confirm details")');
    this.profilePicture = page.locator('nz-card img');
    
    const channelId = process.env.TARGET_YOUTUBE_CHANNEL_ID;
    if (!channelId) {
      throw new Error('TARGET_YOUTUBE_CHANNEL_ID environment variable is not set');
    }
    this.channelIdText = page.locator(`text=${channelId}`);
  }

  // Navigates to the Social Connect page and clicks on the YouTube card
  async navigateToYoutube(): Promise<void> {
    await this.page.goto('/social-connect/');
    await this.youtubeCard.click();
  }

  // Clicks on the YouTube subscribe button to initiate login/authentication
  async clickYoutubeSubscribeButton(): Promise<void> {
    await this.youtubeSubscribeButton.click();
  }

   // Confirm YouTube subscribe button 
  async clickYoutubeSubscribe(): Promise<void> {
    await this.clickYoutubeSubscribeButton();
  }

  // Returns the locator for the confirmation details header
  getConfirmDetailsHeader(): Locator {
    return this.confirmDetailsHeader;
  }

  // Returns the locator for the profile picture
  getProfilePicture(): Locator {
    return this.profilePicture;
  }

  // Returns the locator for the channel ID text
  getChannelIdText(): Locator {
    return this.channelIdText;
  }
}