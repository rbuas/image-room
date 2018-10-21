const { generatePicInfo, readPicInfo } = require('../lib');
const { logSection, logInfo } = require('./log');

async function imageRoom({ readinfo, geninfo, help, pack }) {
  if (!readinfo && !geninfo) {
    help();
    return;
  }

  if (readinfo) {
    logSection(`readInfo:${readinfo}`);
    const info = await readPicInfo(readinfo);
    logInfo(info);
    return;
  }

  if (geninfo) {
    logSection(`generateInfo:${geninfo}`);
    const info = await generatePicInfo(geninfo);
    logInfo(info);
    return;
  }

  if (pack) {
    // TODO: process pack options
  }
}

module.exports = imageRoom;
