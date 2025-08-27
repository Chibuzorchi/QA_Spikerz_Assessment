
# Social Connect Test Automation

## Overview
This project contains automated tests for the Social Connect feature using Playwright. The tests validate social media integrations, such as YouTube authentication and profile verification.

The architecture of this project is designed to ensure **maintainability**, **scalability**, and **readability**. Key architectural choices include:

1. **Page Object Model (POM)**:
   - The project uses the Page Object Model pattern to encapsulate interactions with specific pages or components (e.g., the Google login page or the YouTube connection flow).
   - This approach centralizes locators and actions, making tests easier to maintain and reducing code duplication.

2. **Environment Variables**:
   - Sensitive data (e.g., credentials, URLs) is stored in a `.env` file and accessed via environment variables.
   - This ensures security and flexibility across different environments (e.g., local, CI/CD).

3. **Modular Design**:
   - The project is organized into modular directories:
     - `tests/`: Contains test files.
     - `pages/`: Contains Page Object Model classes for interacting with specific pages or components.
     - `utils/`: Contains utility functions (e.g., authentication helpers).
   - This modular structure makes it easy to add new tests or extend functionality.

4. **Error Handling and Debugging**:
   - Playwright’s built-in features (e.g., screenshots, tracing, and retries) are leveraged to simplify debugging and improve test reliability.
   - Tests are designed to handle errors gracefully, with clear error messages and fallback mechanisms.

5. **Continuous Integration (CI)**:
   - The project includes a GitHub Actions workflow to run tests automatically on every push or pull request.
   - Environment variables are securely managed using GitHub Secrets.

6. **Scalability**:
   - The architecture is designed to support additional test cases and integrations (e.g., other social media platforms) without significant refactoring.

---

## Prerequisites
Ensure you have the following installed before running the tests:

- Node.js (>= 16.x)
- npm or yarn
- Playwright (latest version)
- Google Chrome or Chromium-based browser
- docker

---

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/repo-url
   cd your-test-folder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```
4. Create a `.env` file in the root directory and add the required environment variables (see below).

---

## Environment Variables

Create a `.env` file with the following variables:

```env
BASE_URL=spikerz url
GOOGLE_USERNAME=your-google-email
GOOGLE_PASSWORD=your-google-password
PROFILE_PICTURE_URL=https://static-assets.spikerz.com/demo/profile-nina.png
TARGET_YOUTUBE_CHANNEL_ID=@dina_bakery_shop
USERNAME=username
PASSWORD=password
```
> **Note:** Use secure methods to store sensitive credentials (e.g., environment secrets in CI/CD pipelines).

---

## Running Tests

Run all tests:
```sh
npx playwright test
```

Run a specific test file:
```sh
npx playwright test tests/socialConnect.spec.ts
```

Run tests in headed mode:
```sh
npx playwright test --headed
```

Run tests with HTML report:
```sh
npx playwright test --reporter=html
```

## Docker Execution

# Build image
```sh
npm run docker-build
```

# Run container
```sh
npm run docker-test
```

# Trigger tests via API
```sh
curl -X POST http://localhost:3000/run-automation
```

# Get results
```sh
npm run docker-results
```

# Stop container
```sh
npm run docker-stop
```
---

## Continuous Integration

This project includes a GitHub Actions workflow to automatically run Playwright tests on every push request to the `master` branch. The workflow is defined in `.github/workflows/playwright-tests.yml` and includes environment variables for authentication and test execution.

### GitHub Actions Workflow

Ensure your repository’s GitHub Actions secrets contain the following environment variables:

- `BASE_URL`
- `GOOGLE_USERNAME`
- `GOOGLE_PASSWORD`
- `PROFILE_PICTURE_URL`
- `TARGET_YOUTUBE_CHANNEL_ID`
- `USERNAME`
- `PASSWORD`

Example configuration in the workflow file:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
      env:
        BASE_URL: ${{ secrets.BASE_URL }}
        GOOGLE_USERNAME: ${{ secrets.GOOGLE_USERNAME }}
        GOOGLE_PASSWORD: ${{ secrets.GOOGLE_PASSWORD }}
        PROFILE_PICTURE_URL: ${{ secrets.PROFILE_PICTURE_URL }}
        TARGET_YOUTUBE_CHANNEL_ID: ${{ secrets.TARGET_YOUTUBE_CHANNEL_ID }}
        USERNAME: ${{ secrets.USERNAME }}
        PASSWORD: ${{ secrets.PASSWORD }}
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

---

## Test Structure

- `tests/` – Contains all test files.
- `pages/` – Page Object Model (POM) classes for better test maintainability.
- `utils/` – Utility functions, such as authentication helpers.
- `playwright.config.ts` – Playwright configuration file.

---

## Error Handling & Debugging

### Debugging with Screenshots
Playwright automatically captures screenshots on test failure. These screenshots are saved in the `test-results` directory and can be viewed in the HTML report.

To enable screenshots manually, use the `screenshot` option in the Playwright configuration:

```javascript
use: {
  screenshot: 'on',
}
```

### Using Trace Viewer
Playwright’s Trace Viewer provides a detailed timeline of test execution, including network requests, DOM snapshots, and more. To enable tracing, add the following to your Playwright configuration:

```javascript
use: {
  trace: 'on-first-retry',
}
```

Run tests with tracing enabled, and view the trace using:

```sh
npx playwright show-trace trace.zip
```

### Retry Mechanism
Playwright includes a built-in retry mechanism for flaky tests. You can configure the number of retries in the `playwright.config.js` file:

```javascript
export default {
  retries: 2, // Retry failed tests up to 2 times
};
```

### Debugging Tips
- Run tests with `DEBUG=pw:api npx playwright test` to see API calls and debug logs.
- Use `--headed` mode to run tests in a visible browser window.
- Use `--slowmo` to slow down test execution for better observation:

```sh
npx playwright test --slowmo 1000
```

---

## Security Considerations

- Avoid logging sensitive data.
- Use `.env` instead of hardcoding credentials.
- Implement secure authentication handling in CI/CD pipelines.

---

## Contribution Guidelines

- Follow Playwright best practices.
- Use descriptive commit messages.
- Run `npx playwright test` before submitting PRs.
- Document changes in the README or relevant test files.

For any issues, please create a GitHub issue or reach out to me at chinonsochibuzor2277@gmail.com.
```