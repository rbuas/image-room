const path = require('path');
const merge = require('lodash.merge');
const fse = require('fs-extra');

const { picPackSettings, FORMATS_DIR, PACKS_DIR } = require('./PicPack.settings');
const readCatalog = require('./PicPack.readCatalog');
const saveCatalog = require('./PicPack.saveCatalog');
const readCatalogInfo = require('./PicPack.readCatalogInfo');
const generateFormats = require('./PicPack.generateFormats');

class PicPack {
  constructor(settings) {
    this.settings = merge({}, picPackSettings, settings);
    const { sourcePath, outputPath, catalogFile } = this.settings;
    if (!sourcePath || !outputPath) {
      throw new Error('Missing required parameter to instantiate PicPack class.');
    }

    this.catalogFile = path.resolve(outputPath, `${catalogFile}`);
  }

  async readCatalog() {
    const { sourcePath, picTypes } = this.settings;

    this.catalog = readCatalog(sourcePath, picTypes);

    this.catalogInfo = await readCatalogInfo(this.catalog, sourcePath);

    saveCatalog(this.catalogFile, this.catalogInfo);
  }

  loadCatalog() {
    if (this.catalog) {
      return;
    }

    this.catalog = fse.readJSONSync(this.catalogFile);
  }

  generateFormats() {
    const { outputPath, formats } = this.settings;

    this.loadCatalog();

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
