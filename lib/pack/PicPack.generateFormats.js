const path = require('path');
const fse = require('fs-extra');

const { trace, eventStart, eventEnd } = require('../trace');
const { exportPicVersion } = require('../image/exportPicVersion');

const { filterCriteria } = require('./PicPack.matchCriteria');

function getPicPath(pic) {
  return pic && pic.SourceFile; // TODO: get the good path to it
}

function buildVersionFileName(picPath, suffix) {
  if (!picPath || !suffix) {
    return picPath;
  }

  const dirname = path.dirname(picPath);
  const extension = path.extname(picPath);
  const basename = path.basename(picPath);
  return path.resolve(dirname, `${basename}.${suffix}.${extension}`);
}

async function generateVersions(pics, formatPath, config) {
  fse.ensureDirSync(formatPath);

  const { suffix, ...versionConfig } = config;
  for (const pic of pics) {
    const picPath = getPicPath(pic);
    const versionPath = buildVersionFileName(picPath, suffix);
    if (!picPath || !versionPath) {
      trace.error('Missing pic path or version path in generateVersions');
    } else {
      trace.info(`Exporting pic version ${versionPath}`);
      await exportPicVersion(picPath, versionPath, versionConfig);
    }
  }
}

async function generateFormats(formatsPath, formats, catalogInfo) {
  eventStart('GENERATE_FORMATS');

  if (!formatsPath || !formats) {
    const error = 'Missing required parameters to generateFormats';
    eventEnd('GENERATE_FORMATS', { error });
    return false;
  }

  if (!formats.length) {
    const warning = 'There is no defined format';
    eventEnd('GENERATE_FORMATS', { warning });
    return false;
  }

  for (const format of formats) {
    const { name, criteria, ...config } = format;
    eventStart('GENERATE_FORMAT', { name, criteria, config });

    const pics = filterCriteria(catalogInfo, criteria);

    const formatPath = path.resolve(formatsPath, name);
    await generateVersions(pics, formatPath, config);

    eventEnd('GENERATE_FORMAT', { name });
  }

  eventEnd('GENERATE_FORMATS');
  return true;
}

module.exports = generateFormats;
