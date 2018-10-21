const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const fse = require('fs-extra');

const { trace } = require('../trace');

const { stumpMultipleWatermarks } = require('./stumpWatermark');

function resizeImage(filename, destination, config = {}) {
  return new Promise((resolve, reject) => {
    try {
      const { width, quality = 100 } = config;

      const sharpfile = sharp(filename);
      if (width) {
        sharpfile.resize(width, width);
        sharpfile.max();
      }
      sharpfile.jpeg({ quality });
      sharpfile.withMetadata();
      sharpfile.toFile(destination, (err, info) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(info);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 * @param {string} file Source file path
 * @param {string} destination Output file path
 * @param {VersionConfig} config Version config object containing:
 * {
 *    width: int,
 *    quality: int,
 *    watermark: WatermarkConfig
 * }
 */
async function exportPicVersion(file, destination, config = {}) {
  try {
    const filename = path.normalize(file);
    if (!fs.existsSync(filename)) {
      throw new Error(`Could not found the file ${file}`);
    }

    fse.ensureDirSync(destination);

    await resizeImage(filename, destination, config);

    const { watermarks } = config;
    await stumpMultipleWatermarks(destination, watermarks);

    trace('info', `Exported file : ${file} (${destination})`);
  } catch (error) {
    const errorMessage = error && error.toString();
    trace('error', `Can not export file ${file}, error: ${errorMessage}`);
  }
}

module.exports = {
  exportPicVersion,
};
