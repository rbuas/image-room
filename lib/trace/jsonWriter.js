const shelljs = require('shelljs');
const chalk = require('chalk');
const isString = require('lodash.isstring');

const colors = {
  emerg: chalk.bold.bgRed,
  critic: chalk.bold.bgMagenta,
  error: chalk.bold.red,
  warning: chalk.bold.yellow,
  highlight: chalk.bold.green,
};

function jsonWriter(level, message, info) {
  const entry = isString(info) ? { level, message, info } : { level, message, ...info };
  let output = JSON.stringify(entry);
  const color = colors[level];
  if (color) {
    output = color(output);
  }
  shelljs.echo(output);
  return output;
}

module.exports = jsonWriter;
