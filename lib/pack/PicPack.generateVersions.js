const path = require('path');
const fse = require('fs-extra');

const { trace, eventStart, eventEnd } = require('../trace');
const { exportPicVersion } = require('../image/exportPicVersion');

function buildVersionFileName(picPath, suffix, destPath) {
  if (!picPath) {
    throw new Error('Missing picPath parameter to the function buildVersionFileName');
  }

  const { name, ext, dir } = path.parse(picPath);
  const basename = suffix ? `${name}.${suffix}${ext}` : `${name}.${ext}`;
  return path.resolve(destPath || dir, basename);
}

async function generateVersions(pics, formatPath, config = {}) {
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
    const picPath = pic && pic.SourceFile;
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

module.exports = generateVersions;
