const fse = require('fs-extra');
const { pixtest } = require('pixtest');

const { exportPicVersion } = require('../exportPicVersion');

const { resourceFile, RBUAS20150310 } = require('../../__tests__/helpers');
const { trace } = require('../../trace');

trace.setActive(false);

const GORUNDTRUTH_PATH = `${__dirname}/groundtruth`;
const RBUAS_WATERMARK = resourceFile('rbuas-watermark-w.png');
const BAUHAUS = resourceFile('bauhaus-93.ttf');

const imagePath = (version) => `${GORUNDTRUTH_PATH}/${version}`;

describe('exportPicVersion', () => {
  it('should catch an error if the file doesnt exists', async () => {
    try {
      const code = await exportPicVersion('nonFile');
      expect(code).not.toBe(0);
    } catch (error) {
      expect(error).toEqual('Error: Could not found the file nonFile');
    }
  });

  it('should resize an image reducing to 200x200', async () => {
    const testCase = 'resize200x200';
    const testOutput = imagePath(`${testCase}.test.jpg`);
    await exportPicVersion(RBUAS20150310, testOutput, { width: 200, height: 200 });

    const diff = pixtest({
      test: `${testCase}.jpg`,
      dir: GORUNDTRUTH_PATH,
      candidate: testOutput,
    });
    expect(diff).toBe(0);

    fse.unlinkSync(testOutput);
  });

  it('should resize an image reducing to 400x300', async () => {
    const testCase = 'resize400x300';
    const testOutput = imagePath(`${testCase}.test.jpg`);
    await exportPicVersion(RBUAS20150310, testOutput, { width: 400, height: 300 });

    const diff = pixtest({
      test: `${testCase}.jpg`,
      dir: GORUNDTRUTH_PATH,
      candidate: testOutput,
    });
    expect(diff).toBe(0);
    fse.unlinkSync(testOutput);
  });

  it('should resize and watermark an image', async () => {
    const testCase = 'resize-watermark';
    const testOutput = imagePath(`${testCase}.test.jpg`);
    const watermarks = [{ text: 'rbuas @ 2018', gravity: 'southeast' }];
    await exportPicVersion(RBUAS20150310, testOutput, { width: 600, height: 600, watermarks });

    const diff = pixtest({
      test: `${testCase}.jpg`,
      dir: GORUNDTRUTH_PATH,
      candidate: testOutput,
    });
    expect(diff).toBe(0);
    fse.unlinkSync(testOutput);
  });

  it('should resize and double watermark an image', async () => {
    const testCase = 'resize-double-watermark';
    const testOutput = imagePath(`${testCase}.test.jpg`);
    const watermarks = [
      {
        text: 'rbuas @ 2018',
        gravity: 'center',
        fonttype: BAUHAUS,
      },
      { mark: RBUAS_WATERMARK, gravity: 'center', w: 150, h: 150 },
    ];
    await exportPicVersion(RBUAS20150310, testOutput, { width: 600, height: 600, watermarks });

    const diff = pixtest({
      test: `${testCase}.jpg`,
      dir: GORUNDTRUTH_PATH,
      candidate: testOutput,
    });
    expect(diff).toBe(0);
    fse.unlinkSync(testOutput);
  });
});
