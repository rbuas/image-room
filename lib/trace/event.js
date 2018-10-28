const trace = require('./trace');
const Timer = require('./Timer');

const timer = new Timer();

function eventStart(event, info) {
  trace.info(`${event} starts`, info);
  timer.start(event);
}

function eventEnd(event, info) {
  const duration = timer.end(event);
  trace.info(`${event} ends (${duration}s)`, info);

  if (info) {
    const { error, warning } = info;
    if (warning) {
      trace.warning(warning);
    }
    if (error) {
      trace.error(error);
    }
  }

  return duration;
}

module.exports = {
  eventStart,
  eventEnd,
};
