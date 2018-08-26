/* eslint-disable no-console */

const { readPicInfo } = require('..');
const { startCommand, endCommand } = require('./helpers');

async function readInfo(filename = '') {
  const commandName = `readInfo:${filename}`;

  try {
    startCommand(commandName);

    const info = await readPicInfo(filename);
    console.log(info);
  } catch (error) {
    console.log('ERROR : ', error);
  }

  endCommand(commandName);
}

readInfo(process.argv[2]);
