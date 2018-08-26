const { generatePicInfo, setTracer } = require('../..');

const { RBUAS20150310 } = require('./helpers');

setTracer(false);

describe('generatePicInfo', () => {
  it('should generate a file containing the pic info', async () => {
    const result = await generatePicInfo(RBUAS20150310);
    expect(result).toBeDefined();
    const { filename, info } = result;
    const basename = filename.slice(0, -5);
    expect(RBUAS20150310.startsWith(basename)).toBe(true);
    expect(info).toMatchObject({
      Extension: '.jpg',
      Basename: 'RBUAS20150310-0052',
      Filetype: 'jpg',
      Format: 'image/jpeg',
      RawFileName: 'RBUAS20150310-0052.jpg',
      ImageSize: '1536x2048',
      ImageWidth: '1536',
      ImageHeight: '2048',
      Orientation: 'Vertical',
      Rating: 4,
      Label: 'Blue',
      Keywords: [2015, 'Efet', 'Luna Ornellas', 'Paris', 'dance', 'rbuas', 'shadow'],
      Title: '',
      Copyright: 'rbuas',
    });
  });

  it('should throw an error when image is unknow', async () => {
    try {
      await generatePicInfo('/path/unknowImage.jpg');
    } catch (e) {
      expect(e.toString()).toEqual('Error: Could not read info from file /path/unknowImage.jpg');
    }
  });
});
