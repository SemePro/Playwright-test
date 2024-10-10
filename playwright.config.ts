import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // Directory where your test files are located
  timeout: 30000,      // Timeout for each test case
  retries: 1,          // Number of retries on failure
  workers: 4,          // Number of parallel workers (adjust based on your system)
  fullyParallel: true, // Run all tests in parallel
  reporter: [['html', { open: 'never' }], ['list']], // Generate HTML and list reporters
  use: {
    baseURL: 'https://www.saucedemo.com', // Base URL for tests
    headless: false,                      // Run tests in headful mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,              // Ignore HTTPS errors
    actionTimeout: 10000,                 // Timeout for actions like click or type
    screenshot: 'only-on-failure',        // Capture screenshots on failure
    video: 'retry-with-video',            // Record video on retry
    trace: 'on-first-retry',              // Capture trace on retry for debugging
    contextOptions: {
      permissions: ['geolocation'],       // Example: permissions for browser context
    },
  },

  // Configure projects for multiple browsers
  projects: [
    {
      name: 'Chromium',
      use: { 
        browserName: 'chromium', 
        channel: 'chrome', // Use Chrome stable
      },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],

  // Configuration for CI pipelines
  // This can be useful for CI/CD environments where headless mode is typically used
  ...(process.env.CI && {
    use: {
      headless: true,
      video: 'on',
      screenshot: 'on',
    },
  }),

});
