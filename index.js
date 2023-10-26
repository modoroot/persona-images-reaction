const { chromium } = require('playwright');
const { loginToTwitter, composeTweetWithImage, closeBrowser } = require('./functions/twitterUtils.js');
require('dotenv').config();

const USERNAME = process.env.TWITTER_USERNAME;
const PASSWORD = process.env.TWITTER_PASSWORD;
const TWEET_TEXT = "epic test";
const IMAGE_PATH = "images/portraits/Goro-shock.webp";


(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://twitter.com/i/flow/login');
    await loginToTwitter(page, USERNAME, PASSWORD);
    await composeTweetWithImage(page, TWEET_TEXT, IMAGE_PATH);
  } finally {
    await closeBrowser(browser);
  }
})();