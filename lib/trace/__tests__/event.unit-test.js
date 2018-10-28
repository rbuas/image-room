const { eventStart, eventEnd } = require('..');

jest.mock('../trace');

describe('event', () => {
  it('should return a duration of an event', () => {
    eventStart('eventA');

    const duration = eventEnd('eventA');

    expect(duration).toBeGreaterThanOrEqual(0);
  });
});
