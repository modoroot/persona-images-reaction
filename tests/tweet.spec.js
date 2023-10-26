// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
require('dotenv').config();

const USERNAME = process.env.TWITTER_USERNAME;
const PASSWORD = process.env.TWITTER_PASSWORD;

test ('tweet persona reaction', async() => {
  const browser = await chromium.launch({
    headless: false,
    slowMo:500
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://twitter.com/i/flow/login');

  await page.fill("//input[@autocomplete='username']", USERNAME);

  await page.locator("//span[contains(text(), 'Next')]").click();

  await page.fill("//input[@autocomplete='current-password']", PASSWORD);

  await page.locator("//span[contains(text(), 'Log in')]").click();

  await page.fill("//div[@aria-label='Post text']", "epic test");

  await page.getByRole('button', { name: 'Add photos or video' }).click();

  const inputFile = await page.locator('input[type="file"]')

  await inputFile.setInputFiles('images/portraits/Goro-shock.webp')

  await page.getByTestId('tweetButtonInline').click();
  await page.waitForTimeout(1000);

  await context.close();
  await browser.close();
});


