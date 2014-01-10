'use strict';

var expect = require('expect.js'),
  api = require('./api.js');

expect.Assertion.prototype.receive = api.setup(true, false);
expect.Assertion.prototype.set = api.setup(true, true);
expect.Assertion.prototype.get = api.setup(true, true);

module.exports = expect;
