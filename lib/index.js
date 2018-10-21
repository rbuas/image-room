const readPicInfo = require('./info/readPicInfo');
const savePicInfo = require('./info/savePicInfo');
const generatePicInfo = require('./info/generatePicInfo');
const syncPicTags = require('./info/syncPicTags');
const { trace, setTracer } = require('./trace/trace');

module.exports = {
  readPicInfo,
  savePicInfo,
  generatePicInfo,
  syncPicTags,
  trace,
  setTracer,
};
