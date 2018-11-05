const fse = require('fs-extra');
const path = require('path');

const { eventStart, eventEnd } = require('../trace');
const { filterCriteria } = require('./PicPack.filterCriteria');
const getVersionFilename = require('./PicPack.getVersionFilename');
const { trace } = require('../trace');

async function copyReplicsToPack(pics, packPath, formatsOutput, formats) {
  fse.ensureDirSync(packPath);

  const picCount = Object.keys(pics).length;
  if (!picCount) {
    trace.warning();
    return [];
  }

  const replics = [];
  for (const format of formats) {
    const { name, suffix } = format;
    const formatPath = path.resolve(formatsOutput, name);
    const formatInPack = path.resolve(packPath, name);
    fse.ensureDirSync(formatInPack);

    const picNames = Object.keys(pics);
    for (const picName of picNames) {
      const pic = pics[picName];
      const picPath = pic && pic.SourceFile;
      const versionPath = getVersionFilename(picPath, suffix, formatPath);
      const versionBasename = path.basename(versionPath);
      const versionInPack = path.resolve(formatInPack, versionBasename);

      if (fse.existsSync(versionPath) && !fse.existsSync(versionInPack)) {
        fse.copyFileSync(versionPath, versionInPack);
        replics.push(versionInPack);
      }
    }
  }

  return replics;
}

async function generatePacks(packsOutput, packs, formatsOutput, formats, catalogInfo) {
  eventStart('GENERATE_PACKS');

  if (!packs) {
    eventEnd('GENERATE_PACKS');
    return [];
  }

  let replics = [];
  for (const pack of packs) {
    const { name, criteria } = pack;
    eventStart('GENERATE_PACK', { name, criteria });

    const pics = filterCriteria(catalogInfo, criteria);
    const packPath = path.resolve(packsOutput, name);

    const packReplics = await copyReplicsToPack(pics, packPath, formatsOutput, formats);
    replics = [...replics, ...packReplics];

    eventEnd('GENERATE_PACK', { name });
  }

  eventEnd('GENERATE_PACKS');
  return replics;
}

module.exports = generatePacks;
