/* eslint-disable no-console */

const { generatePicInfo } = require('..');
const { startCommand, endCommand } = require('./helpers');

async function generateInfo(filename = '') {
  const commandName = `generateInfo:${filename}`;

  try {
    startCommand(commandName);

    const info = await generatePicInfo(filename);
    console.log(info);
  } catch (error) {
    console.log('ERROR : ', error);
  }

  endCommand(commandName);
}

generateInfo(process.argv[2]);
