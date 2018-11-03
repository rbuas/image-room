const imageRoom = require('./cli/imageRoom');
const readPicInfo = require('./info/readPicInfo');
const savePicInfo = require('./info/savePicInfo');
const generatePicInfo = require('./info/generatePicInfo');
const syncPicTags = require('./info/syncPicTags');
const { resizeImage, exportPicVersion } = require('./image/exportPicVersion');
const {
  buildWatermarkCommand,
  stumpWatermark,
  stumpMultipleWatermarks,
} = require('./image/stumpWatermark');
const PicPack = require('./pack/PicPack');

module.exports = {
  imageRoom,
  readPicInfo,
  savePicInfo,
  generatePicInfo,
  syncPicTags,
  resizeImage,
  exportPicVersion,
  buildWatermarkCommand,
  stumpWatermark,
  stumpMultipleWatermarks,
  PicPack,
};
