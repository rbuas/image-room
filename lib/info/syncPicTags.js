const uniq = require('lodash.uniq');

const readPicInfo = require('../info/readPicInfo');
const savePicInfo = require('../info/savePicInfo');

function uniqKeywords(keywords) {
  const mapped = keywords.map((keyword) => keyword.toString().trim());
  return uniq(mapped);
}

async function syncPicTags(picFilename) {
  const info = await readPicInfo(picFilename);
  const keywords = info.Keywords;
  const caption = info.Description ? info.Description.split(',') : [];
  const mergedKeywords = uniqKeywords([...keywords, ...caption]);

  const finalInfo = {
    ...info,
    Keywords: mergedKeywords,
    Subject: mergedKeywords,
    Description: mergedKeywords.join(', '),
  };

  return savePicInfo(picFilename, finalInfo);
}

module.exports = syncPicTags;
