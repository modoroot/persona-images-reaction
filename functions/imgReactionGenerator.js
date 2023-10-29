const Jimp = require('jimp');
const fs = require('fs');
const lodash = require('lodash');
const path = require('path');

async function getRandomWord() {
  return new Promise((resolve, reject) => {
    fs.readFile('res/words.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const words = data.split('\n').map(word => word.trim());
        const randomWord = lodash.sample(words);
        resolve(randomWord);
      }
    });
  });
}

async function loadRandomPortrait() {
  try {
    const directoryPath = 'images/portraits';
    const files = fs.readdirSync(directoryPath);

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomImageFile = files[randomIndex];

    const imagePath = path.join(directoryPath, randomImageFile);

    const loadedPortrait = await Jimp.read(imagePath);
    console.log('portrait: '+randomImageFile)
    return loadedPortrait;
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    throw error;
  }
}

async function createImage() {
  const width = 800;
  const height = 600;
  const bgColor = 0xFFFFFFFF;
  const image = await new Jimp(width, height, bgColor);
  const randomPortrait = await loadRandomPortrait();
  const loadedPortrait = await Jimp.read(randomPortrait);

  const imageWidth = width;
  const imageHeight = height - 70;
  loadedPortrait.resize(imageWidth, imageHeight);

  const x = (width - imageWidth) / 2;
  const y = 0;

  image.composite(loadedPortrait, x, y);

  const customFont = await Jimp.loadFont('fonts/o5TvTGMXghJLYA7zsZhIzp8n.ttf.fnt');

  const randomWord = await getRandomWord();
  const finalWord = randomWord.toUpperCase() + "!";
  
  const textX = width / 2 - Jimp.measureText(customFont, finalWord) / 2;
  const textY = height - 85;

  image.print(customFont, textX, textY, finalWord);

  await image.writeAsync('reaction.jpg');

  return finalWord;
}

module.exports = { createImage }
