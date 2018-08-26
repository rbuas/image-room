const jsonfile = require('jsonfile');
const path = require('path');

const readPicInfo = require('./readPicInfo');
const { trace } = require('../trace/trace');

async function generatePicInfo(picFilename) {
  try {
    const info = await readPicInfo(picFilename);
    if (!info || info.error) {
      throw new Error(`Could not read info from file ${picFilename}`);
    }
    trace('info', info);

    const { Basename: basename, Filepath: filepath } = info;
    const infoFilename = path.normalize(`${filepath}/${basename}.info`);
    jsonfile.writeFileSync(infoFilename, info, { spaces: 2 });

    return { info, filename: infoFilename };
  } catch (e) {
    throw e;
  }
}

module.exports = generatePicInfo;
