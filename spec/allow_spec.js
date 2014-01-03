'use strict';

var expect = require('../lib/fake_expect.js'),
    fake = require('../lib/core.js').fake,
    allow = require('../lib/allow.js');

describe('allow', function () {
  describe('.to', function () {
    it('returns a value', function () {
      var subject = fake('Fake');
      allow(subject).to.receive('message').and_return(1);
      expect(subject.message()).to.equal(1);

      subject.verify();
    });

    it('does not fail when not called', function () {
      var subject = fake('Fake');
      allow(subject).to.receive('message').and_return(1);

      subject.verify();
    });
  });
});
