let utils = {};

utils.destroy = (el) => {
  el.x = -100;
  el.y = -100;
  el.destroyed = true;
}

module.exports = utils;