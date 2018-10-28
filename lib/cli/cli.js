#!/usr/bin/env node

const commander = require('commander');

const packageInfo = require('../../package.json');

const imageRoom = require('./imageRoom');
const { trace } = require('../trace');

const description = `------------------------------------
Image Room
------------------------------------`;

// configure CLI options
commander
  .description(description)
  .version(packageInfo.version, '-v, --version')
  .option('-p, --pack [settings]', 'Process package with image room settings', '.irsettings')
  .option('-r, --readinfo [filename]', 'Read image info from filename')
  .option('-g, --geninfo [filename]', 'Generate image info file to filename')
  .option('-s, --syncinfo [filename]', 'Syncronize picture keywords with caption field')
  .action((cmd, settings) => {
    cmd.settings = settings || '.irsettings';
    cmd.description = description;
  })
  .parse(process.argv);

commander.help = commander.help.bind(commander);

imageRoom(commander).catch((error) => trace.error(500, error));
