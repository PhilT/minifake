'use strict';

var expect = require('../lib/expect.js'),
    fake = require('../lib/core.js').fake,
    allow = require('../lib/allow.js');

describe('allow', function () {
  var subject;

  beforeEach(function () {
    subject = fake('Fake');
  });

  describe('.receive', function () {
    it('returns a value', function () {
      allow(subject).to.receive('message').and_return(1);
      expect(subject.message()).to.equal(1);
      subject.verify();
    });

    it('does not fail when not called', function () {
      allow(subject).to.receive('message').and_return(1);
      subject.verify();
    });
  });

  describe('.set', function () {
    it('sets a value', function () {
      allow(subject).to.set('property', 1);
      subject.property = 1;
      subject.verify();
    });

    it('does not fail when not called', function () {
      allow(subject).to.set('property', 1);
      subject.verify();
    });
  });

  describe('.get', function () {
    it('gets a value', function () {
      allow(subject).to.get('property').and_return(1);
      expect(subject.property).to.equal(1);
      subject.verify();
    });

    it('does not fail when not called', function () {
      allow(subject).to.set('property', 1);
      subject.verify();
    });
  });

  describe('.get/.set work together', function () {
    it('work together', function () {
      allow(subject).to.set('property', 1);
      allow(subject).to.get('property').and_return(2);
      subject.property = 1;
      expect(subject.property).to.equal(2);
      subject.verify();
    });
  });
});
