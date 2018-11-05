const path = require('path');
const merge = require('lodash.merge');
const fse = require('fs-extra');

const { picPackSettings, FORMATS_DIR, PACKS_DIR } = require('./PicPack.settings');
const readCatalog = require('./PicPack.readCatalog');
const saveCatalog = require('./PicPack.saveCatalog');
const readCatalogInfo = require('./PicPack.readCatalogInfo');
const generateFormats = require('./PicPack.generateFormats');
const generatePacks = require('./PicPack.generatePacks');

class PicPack {
  constructor(settings) {
    this.settings = merge({}, picPackSettings, settings);
    const { sourcePath, outputPath, catalogFile } = this.settings;
    if (!sourcePath || !outputPath) {
      throw new Error('Missing required parameter to instantiate PicPack class.');
    }

    this.settings.formats = settings.formats || picPackSettings.formats;
    this.catalogFile = path.resolve(outputPath, `${catalogFile}`);
  }

  async readCatalog() {
    const { sourcePath, picTypes } = this.settings;

    this.catalog = readCatalog(sourcePath, picTypes);

    this.catalogInfo = await readCatalogInfo(this.catalog, sourcePath);

    saveCatalog(this.catalogFile, this.catalogInfo);
  }

  loadCatalog() {
    if (this.catalog) return;

    this.catalog = fse.readJSONSync(this.catalogFile);
  }

  generateFormats() {
    const { outputPath, formats } = this.settings;

    this.loadCatalog();

    const formatsOutput = path.resolve(outputPath, FORMATS_DIR);
    return generateFormats(formatsOutput, formats, this.catalogInfo);
  }

  // it dependeds on generateFormats
  async generatePacks() {
    const generated = await this.generateFormats();
    if (!generated) {
      return;
    }

    const { packs, formats, outputPath } = this.settings;
    const formatsOutput = path.resolve(outputPath, FORMATS_DIR);
    const packsOutput = path.resolve(outputPath, PACKS_DIR);

    return generatePacks(packsOutput, packs, formatsOutput, formats, this.catalogInfo);
  }
}

module.exports = PicPack;
