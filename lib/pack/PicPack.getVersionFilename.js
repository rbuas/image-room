const path = require('path');

function getVersionFilename(picPath, suffix, destPath) {
  if (!picPath) {
    throw new Error('Missing picPath parameter to the function getVersionFilename');
  }

  const parsedPath = path.parse(picPath);
  if (!parsedPath) {
    throw new Error(`Can not parse the path ${picPath}`);
  }

  const { name, ext, dir } = parsedPath;
  const basename = suffix ? `${name}.${suffix}${ext}` : `${name}.${ext}`;
  return path.resolve(destPath || dir, basename);
}

module.exports = getVersionFilename;
