const transform = require('lodash.transform');

class Timer {
  constructor() {
    this.reset();
  }

  reset() {
    this.markStarts = {};
    this.markEnds = {};
  }

  start(mark) {
    if (this.markStarts[mark]) {
      return;
    }

    this.markStarts[mark] = new Date();
  }

  end(mark) {
    this.markEnds[mark] = new Date();
    return this.duration(mark);
  }

  duration(mark) {
    const end = this.markEnds[mark];
    const start = this.markStarts[mark];

    if (end === undefined || start === undefined) {
      return null;
    }

    return (end - start) / 1000;
  }

  report() {
    return transform(
      this.markStarts,
      (acc, start, mark) => {
        const duration = this.duration(mark);
        if (duration === null) {
          return;
        }

        acc[mark] = this.duration(mark);
      },
      {},
    );
  }
}

module.exports = Timer;
