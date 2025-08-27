import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Validate environment variables
const username: string | undefined = process.env.USERNAME;
const password: string | undefined = process.env.PASSWORD;
const baseURL: string | undefined = process.env.BASE_URL;

if (!username || !password) {
  throw new Error('USERNAME and PASSWORD must be defined in the .env file.');
}

if (!baseURL) {
  throw new Error('BASE_URL must be defined in the .env file.');
}

const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseURL,
    headless: true,
    httpCredentials: {
      username: username,
      password: password,
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    /* Capture screenshot on test failure */
    screenshot: 'only-on-failure',
    /* Browser launch arguments */
    launchOptions: {
      ignoreDefaultArgs: [
        '--disable-component-extensions-with-background-pages',
      ],
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-infobars',
        '--disable-extensions',
        '--start-maximized',
        '--window-size=1280,720',
        '--allow-running-insecure-content', 
      ],
    },
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  timeout: 60000,  // Global timeout of 60 seconds
};

export default defineConfig(config);