'use strict';

module.exports = {
  error: function error(message) {
    return new Error(message);
  },

  countToWord: function countToWord(value) {
    return ['none', 'once', 'twice', '' + value + ' times'][value];
  },

  arrayCompare: function arrayCompare(a, b) {
    if (a.length !== b.length) { return false; }

    var i = a.length - 1,
        matching = true;

    for (; i >= 0; i -= 1) {
      if (a[i] !== b[i]) {
        matching = false;
        break;
      }
    }

    return matching;
  },

  last: function last(array) {
    return array[array.length - 1];
  },

  noop: function noop() {
    return;
  },
};

