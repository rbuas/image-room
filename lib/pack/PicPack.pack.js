function pack({ name, criteria = {} }) {
  return {
    name,
    criteria,
  };
}

module.exports = pack;
