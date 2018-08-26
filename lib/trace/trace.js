let tracer = console.log;

function setTracer(callback) {
  tracer = callback;
}

function trace(level, ...info) {
  if (tracer) {
    tracer(level, ...info);
  }
}

module.exports = {
  setTracer,
  trace,
};
