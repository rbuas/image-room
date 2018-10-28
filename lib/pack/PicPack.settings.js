const format = require('./PicPack.format');

const FORMATS_DIR = 'formats';
const PACKS_DIR = 'packs';

const picPackSettings = {
  sourcePath: null,
  outputPath: null,
  picTypes: ['jpg'],
  packs: [],
  formats: [
    format({ name: 'hd-best', criteria: { Rating: [4, 5] } }),
    format({ name: 'hd', criteria: { Rating: [3, 2] } }),
    format({ name: 'web-best', width: 2048, criteria: { Rating: [4, 5] } }),
    format({ name: 'web', width: 2048, criteria: { Rating: [3, 2] } }),
  ],
};

module.exports = {
  FORMATS_DIR,
  PACKS_DIR,
  picPackSettings,
};
