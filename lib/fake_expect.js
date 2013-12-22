var expect = require('expect.js');

expect.Assertion.prototype.receive = function receive(method) {
  'use strict';
  var args = [].slice.call(arguments, 1),
      options = {required: true, not: this.flags.not};
  this.obj.register(method, args, options);
};

module.exports = expect;
