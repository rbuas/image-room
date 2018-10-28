const path = require('path');
const fse = require('fs-extra');

const { eventStart, eventEnd } = require('../trace');

function readDirFiles(dirPath, extensions) {
  return fse
    .readdirSync(dirPath)
    .filter((file) => {
      const stats = fse.statSync(path.join(dirPath, file));
      if (!stats.isFile()) {
        return false;
      }
      const fileExtension = path.extname(file).replace('.', '');
      return !extensions || extensions.includes(fileExtension);
    })
    .sort();
}

function readCatalog(sourcePath, picTypes) {
  const source = path.normalize(sourcePath);
  eventStart('READ_CATALOG', `source: ${source}`);

  if (!fse.existsSync(source)) {
    const error = `Can not read source ${source}`;
    eventEnd('READ_CATALOG', { error });
    return [];
  }

  const files = readDirFiles(source, picTypes);

  eventEnd('READ_CATALOG', files);
  return files;
}

module.exports = readCatalog;
