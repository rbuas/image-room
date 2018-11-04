const generateVersions = require('../PicPack.generateVersions');
const { trace } = require('../../trace');

trace.setActive(false);

describe('PicPack.generateVersions', () => {
  it('should catch an error when pic doesnt have the SourceFile', async () => {
    try {
      const response = await generateVersions({ picTest: {} }, './doesntMatter');
      expect(response).not.toBeDefined();
    } catch (error) {
      expect(error.toString()).toEqual(
        'Error: Missing picPath parameter to the function buildVersionFileName',
      );
    }
  });

  it('should return an empty array when pics are empty', async () => {
    const response = await generateVersions();
    expect(response).toEqual([]);
  });
});
