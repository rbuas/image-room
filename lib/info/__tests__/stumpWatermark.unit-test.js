const fse = require('fs-extra');
const { pixtest } = require('pixtest');

const { stumpWatermark } = require('../stumpWatermark');

const { RBUAS20150310 } = require('./helpers');

const RBUAS20150310COPY = `${RBUAS20150310}.stumb.jpg`;

describe('stumpWatermark', () => {
  beforeEach(() => {
    fse.copySync(RBUAS20150310, RBUAS20150310COPY);
  });

  afterEach(() => {
    fse.removeSync(RBUAS20150310COPY);
  });

  it('should not stump a watermark when missing config', async () => {
    const code = await stumpWatermark(RBUAS20150310COPY);
    expect(code).toBe(1);
  });

  it('should stump a small image on top right of a photo', async () => {
    const watermark = { text: 'rbuas @ 2018', gravity: 'northeast' };
    const code = await stumpWatermark(RBUAS20150310COPY, watermark);
    expect(code).toBe(0);

    const diff = pixtest({
      test: 'RBUAS20150310-text-northeast.jpg',
      dir: `${__dirname}/idiff`,
      candidate: RBUAS20150310COPY,
    });
    expect(diff).toBe(0);
  });

  it('should stump a small image on bottom right of a photo', async () => {
    const watermark = { text: 'rbuas @ 2018', gravity: 'southeast' };
    const code = await stumpWatermark(RBUAS20150310COPY, watermark);
    expect(code).toBe(0);
  });
});
