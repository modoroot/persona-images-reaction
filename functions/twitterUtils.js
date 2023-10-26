require('dotenv').config();

async function loginToTwitter(page, USERNAME, PASSWORD) {

    await page.fill('input[autocomplete="username"]', USERNAME);
    const lang = await page.evaluate(() => {
        return navigator.language || navigator.userLanguage;
    });
    if (lang == 'es-ES')
        await page.getByRole('button', { name: 'Siguiente' }).click();
    else
        await page.getByRole('button', { name: 'Next' }).click();

    await page.fill('input[autocomplete="current-password"]', PASSWORD);
    await page.getByTestId('LoginForm_Login_Button').click();
}

async function composeTweetWithImage(page, TWEET_TEXT, IMAGE_PATH) {
    await page.fill('div[aria-label="Post text"]', TWEET_TEXT);
    await page.getByRole('button', { name: 'Add photos or video' }).click();
    const inputFile = await page.locator('input[type="file"]');
    await inputFile.setInputFiles(IMAGE_PATH);
    await page.getByTestId('tweetButtonInline').click();
    await page.waitForTimeout(1000);
}

async function closeBrowser(browser) {
    await browser.close();
}

module.exports = { loginToTwitter, composeTweetWithImage, closeBrowser };