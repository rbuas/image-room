const PicPack = require('../PicPack');
const { trace } = require('../../trace');

trace.setActive(false);

describe('PicPack', () => {
  it('should catch an error when missing required parameters', () => {
    const factory = () => new PicPack();
    expect(factory).toThrowError('Missing required parameter to instantiate PicPack class.');
  });
});
