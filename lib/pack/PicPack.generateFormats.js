const path = require('path');
const fse = require('fs-extra');

const { trace, eventStart, eventEnd } = require('../trace');
const { exportPicVersion } = require('../image/exportPicVersion');

const { filterCriteria } = require('./PicPack.matchCriteria');

function getPicPath(pic) {
  return pic && pic.SourceFile; // TODO: get the good path to it
}

function buildVersionFileName(picPath, suffix, destPath) {
  if (!picPath || !suffix) {
    return picPath;
  }

  const { name, ext, dir } = path.parse(picPath);
  return path.resolve(destPath || dir, `${name}.${suffix}${ext}`);
}

async function generateVersions(pics, formatPath, config) {
  if (!pics) {
    return [];
  }

  eventStart('GENERATE_VERSIONS');
  fse.ensureDirSync(formatPath);

  const { suffix, ...versionConfig } = config;

  const generated = [];
  const picNames = Object.keys(pics);
  for (const picName of picNames) {
    const pic = pics[picName];
    const picPath = getPicPath(pic);
    const versionPath = buildVersionFileName(picPath, suffix, formatPath);

    if (!picPath || !versionPath) {
      trace.error('Missing pic path or version path in generateVersions');
      continue;
    }

    if (!fse.existsSync(picPath)) {
      trace.error(`Can not found the original file ${picPath}`);
      continue;
    }

    if (fse.existsSync(versionPath)) {
      trace.info(`Skip generation, version alredy exists : ${versionPath}`);
      continue;
    }

    eventStart('GENERATE_VERSION', { versionPath });

    trace.info(`Exporting pic version ${versionPath}`);
    await exportPicVersion(picPath, versionPath, versionConfig);
    generated.push(versionPath);

    eventEnd('GENERATE_VERSION');
  }

  eventEnd('GENERATE_VERSIONS');
  return generated;
}

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

  const generated = [];
  for (const format of formats) {
    const { name, criteria, ...config } = format;
    eventStart('GENERATE_FORMAT', { name, criteria, config });

    const pics = filterCriteria(catalogInfo, criteria);

    const formatPath = path.resolve(formatsPath, name);
    const formatGenerated = await generateVersions(pics, formatPath, config);
    generated.concat(formatGenerated);

    eventEnd('GENERATE_FORMAT', { name });
  }

  eventEnd('GENERATE_FORMATS');
  return generated;
}

module.exports = generateFormats;
