const { trace, setTracer } = require('../trace');

describe('trace', () => {
  const myTracer = jest.fn();

  beforeEach(() => {
    setTracer(myTracer);
  });

  it('should trace two strings', () => {
    trace('info', 'my super message');
    expect(myTracer).toHaveBeenCalled();
    expect(myTracer).toBeCalledTimes(1);
    expect(myTracer).toBeCalledWith('info', 'my super message');
  });
});
