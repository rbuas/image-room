const path = require('path');

const { trace, eventStart, eventEnd } = require('../trace');

const { filterCriteria } = require('./PicPack.filterCriteria');
const generateVersions = require('./PicPack.generateVersions');

async function generateFormats(formatsPath, formats, catalogInfo) {
  eventStart('GENERATE_FORMATS');

  if (!formatsPath || !formats || !catalogInfo) {
    const error = 'Missing required parameters to generateFormats';
    eventEnd('GENERATE_FORMATS', { error });
    return [];
  }

  if (!formats.length) {
    const warning = 'There is no defined format';
    eventEnd('GENERATE_FORMATS', { warning });
    return [];
  }

  let generated = [];
  for (const format of formats) {
    const { name, criteria, ...config } = format;
    eventStart('GENERATE_FORMAT', { name, criteria, config });

    const pics = filterCriteria(catalogInfo, criteria);

    const formatPath = path.resolve(formatsPath, name);
    const formatGenerated = await generateVersions(pics, formatPath, config);
    generated = [...generated, ...formatGenerated];

    eventEnd('GENERATE_FORMAT', { name });
  }

  eventEnd('GENERATE_FORMATS');
  return generated;
}

module.exports = generateFormats;
