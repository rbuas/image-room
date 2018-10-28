const path = require('path');

const readPicInfo = require('../info/readPicInfo');
const { eventStart, eventEnd } = require('../trace');

async function readCatalogInfo(catalog, sourcePath) {
  eventStart('READ_INFO');
  if (!catalog) {
    const warning = `Empty source path ${sourcePath}`;
    eventEnd('READ_INFO', { warning });
    return {};
  }

  const catalogInfo = {};
  for (const pic of catalog) {
    const pcFullname = path.resolve(sourcePath, pic);
    const info = await readPicInfo(pcFullname);
    catalogInfo[pic] = info;
  }

  eventEnd('READ_INFO', catalog);
  return catalogInfo;
}

module.exports = readCatalogInfo;
