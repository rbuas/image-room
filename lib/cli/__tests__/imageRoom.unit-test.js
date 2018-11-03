const { imageRoom } = require('../..');
const { trace } = require('../../trace');

const readPicInfo = require('../../info/readPicInfo');
const generatePicInfo = require('../../info/generatePicInfo');

jest.mock('../../info/readPicInfo', () => jest.fn().mockReturnValue('matrix'));
jest.mock('../../info/generatePicInfo', () => jest.fn().mockReturnValue('matrix reloaded'));

trace.setActive(false);

describe('imageRoom', () => {
  it('should console the command help', async () => {
    const help = jest.fn();
    await imageRoom({ help });
    expect(help).toHaveBeenCalledTimes(1);
  });

  it('should call readPicInfo', async () => {
    await imageRoom({ readinfo: 'neo' });
    expect(readPicInfo).toHaveBeenCalledWith('neo');
    expect(readPicInfo).toHaveReturnedWith('matrix');
  });

  it('should call generatePicInfo', async () => {
    await imageRoom({ geninfo: 'trinity' });
    expect(generatePicInfo).toHaveBeenCalledWith('trinity');
    expect(generatePicInfo).toHaveReturnedWith('matrix reloaded');
  });
});
