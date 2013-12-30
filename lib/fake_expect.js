var expect = require('expect.js');

expect.Assertion.prototype.receive = function receive(method) {
  'use strict';
  var args = [].slice.call(arguments, 1),
      options = {required: true, not: this.flags.not};
  return this.obj.register(method, args, options);
};

// Saves user from having to require expect.js as well as fake_expect.js
module.exports = expect;
