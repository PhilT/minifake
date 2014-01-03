'use strict';

module.exports.countToWord = function countToWord(value) {
  return ['none', 'once', 'twice', '' + value + ' times'][value];
};

module.exports.arrayCompare = function arrayCompare(a, b) {
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
};

module.exports.last = function last(array) {
  return array[array.length - 1];
};

module.exports.noop = function noop() { return; };
