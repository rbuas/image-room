const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');
const path = require('path');
const fs = require('fs');

const { trace } = require('../trace');

async function savePicInfoSingle(ep, picFilename, info) {
  try {
    const filename = path.normalize(picFilename);
    if (!fs.existsSync(picFilename)) {
      throw new Error(`Could not found the file ${picFilename}`);
    }

    const response = await ep.writeMetadata(filename, info, ['overwrite_original']);
    return response;
  } catch (error) {
    trace('error', error);
    return { error };
  }
}

async function savePicInfo(picFilename, info) {
  try {
    const ep = new exiftool.ExiftoolProcess(exiftoolBin);
    const pid = await ep.open();
    trace(`Started exiftool process ${pid}`);

    let response;
    if (Array.isArray(picFilename)) {
      const promises = picFilename.map((filename) => savePicInfoSingle(ep, filename, info));
      response = await Promise.all(promises);
    } else {
      response = await savePicInfoSingle(ep, picFilename, info);
    }

    await ep.close();
    trace(`Closed exiftool ${pid}`);

    return response;
  } catch (error) {
    trace('error', error);
    return { error };
  }
}

module.exports = savePicInfo;
