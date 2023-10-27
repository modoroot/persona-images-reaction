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
        // await page.getByRole('button', { name: 'Siguiente' }).click();
    // else
        await page.getByRole('button', { name: 'Next' }).click();
        console.log('next clicked')

    await page.fill('input[autocomplete="current-password"]', PASSWORD);
    console.log('password clicked')
    await page.getByTestId('LoginForm_Login_Button').click();
    console.log('login clicked')
    
}



async function composeTweetWithImage(page) {
    const finalWord = await createImage()
    console.log('image created')
    await page.fill('div[aria-label="Post text"]', finalWord);
    console.log('text typed')
    await page.getByRole('button', { name: 'Add photos or video' }).click();
    console.log('photo added')
    const inputFile = await page.locator('input[type="file"]');
    await inputFile.setInputFiles('reaction.jpg');
    await page.getByTestId('tweetButtonInline').click();
    console.log('Finished: '+new Date())
}

async function closeBrowser(browser) {
    await browser.close();
}

module.exports = { loginToTwitter, composeTweetWithImage, closeBrowser };