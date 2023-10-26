// @ts-check
const { test, expect } = require('@playwright/test');

const { chromium } = require('playwright');
require('dotenv').config();

const USERNAME = process.env.TWITTER_USERNAME;
const PASSWORD = process.env.TWITTER_PASSWORD;
test('tweet',async() =>{
    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://twitter.com/i/flow/login');

    await page.fill("//input[@autocomplete='username']", USERNAME);
    await page.click("//span[contains(text(), 'Next')]");

    await page.fill("//input[@autocomplete='current-password']", PASSWORD);
    
    await page.click("//span[contains(text(), 'Log in')]");

    await page.click("//a[@aria-label='Post']");

    await page.fill("//div[@data-viewportview='true']//div[@class='DraftEditor-editorContainer']/div[@role='textbox']", "you are the dumbest cabbage");
    await page.click("//div[@data-testid='tweetButton']");

    await context.close();
    await browser.close();

});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });