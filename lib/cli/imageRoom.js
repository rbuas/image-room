const { generatePicInfo, readPicInfo } = require('..');
const { trace } = require('../trace');

async function imageRoom({ readinfo, geninfo, help, pack }) {
  if (!readinfo && !geninfo) {
    help();
    return;
  }

  if (readinfo) {
    trace.highlight(`readInfo:${readinfo}`);
    const info = await readPicInfo(readinfo);
    trace.info(info);
    return;
  }

  if (geninfo) {
    trace.highlight(`generateInfo:${geninfo}`);
    const info = await generatePicInfo(geninfo);
    trace.info(info);
    return;
  }

  if (pack) {
    // TODO: process pack options
  }
}

module.exports = imageRoom;
