const fse = require('fs-extra');
const { pixtest } = require('pixtest');

const { stumpWatermark, stumpMultipleWatermarks } = require('../stumpWatermark');

const { RBUAS20150310 } = require('./helpers');

const RBUAS20150310COPY = `${RBUAS20150310}.stumb.jpg`;
const IDIFF_PATH = `${__dirname}/idiff`;
const RBUAS_WATERMARK = `${__dirname}/resources/rbuas-watermark-w.png`;
const BAUHAUS = `${__dirname}/resources/bauhaus-93.ttf`;

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
      dir: IDIFF_PATH,
      candidate: RBUAS20150310COPY,
    });
    expect(diff).toBe(0);
  });

  it('should stump a small text on top right of a photo using offset', async () => {
    const watermark = { text: 'rbuas @ 2018', gravity: 'northeast', x: 100, y: 30 };
    const code = await stumpWatermark(RBUAS20150310COPY, watermark);
    expect(code).toBe(0);

    const diff = pixtest({
      test: 'RBUAS20150310-text-northeast-offset.jpg',
      dir: IDIFF_PATH,
      candidate: RBUAS20150310COPY,
    });
    expect(diff).toBe(0);
  });

  it('should stump a small text on bottom right of a photo', async () => {
    const watermark = { text: 'rbuas @ 2018', gravity: 'southeast' };
    const code = await stumpWatermark(RBUAS20150310COPY, watermark);
    expect(code).toBe(0);

    const diff = pixtest({
      test: 'RBUAS20150310-text-southeast.jpg',
      dir: IDIFF_PATH,
      candidate: RBUAS20150310COPY,
    });
    expect(diff).toBe(0);
  });

  it('should stump a small text on center of a photo using fonttype', async () => {
    const watermark = {
      text: 'rbuas @ 2018',
      gravity: 'center',
      fonttype: BAUHAUS,
    };
    const code = await stumpWatermark(RBUAS20150310COPY, watermark);
    expect(code).toBe(0);

    const diff = pixtest({
      test: 'RBUAS20150310-text-fonttype.jpg',
      dir: IDIFF_PATH,
      candidate: RBUAS20150310COPY,
    });
    expect(diff).toBe(0);
  });

  it('should stump a small mark on center of a photo', async () => {
    const watermark = { mark: RBUAS_WATERMARK, gravity: 'center', w: 150, h: 150 };
    const code = await stumpWatermark(RBUAS20150310COPY, watermark);
    expect(code).toBe(0);

    const diff = pixtest({
      test: 'RBUAS20150310-mark-center.jpg',
      dir: IDIFF_PATH,
      candidate: RBUAS20150310COPY,
    });
    expect(diff).toBe(0);
  });
});

describe('stumpMultipleWatermarks', () => {
  beforeEach(() => {
    fse.copySync(RBUAS20150310, RBUAS20150310COPY);
  });

  afterEach(() => {
    fse.removeSync(RBUAS20150310COPY);
  });

  it('should return -1 when not pass watermarks config', async () => {
    const code = await stumpMultipleWatermarks(RBUAS20150310COPY);
    expect(code).toBe(-1);
  });

  it('should stump two watermarks', async () => {
    const watermarks = [
      {
        text: 'rbuas @ 2018',
        gravity: 'center',
        fonttype: BAUHAUS,
      },
      { mark: RBUAS_WATERMARK, gravity: 'center', w: 150, h: 150 },
    ];
    const code = await stumpMultipleWatermarks(RBUAS20150310COPY, watermarks);
    expect(code).toBe(0);

    const diff = pixtest({
      test: 'RBUAS20150310-double-watermark.jpg',
      dir: IDIFF_PATH,
      candidate: RBUAS20150310COPY,
    });
    expect(diff).toBe(0);
  });
});
