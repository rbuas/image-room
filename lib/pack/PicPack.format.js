function format({ name, criteria = {}, watermarks = [], width, height, suffix }) {
  return {
    name,
    criteria,
    watermarks,
    width,
    height,
    suffix,
  };
}

module.exports = format;
