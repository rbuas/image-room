/* eslint-disable no-console */

function startCommand(commandName) {
  console.log('=======================================');
  console.log(`${commandName} ...`);
  console.log('=======================================');
}

function endCommand(commandName) {
  console.log('=======================================');
  console.log(`${commandName} !!!`);
  console.log('=======================================');
}

module.exports = {
  startCommand,
  endCommand,
};
