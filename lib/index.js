const readPicInfo = require('./info/readPicInfo');
const savePicInfo = require('./info/savePicInfo');
const generatePicInfo = require('./info/generatePicInfo');
const syncPicTags = require('./info/syncPicTags');
const { trace, setTracer } = require('./trace');
const { resizeImage, exportPicVersion } = require('./image/exportPicVersion');
const {
  buildWatermarkCommand,
  stumpWatermark,
  stumpMultipleWatermarks,
} = require('./image/stumpWatermark');

module.exports = {
  readPicInfo,
  savePicInfo,
  generatePicInfo,
  syncPicTags,
  trace,
  setTracer,
  resizeImage,
  exportPicVersion,
  buildWatermarkCommand,
  stumpWatermark,
  stumpMultipleWatermarks,
};
