const path = require('path');
const fse = require('fs-extra');
const merge = require('lodash.merge');

const { eventStart, eventEnd } = require('../trace');
const { picPackSettings, FORMATS_DIR, PACKS_DIR } = require('./PicPack.settings');
const readCatalog = require('./PicPack.readCatalog');
const readCatalogInfo = require('./PicPack.readCatalogInfo');
const generateFormats = require('./PicPack.generateFormats');

class PicPack {
  constructor(settings) {
    this.settings = merge({}, picPackSettings, settings);
    const { sourcePath, outputPath } = this.settings;
    if (!sourcePath || !outputPath) {
      throw new Error('Missing required parameter to instantiate PicPack class.');
    }
  }

  buildCatalog(file = 'catalog') {
    eventStart('BUILD_CATALOG');

    const { outputPath } = this.settings;
    fse.ensureDirSync(outputPath);

    const catalogFile = path.resolve(outputPath, `${file}.json`);
    fse.writeJsonSync(catalogFile, this.catalogInfo, { spaces: 2 });

    eventEnd('BUILD_CATALOG', { file: this.catalogFile });
  }

  async readCatalog() {
    const { sourcePath, picTypes } = this.settings;

    this.catalog = readCatalog(sourcePath, picTypes);

    this.catalogInfo = await readCatalogInfo(this.catalog, sourcePath);
  }

  // it depends on readCatalog
  generateFormats() {
    const { outputPath, formats } = this.settings;

    const formatsOutput = path.resolve(outputPath, FORMATS_DIR);
    return generateFormats(formats, formatsOutput, this.catalogInfo);
  }

  // it dependeds on generateFormats
  generatePack() {
    const { packs } = this.settings;

    const generated = this.generateFormats();
    if (!generated) {
      return;
    }

    console.log('TODO: pack from FORMATS_PATH into PACKS_DIR', packs, PACKS_DIR);
    // TODO: export each pack in packs
    // TODO:    filter images in pack
    // TODO:    copy replics from FORMATS_PATH into PACKS_DIR
  }
}

module.exports = PicPack;
