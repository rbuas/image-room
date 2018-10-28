const { trace } = require('..');

describe('trace', () => {
  const myWriter = jest.fn();
  trace.setWriter(myWriter);

  beforeEach(() => {
    myWriter.mockReset();
  });

  it('should trace two strings', () => {
    trace.info('my super message');
    expect(myWriter).toHaveBeenCalled();
    expect(myWriter).toBeCalledTimes(1);
    expect(myWriter).toBeCalledWith('INFO', 'my super message', undefined);
  });

  it('should not trace an inactive level', () => {
    trace.setLevel('warning', 0);
    trace.warning('my super warning');
    expect(myWriter).toBeCalledTimes(0);

    trace.setLevel('warning', 1);
    trace.warning('my super warning');
    expect(myWriter).toBeCalledTimes(1);
  });

  it('should trace an active level when other are inactive', () => {
    trace.setLevel('warning', 0);
    trace.info('my super message', 'my super info');
    expect(myWriter).toBeCalledTimes(1);
    expect(myWriter).toBeCalledWith('INFO', 'my super message', 'my super info');
  });
});
