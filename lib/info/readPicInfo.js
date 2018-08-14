const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');
const path = require('path');
const pick = require('lodash.pick');
const fs = require('fs');

const { infoFilter } = require('../settings');

function filterInfo(info, filter) {
  if (!info || !filter || !filter.length) {
    return info;
  }

  return pick(info, infoFilter);
}

function fixImageInfo(info) {
  const {
    ImageSize: imageSize,
    ImageWidth: imageWidth,
    ImageHeight: imageHeight,
    ObjectName: objectName,
    Title: title,
    Subject: subject,
    Keywords: readedKeywords,
  } = info;

  const [imageSizeWidth, imageSizeHeight] = imageSize.split('x');
  const width = imageWidth || imageSizeWidth;
  const height = imageHeight || imageSizeHeight;
  const orientation = width > height ? 'Horizontal' : 'Vertical';
  const finalTitle = title || objectName || '';
  const keywords = subject || readedKeywords;

  return {
    ...info,
    ImageWidth: width,
    ImageHeight: height,
    Orientation: orientation,
    Title: finalTitle,
    Keywords: keywords,
  };
}

function readFileInfo(filename) {
  const extension = path.extname(filename);
  const filetype = extension.replace('.', '');
  const basename = path.basename(filename, extension);
  const filepath = path.dirname(filename);

  return {
    Extension: extension,
    Basename: basename,
    Filetype: filetype,
    Filepath: filepath,
  };
}

async function readPicInfoSingle(ep, picFilename, filter) {
  try {
    const filename = path.normalize(picFilename);
    if (!fs.existsSync(picFilename)) {
      throw new Error(`Could not found the file ${picFilename}`);
    }

    const fileInfo = readFileInfo(picFilename);

    const { data, error } = await ep.readMetadata(filename, ['-File:all']);
    if (error) {
      throw error;
    }

    const fixedInfo = fixImageInfo({ ...data[0], ...fileInfo });

    const info = filterInfo(fixedInfo, filter);

    return info;
  } catch (error) {
    console.log('error', error);
    return { error };
  }
}

async function readPicInfo(picFilename, filter = infoFilter) {
  try {
    const ep = new exiftool.ExiftoolProcess(exiftoolBin);
    const pid = await ep.open();
    console.log(`Started exiftool process ${pid}`);

    let info;
    if (Array.isArray(picFilename)) {
      info = picFilename.map((filename) => readPicInfoSingle(ep, filename, filter));
    } else {
      info = readPicInfoSingle(ep, picFilename, filter);
    }

    await ep.close();
    console.log(`Closed exiftool ${pid}`);

    return info;
  } catch (error) {
    console.log('error', error);
    return { error };
  }
}

module.exports = readPicInfo;
