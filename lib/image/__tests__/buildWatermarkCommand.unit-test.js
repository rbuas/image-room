const { buildWatermarkCommand } = require('../stumpWatermark');
const { watermark, watertext } = require('../watermark');
const { trace } = require('../../trace');

trace.setActive(false);

describe('buildWatermarkCommand', () => {
  it('should build a null command when call it without parameters', () => {
    const command = buildWatermarkCommand();
    expect(command).toBeNull();
  });

  it('should build a null command when call it without watermark config', () => {
    const command = buildWatermarkCommand('/myimage.jpg');
    expect(command).toBeNull();
  });

  it('should build a null command when call it without mark or text in config', () => {
    const command = buildWatermarkCommand('/myimage.jpg', {});
    expect(command).toBeNull();
  });

  it('should build a mark command', () => {
    const imageMark = watermark({ mark: '/mylogo.jpg' });
    const command = buildWatermarkCommand('/myimage.jpg', imageMark);
    expect(command).toBe(
      'magick convert /myimage.jpg /mylogo.jpg'
        + ' -gravity southeast -geometry 0x0+0+0'
        + ' -compose dissolve -define compose:args=50,100'
        + ' -composite /myimage.jpg',
    );
  });

  it('should build a text command', () => {
    const textMark = watertext({ text: 'my name' });
    const command = buildWatermarkCommand('/myimage.jpg', textMark);
    expect(command).toBe(
      'magick convert  '
        + '-pointsize 35 -kerning 1 '
        + '-size 140x45 xc:none '
        + '-gravity southeast '
        + "-stroke black -strokewidth 2 -annotate 0 'my name' "
        + '-background none -shadow 60x3+0+0 +repage '
        + "-stroke none -fill white -annotate +2+5 'my name' "
        + '/myimage.jpg +swap -gravity southeast '
        + '-geometry +0+0 -compose dissolve '
        + '-define compose:args=50,100 -composite /myimage.jpg',
    );
  });
});
