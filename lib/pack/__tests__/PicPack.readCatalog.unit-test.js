const { picsDir, resourceFile } = require('../../__tests__/helpers');
const readCatalog = require('../PicPack.readCatalog');
const readCatalogInfo = require('../PicPack.readCatalogInfo');
const { trace } = require('../../trace');

trace.setActive(false);

describe('PicPack.readCatalog', () => {
  it('should return an empty array when sourcePath is not exists', () => {
    const response = readCatalog('./pathToNeverLand', ['jpg']);
    expect(response).toEqual([]);
  });

  it('should not read any info if catalog is null', async () => {
    const response = await readCatalogInfo();
    expect(response).toEqual({});
  });
});
