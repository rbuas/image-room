const fse = require('fs-extra');
const { eventStart, eventEnd } = require('../trace');

function saveCatalog(catalogFile, catalogInfo) {
  eventStart('SAVE_CATALOG');

  fse.ensureFileSync(catalogFile);

  fse.writeJsonSync(catalogFile, catalogInfo, { spaces: 2 });

  eventEnd('SAVE_CATALOG', { catalogFile });
}

module.exports = saveCatalog;
