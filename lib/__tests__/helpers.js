const path = require('path');
const takeRight = require('lodash.takeright');

const resourceDir = path.resolve(__dirname, 'resources');
const picsDir = path.resolve(__dirname, 'pics');
const resourceFile = (picName) => path.resolve(__dirname, 'resources', picName);
const picFile = (picName) => path.resolve(__dirname, 'pics', picName);

function getEssentialVersionFileName(file) {
  return takeRight(file.split('/'), 2).join('/');
}

module.exports = {
  resourceDir,
  picsDir,
  resourceFile,
  picFile,
  getEssentialVersionFileName,
  RBUAS20150310: picFile('RBUAS20150310-0052.jpg'),
  RBUAS20150310SYNC: picFile('RBUAS20150310-0052-sync.jpg'),
  RBUAS20160727: picFile('RBUAS20160727-0414-1.jpg'),
  RBUAS20161022: picFile('RBUAS20161022-0034.jpg'),
  RBUAS20180601DNG: picFile('RBUAS20180601-0025.dng'),
  RBUAS20180601FULL: picFile('RBUAS20180601-0025.full.jpg'),
  RBUAS20180601MOBILE: picFile('RBUAS20180601-0025.mobile.jpg'),
};
