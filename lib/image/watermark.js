function watermark({ mark, x, y, w, h, gravity, dissolve }) {
  return { mark, x, y, w, h, gravity, dissolve };
}

function watertext({ text, fonttype, gravity, dissolve, fontsize, x, y }) {
  return { text, fonttype, gravity, fontsize, dissolve, x, y };
}

module.exports = {
  watermark,
  watertext,
};
