"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '.env') });
// Validate environment variables
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const baseURL = process.env.BASE_URL;
if (!username || !password) {
    throw new Error('USERNAME and PASSWORD must be defined in the .env file.');
}
if (!baseURL) {
    throw new Error('BASE_URL must be defined in the .env file.');
}
const config = {
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
            use: { ...test_1.devices['Desktop Chrome'] },
        },
    ],
};
exports.default = (0, test_1.defineConfig)(config);
//# sourceMappingURL=playwright.config.js.map