const { chromium } = require('playwright');
require('dotenv').config();

const USERNAME = process.env.TWITTER_USERNAME;
const PASSWORD = process.env.TWITTER_PASSWORD;
(async() =>{
    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://twitter.com/i/flow/login');

    await page.fill("//input[@autocomplete='username']", USERNAME);
    await page.click("//span[contains(text(), 'Siguiente')]");

    await page.fill("//input[@autocomplete='current-password']", PASSWORD);
    
    await page.click("//span[contains(text(), 'Iniciar sesión')]");

    await page.click("//a[@aria-label='Post']");

    await page.fill("//div[@data-viewportview='true']//div[@class='DraftEditor-editorContainer']/div[@role='textbox']", "you are the dumbest cabbage");
    // await page.click("//div[@data-testid='tweetButton']");

    await context.close();
    await browser.close();

})();