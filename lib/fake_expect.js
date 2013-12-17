var expect = require('expect.js');

expect.Assertion.prototype.receive = function(method) {
  this.obj.register(method, this.flags.not, [].slice.call(arguments, 1));
};

module.exports = expect;
