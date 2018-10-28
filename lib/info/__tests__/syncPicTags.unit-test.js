const fse = require('fs-extra');

const { trace } = require('../../trace');
const syncPicTags = require('../syncPicTags');
const readPicInfo = require('../readPicInfo');

const { RBUAS20150310SYNC } = require('../../__tests__/helpers');

const RBUAS20150310SYNCCOPY = `${RBUAS20150310SYNC}.synctest.jpg`;
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

trace.setActive(false);

describe('syncPicTags', () => {
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
