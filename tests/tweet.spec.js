// @ts-check
const { test } = require('@playwright/test'); 
const { chromium } = require('playwright');
const { loginToTwitter, composeTweetWithImage, closeBrowser } = require('../functions/twitterUtils.js');

test('tweet', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://twitter.com/i/flow/login');
    await loginToTwitter(page);
    await composeTweetWithImage(page);
  } finally {
    await closeBrowser(browser);
  }
})
