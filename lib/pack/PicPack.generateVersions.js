const fse = require('fs-extra');

const { trace, eventStart, eventEnd } = require('../trace');
const { exportPicVersion } = require('../image/exportPicVersion');
const getVersionFilename = require('./PicPack.getVersionFilename');
const format = require('./PicPack.format');

async function generateVersions(pics, formatPath, picFormat = format()) {
  if (!pics) {
    return [];
  }

  eventStart('GENERATE_VERSIONS');
  fse.ensureDirSync(formatPath);

  const { suffix, ...versionConfig } = picFormat;

  const generated = [];
  const picNames = Object.keys(pics);
  for (const picName of picNames) {
    const pic = pics[picName];
    const picPath = pic && pic.SourceFile;
    const versionPath = getVersionFilename(picPath, suffix, formatPath);
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

module.exports = generateVersions;
