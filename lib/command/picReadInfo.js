/* eslint-disable no-console */

const { readPicInfo } = require('..');
const { startCommand, endCommand } = require('./helpers');

async function picReadInfo(filename = '') {
  const commandName = `picReadInfo:${filename}`;

  try {
    startCommand(commandName);

    const info = await readPicInfo(filename);
    console.log(info);
  } catch (error) {
    console.log('ERROR : ', error);
  }

  endCommand(commandName);
}

picReadInfo(process.argv[2]);
