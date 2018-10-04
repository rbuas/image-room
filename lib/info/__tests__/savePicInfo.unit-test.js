const fse = require('fs-extra');

const { savePicInfo, readPicInfo, setTracer } = require('../..');

const { RBUAS20150310 } = require('./helpers');

setTracer(false);

describe('savePicTags', () => {
  const RBUAS20150310COPY = `${RBUAS20150310}.test.jpg`;

  beforeEach(() => {
    fse.copySync(RBUAS20150310, RBUAS20150310COPY);
  });

  afterEach(() => {
    fse.removeSync(RBUAS20150310COPY);
  });

  it('should save label info', async () => {
    const infoBefore = await readPicInfo(RBUAS20150310COPY);
    expect(infoBefore).toMatchObject({
      Label: 'Blue',
    });

    const response = await savePicInfo(RBUAS20150310COPY, { Label: 'Red' });
    expect(response).toMatchObject({
      Label: 'Red',
    });

    const infoAfter = await readPicInfo(RBUAS20150310COPY);
    expect(infoAfter).toMatchObject({
      Label: 'Red',
    });
  });

  it('should save label info in a file list', async () => {
    await savePicInfo([RBUAS20150310COPY], { Label: 'Red' });
    const infoAfter = await readPicInfo(RBUAS20150310COPY);
    expect(infoAfter).toMatchObject({
      Label: 'Red',
    });
  });
});
