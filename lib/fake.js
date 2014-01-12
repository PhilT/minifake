'use strict';

var fake = require('./core.js'),
    verifyAll;

verifyAll = function verifyAll() { fake.verifyAll(); };

// Add hooks when using Mocha or Jasmine
if (typeof afterEach === 'function') {
  afterEach(verifyAll);
}

module.exports.fake = fake.fake;
module.exports.expect = require('./expect.js');
