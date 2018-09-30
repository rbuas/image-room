const chalk = require('chalk');
const shelljs = require('shelljs');

function logInfo(...message) {
  shelljs.echo(message);
}

function logSection(message) {
  shelljs.echo(chalk.bold.blue(`\n${message}\n`));
}

function logError(code, message) {
  const typeLabel = chalk.bold.red(`ERROR (${code})`);
  const errorMessage = chalk.bold.red(message);
  shelljs.echo(`${typeLabel}: ${errorMessage}`);
}

function logDirFiles(dirPath) {
  shelljs.ls('-R', dirPath).forEach((file) => shelljs.echo(`${dirPath}/${file.toString()}`));
}

module.exports = {
  logInfo,
  logSection,
  logError,
  logDirFiles,
};
