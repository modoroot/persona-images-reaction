const { createImage } = require('./imgReactionGenerator');

require('dotenv').config();

const USERNAME = process.env.TWITTER_USERNAME;
const PASSWORD = process.env.TWITTER_PASSWORD;

async function loginToTwitter(page) {

    await page.fill('input[autocomplete="username"]', USERNAME);
    const lang = await page.evaluate(() => {
        return navigator.language || navigator.userLanguage;
    });
    // por alguna razón chromium usando node está en español (testeando no XD)
    // (supongo que porque nodejs recoge el lang del sistema)
    // if (lang == 'es-ES')
    //     await page.getByRole('button', { name: 'Siguiente' }).click();
    // else
        await page.getByRole('button', { name: 'Next' }).click();
        console.log('next clicked')
    // await page.getByTestId('ocfEnterTextTextInput').click();
    // await page.getByTestId('ocfEnterTextTextInput').fill('modoroot@protonmail.com');
    // await page.getByTestId('ocfEnterTextNextButton').click();
    await page.fill('input[autocomplete="current-password"]', PASSWORD);
    await page.getByTestId('LoginForm_Login_Button').click();
    
}



async function composeTweetWithImage(page) {
    const finalWord = await createImage()
    await page.fill('div[aria-label="Post text"]', finalWord);
    await page.getByRole('button', { name: 'Add photos or video' }).click();
    const inputFile = await page.locator('input[type="file"]');
    await inputFile.setInputFiles('reaction.jpg');
    await page.getByTestId('tweetButtonInline').click();
    await page.waitForTimeout(1000);
}

async function closeBrowser(browser) {
    await browser.close();
}

module.exports = { loginToTwitter, composeTweetWithImage, closeBrowser };