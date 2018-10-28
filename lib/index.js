const readPicInfo = require('./info/readPicInfo');
const savePicInfo = require('./info/savePicInfo');
const generatePicInfo = require('./info/generatePicInfo');
const syncPicTags = require('./info/syncPicTags');
const { trace } = require('./trace');
const { resizeImage, exportPicVersion } = require('./image/exportPicVersion');
const {
  buildWatermarkCommand,
  stumpWatermark,
  stumpMultipleWatermarks,
} = require('./image/stumpWatermark');
const PicPack = require('./pack/PicPack');

module.exports = {
  readPicInfo,
  savePicInfo,
  generatePicInfo,
  syncPicTags,
  trace,
  resizeImage,
  exportPicVersion,
  buildWatermarkCommand,
  stumpWatermark,
  stumpMultipleWatermarks,
  PicPack,
};
