const fse = require('fs-extra');

const { picsDir, resourceFile, getEssentialVersionFileName } = require('../../__tests__/helpers');
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

const packs = [
  pack({ name: 'LunaOrnellas', criteria: { tags: 'Luna Ornellas' } }),
  pack({ name: 'rbuas-site', criteria: { tags: ['rbuas'], Rating: [4] } }),
  pack({ name: 'rbuas-portfolio', criteria: { tags: ['rbuas'], Rating: [5] } }),
];

const outputPath = `${__dirname}/output`;

describe('PickPack.generateFormats', () => {
  let pp;

  beforeEach(() => {
    pp = new PicPack({
      sourcePath: picsDir,
      outputPath,
      watermarks,
      packs,
    });
  });

  afterEach(() => {
    fse.removeSync(outputPath);
  });

  it('should generate all formats for each 6 pictures in the catalog', async () => {
    await pp.readCatalog();

    const generatedFiles = await pp.generateFormats();
    expect(generatedFiles).toHaveLength(24);

    const versionNames = generatedFiles.map(getEssentialVersionFileName);
    const hdBest = versionNames.filter((file) => file.startsWith('hd-best/'));
    expect(hdBest).toHaveLength(6);

    const hd = versionNames.filter((file) => file.startsWith('hd/'));
    expect(hd).toHaveLength(6);

    const webBest = versionNames.filter((file) => file.startsWith('web-best/'));
    expect(webBest).toHaveLength(6);

    const web = versionNames.filter((file) => file.startsWith('web/'));
    expect(web).toHaveLength(6);
  });

  it('should not regenerate existents', async () => {
    await pp.readCatalog();

    const generatedFiles = await pp.generateFormats();
    expect(generatedFiles).toHaveLength(24);

    const regeneratedFiles = await pp.generateFormats();
    expect(regeneratedFiles).toHaveLength(0);
  });

  it('should generate one missing formats for each 6 pictures in the catalog', async () => {
    await pp.readCatalog();

    const generatedFiles = await pp.generateFormats();
    expect(generatedFiles).toHaveLength(24);
    const firstFile = generatedFiles[0];
    fse.unlinkSync(generatedFiles[0]);

    const regeneratedFiles = await pp.generateFormats();
    expect(regeneratedFiles).toHaveLength(1);
    expect(regeneratedFiles[0]).toEqual(firstFile);
  });
});
