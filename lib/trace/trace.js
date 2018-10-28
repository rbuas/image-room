const merge = require('lodash.merge');

const jsonWriter = require('./jsonWriter');

const defaultSettings = {
  active: true,
  levels: {
    emerg: 1,
    critic: 1,
    error: 1,
    warning: 1,
    info: 1,
    highlight: 1,
  },
  writer: jsonWriter,
};

class Tracer {
  constructor(settings) {
    this.settings = merge({}, defaultSettings, settings);
    const { levels } = this.settings;
    Object.keys(levels).forEach((level) => {
      this[level] = (message, info) => this.trace(level, message, info);
    });
  }

  trace(level, message, info) {
    const { active, levels, writer } = this.settings;

    if (!active || levels[level] < 1) {
      return;
    }

    writer(level.toUpperCase(), message, info);
  }

  setLevel(level, active) {
    const { levels } = this.settings;
    levels[level] = active;
  }

  setActive(active) {
    this.settings.active = active;
  }

  setWriter(writer) {
    this.settings.writer = writer;
  }
}

const trace = new Tracer();

module.exports = trace;
