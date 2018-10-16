const shelljs = require('shelljs');

const { trace } = require('../trace');

function argGravity({ gravity = 'southeast' }) {
  return `-gravity ${gravity}`;
}

function argText({ text, fonttype, gravity, fontsize = 35 }) {
  const w = text.length * 20;
  const h = fontsize + 10;
  return [
    fonttype ? `-font '${fonttype}'` : '',
    `-pointsize ${fontsize} -kerning 1`,
    `-size ${w}x${h} xc:none`,
    argGravity({ gravity }),
    `-stroke black -strokewidth 2 -annotate 0 '${text}'`,
    '-background none -shadow 60x3+0+0 +repage',
    `-stroke none -fill white -annotate +2+5 '${text}'`,
  ].join(' ');
}

function argDissolve({ dissolve = 50 }) {
  return `dissolve -define compose:args=${dissolve},100`;
}

function buildMarkCommand(imagefile, watermark) {
  const { mark, x = 0, y = 0, w = 0, h = 0 } = watermark;

  return [
    'convert',
    imagefile,
    mark,
    argGravity(watermark),
    `-geometry ${w}x${h}+${x}+${y}`,
    '-compose',
    argDissolve(watermark),
    '-composite',
    imagefile,
  ].join(' ');
}

function buildTextCommand(imagefile, watermark) {
  const { x = 0, y = 0, gravity = 'southeast' } = watermark;

  return [
    'convert',
    argText(watermark),
    imagefile,
    `+swap -gravity ${gravity} -geometry +${x}+${y}`,
    '-compose',
    argDissolve(watermark),
    '-composite',
    imagefile,
  ].join(' ');
}

function buildWatermarkCommand(imagefile, watermark) {
  if (!imagefile || !watermark) {
    trace(`Watermark required parameters missing ${imagefile}...`);
    return null;
  }

  const { mark, text } = watermark;
  if (!mark && !text) {
    trace(`Watermark required information missing ${imagefile}...`);
    return null;
  }

  const commandArgs = mark
    ? buildMarkCommand(imagefile, watermark)
    : buildTextCommand(imagefile, watermark);
  return `magick ${commandArgs}`;
}

function stumpWatermark(imagefile, watermark) {
  return new Promise((resolve, reject) => {
    const command = buildWatermarkCommand(imagefile, watermark);
    if (!command) {
      return resolve(1);
    }

    trace(`Stumping watermark on ${imagefile}...`);

    shelljs.exec(command, (code, stdout, stderr) => {
      if (code !== 0) {
        trace('error', `Watermark process error: ${code} (${stderr})`);
        return reject(code);
      }

      trace('error', `Watermark process success: ${imagefile} (${stdout})`);
      return resolve(0);
    });
  });
}

async function stumpMultipleWatermarks(fileimage, watermarks) {
  if (!watermarks || !watermarks.length) {
    return;
  }

  for (const watermark of watermarks) {
    await stumpWatermark(fileimage, watermark);
  }
}

module.exports = {
  buildWatermarkCommand,
  stumpWatermark,
  stumpMultipleWatermarks,
};
