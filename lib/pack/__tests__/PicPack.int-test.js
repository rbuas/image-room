const { picsDir, resourceFile } = require('../../__tests__/helpers');

const pack = require('../PicPack.pack');
const PicPack = require('../PicPack');
const { trace } = require('../../trace');

trace.setActive(false);

const RBUAS_WATERMARK = resourceFile('rbuas-watermark-w.png');

const watermarks = {
  bottomText: { text: 'xxx @ 2018', gravity: 'northeast', x: 100, y: 30 },
  centerMark: { mark: RBUAS_WATERMARK, gravity: 'center', w: 150, h: 150 },
  topPdl: {
    text: 'Prix de Lausanne 2017 / photo : rbuas',
    gravity: 'southeast',
    dissolve: 50,
    w: 700,
    h: 40,
    x: 10,
    y: 10,
    fontsize: 35,
    fonttype: 'Myriad Web Pro',
  },
};

describe('PickPack', () => {
  describe('constructor', () => {
    const pp = new PicPack({
      sourcePath: picsDir,
      outputPath: `${__dirname}/output`,
      watermarks,
      packs: [
        pack({ name: 'LunaOrnellas', criteria: { tags: 'Luna Ornellas' } }),
        pack({ name: 'rbuas-site', criteria: { tags: ['rbuas'], Rating: [4] } }),
        pack({ name: 'rbuas-portfolio', criteria: { tags: ['rbuas'], Rating: [5] } }),
      ],
    });

    it('should read the pics catalog', async () => {
      await pp.readCatalog();
      expect(pp.catalog).toBeDefined();
      expect(pp.catalog).toHaveLength(6);
    });

    it('should read the pics catalogInfo', async () => {
      await pp.readCatalog();
      expect(pp.catalogInfo).toBeDefined();
      expect(Object.keys(pp.catalogInfo)).toHaveLength(6);
    });
  });
});
