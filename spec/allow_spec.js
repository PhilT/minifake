'use strict';

var expect = require('../lib/fake_expect.js'),
    fake = require('../lib/fake.js'),
    allow = require('../lib/allow.js');

describe('allow', function () {
  describe('to', function () {
    it('returns a value', function () {
      var afake = fake('Fake');
      allow(afake).to.receive('message').and_return(1);
      expect(afake.message()).to.equal(1);

      afake.verify();
    });

    it('does not fail when not called', function () {
      var afake = fake('Fake');
      allow(afake).to.receive('message').and_return(1);

      afake.verify();
    });
  });
});