const fse = require('fs-extra');

const { picsDir, resourceFile, getEssentialVersionFileName } = require('../../__tests__/helpers');
const format = require('../PicPack.format');
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

const formats = [
  format({ name: 'hd-best', suffix: 'hd', criteria: { Rating: [4, 5] } }),
  format({ name: 'hd', suffix: 'hd', criteria: { Rating: [3, 2] } }),
  format({ name: 'web-best', suffix: 'web', width: 2048, criteria: { Rating: [4, 5] } }),
  format({ name: 'web', suffix: 'web', width: 2048, criteria: { Rating: [3, 2] } }),
];

const packs = [
  pack({ name: 'LunaOrnellas', criteria: { Keywords: ['Luna Ornellas'] } }),
  pack({ name: 'rbuas-site', criteria: { Keywords: ['rbuas'], Rating: [4] } }),
  pack({ name: 'rbuas-portfolio', criteria: { Keywords: ['rbuas'], Rating: [5] } }),
];

const outputPath = `${__dirname}/output`;

describe('PickPack.generatePacks', () => {
  let pp;

  beforeEach(async () => {
    pp = new PicPack({
      sourcePath: picsDir,
      outputPath,
      watermarks,
      formats,
      packs,
    });
    await pp.readCatalog();
  });

  afterEach(() => {
    fse.removeSync(outputPath);
  });

  it('should generate all formats for each 6 pictures in the catalog', async () => {
    const generatedPacks = await pp.generatePacks();
    expect(generatedPacks).toHaveLength(14);

    const packNames = generatedPacks.map((item) => getEssentialVersionFileName(item, 3));

    const lunaOrnellas = packNames.filter((file) => file.startsWith('LunaOrnellas/'));
    expect(lunaOrnellas).toHaveLength(4);

    const rbuasSite = packNames.filter((file) => file.startsWith('rbuas-site/'));
    expect(rbuasSite).toHaveLength(10);

    const rbuasPortfolio = packNames.filter((file) => file.startsWith('rbuas-portfolio/'));
    expect(rbuasPortfolio).toHaveLength(0);

    const hdBest = packNames.filter((file) => file.includes('hd-best/'));
    expect(hdBest).toHaveLength(7);

    const hd = packNames.filter((file) => file.includes('hd/'));
    expect(hd).toHaveLength(0);

    const webBest = packNames.filter((file) => file.includes('web-best/'));
    expect(webBest).toHaveLength(7);

    const web = packNames.filter((file) => file.includes('web/'));
    expect(web).toHaveLength(0);
  });
});
