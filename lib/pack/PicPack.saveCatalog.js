const fse = require('fs-extra');
const { eventStart, eventEnd } = require('../trace');

function saveCatalog() {
  eventStart('SAVE_CATALOG');

  fse.ensureFileSync(this.catalogFile);

  fse.writeJsonSync(this.catalogFile, this.catalogInfo, { spaces: 2 });

  eventEnd('SAVE_CATALOG', { file: this.catalogFile });
}

module.exports = saveCatalog;
