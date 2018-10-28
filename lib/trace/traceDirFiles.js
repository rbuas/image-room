const shelljs = require('shelljs');

const tracer = require('./trace');

function traceDirFiles(dirPath) {
  const list = shelljs.ls('-R', dirPath);
  list.forEach((file) => tracer.info(`${dirPath}/${file.toString()}`));
}

module.exports = traceDirFiles;
