const generateFormats = require('../PicPack.generateFormats');
const { trace } = require('../../trace');

trace.setActive(false);

describe('PicPack.generateFormats', () => {
  it('should not generate any format when missing required parameters', async () => {
    const response = await generateFormats();
    expect(response).toEqual([]);
  });

  it('should not generate any format when no formats defined', async () => {
    const response = await generateFormats('formatPath', [], {});
    expect(response).toEqual([]);
  });
});
