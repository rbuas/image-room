const fse = require('fs-extra');

const { syncPicTags, readPicInfo, setTracer } = require('../..');

const { RBUAS20150310SYNC } = require('./helpers');

const keywords = [
  'shadow',
  'dance',
  2015,
  'rbuas',
  'Luna Ornellas',
  'Paris',
  'Efet',
  'SpecialTag1',
  'SpecialTag2',
  'paris',
];

setTracer(false);

describe('syncPicTags', () => {
  const RBUAS20150310SYNCCOPY = `${RBUAS20150310SYNC}.test.jpg`;

  beforeEach(() => {
    fse.copySync(RBUAS20150310SYNC, RBUAS20150310SYNCCOPY);
  });

  afterEach(() => {
    fse.removeSync(RBUAS20150310SYNCCOPY);
  });

  it('should syncronize keywords with caption', async () => {
    await syncPicTags(RBUAS20150310SYNCCOPY);
    const info = await readPicInfo(RBUAS20150310SYNCCOPY);
    expect(info).toBeDefined();
    expect(info).toMatchObject({
      Extension: '.jpg',
      Basename: 'RBUAS20150310-0052-sync.jpg.test',
      Filetype: 'jpg',
      Format: 'image/jpeg',
      ImageSize: '1536x2048',
      ImageWidth: 1536,
      ImageHeight: 2048,
      Orientation: 'Vertical',
      Rating: 4,
      Label: 'Blue',
      Description: keywords.join(', '),
      Keywords: keywords,
      Title: '',
      Copyright: 'rbuas',
    });
  });
});
