const fse = require('fs-extra');

const savePicInfo = require('../savePicInfo');
const readPicInfo = require('../readPicInfo');
const { trace } = require('../../trace');

const { RBUAS20150310 } = require('../../__tests__/helpers');

const RBUAS20150310COPY = `${RBUAS20150310}.savetest.jpg`;

trace.setActive(false);

describe('savePicTags', () => {
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

    await savePicInfo(RBUAS20150310COPY, { Label: 'Red' });

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
