const jsonWriter = require('../jsonWriter');

jest.mock('shelljs', () => ({ echo: jest.fn() }));

describe('jsonWriter', () => {
  it('should write a json with a string', () => {
    const response = jsonWriter('levelA', 'messageA', 'infoA');
    expect(response).toEqual('{"level":"levelA","message":"messageA","info":"infoA"}');
  });

  it('should write a json with an object', () => {
    const response = jsonWriter('levelA', 'messageA', { infoA: 'A', infoB: 'B' });
    expect(response).toEqual('{"level":"levelA","message":"messageA","infoA":"A","infoB":"B"}');
  });
});
