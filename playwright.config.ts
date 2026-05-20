import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'src/scenarios',

  timeout: 30000,

  retries: 1,

  use: {
    trace: 'retain-on-failure',

    locale: 'pt-BR',

    headless: true,

    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

    viewport: { width: 1280, height: 720 },

    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',

    video: 'off'
  },

  expect: {
    timeout: 15000
  },

  reporter: [
    [
      'html',
      {
        outputFolder: 'artifacts/report',
        open: 'never'
      }
    ]
  ]
};

export default config;
