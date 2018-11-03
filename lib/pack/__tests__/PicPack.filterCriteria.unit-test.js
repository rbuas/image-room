const fse = require('fs-extra');
const { filterCriteria } = require('../PicPack.filterCriteria');

const catalogTestFile = `${__dirname}/resources/PicPack.filterCriteria.catalog.json`;

describe('PicPack.filterCriteria', () => {
  let catalogTest;

  beforeAll(() => {
    catalogTest = fse.readJSONSync(catalogTestFile);
  });

  it('should not filter a catalog when there is no filter', () => {
    const filteredCatalog = filterCriteria(catalogTest);
    expect(filteredCatalog).toEqual(catalogTest);
    expect(Object.keys(filteredCatalog)).toHaveLength(6);
  });

  it('should filter a catalog by Rating === 3', () => {
    const filteredCatalog = filterCriteria(catalogTest, { Rating: 3 });
    expect(filteredCatalog['RBUAS20161022-0034.jpg']).toBeDefined();
    expect(Object.keys(filteredCatalog)).toHaveLength(1);
  });

  it('should filter a catalog by Keywords dance', () => {
    const filteredCatalog = filterCriteria(catalogTest, { Keywords: ['dance'] });
    expect(filteredCatalog['RBUAS20150310-0052-sync.jpg']).toBeDefined();
    expect(filteredCatalog['RBUAS20150310-0052.jpg']).toBeDefined();
    expect(filteredCatalog['RBUAS20180601-0025.full.jpg']).toBeDefined();
    expect(filteredCatalog['RBUAS20180601-0025.mobile.jpg']).toBeDefined();
    expect(Object.keys(filteredCatalog)).toHaveLength(4);
  });

  it('should filter a catalog by Rating = [4, 5] Keywords dance', () => {
    const filteredCatalog = filterCriteria(catalogTest, { Rating: [4, 5], Keywords: ['dance'] });
    expect(filteredCatalog['RBUAS20150310-0052.jpg']).toBeDefined();
    expect(filteredCatalog['RBUAS20180601-0025.full.jpg']).toBeDefined();
    expect(filteredCatalog['RBUAS20180601-0025.mobile.jpg']).toBeDefined();
    expect(Object.keys(filteredCatalog)).toHaveLength(3);
  });
});
