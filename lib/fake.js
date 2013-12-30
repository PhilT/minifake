'use strict';

var fake = require('./core.js'),
    verifyAll;

verifyAll = function verifyAll() { fake.verifyAll(); };

// Add hook when using Mocha or Jasmine
if (typeof afterEach === 'function') {
  afterEach(verifyAll);
}

exports.fake = fake.fake;
exports.expect = require('./fake_expect.js');
