const { Timer } = require('..');

describe('Timer', () => {
  const timer = new Timer();

  beforeEach(() => {
    timer.reset();
  });

  it('should return a duration of an event', () => {
    timer.start('test');
    const duration = timer.end('test');
    expect(duration).toBeGreaterThanOrEqual(0);
  });

  it('should make a report containing test', () => {
    timer.start('test');
    const duration = timer.end('test');
    const raport = timer.report('test');

    expect(raport).toEqual({
      test: duration,
    });
  });
});
