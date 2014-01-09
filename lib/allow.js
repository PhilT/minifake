'use strict';

var api = require('./api.js');

module.exports = function allow(fake) {
  return {
    to: {
      obj: fake,
      receive: api.setup(false, false),
      set: api.setup(false, true),
      get: api.setup(false, true)
    }
  };
};
