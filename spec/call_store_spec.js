'use strict';

var expect = require('expect.js'),
    callStore = require('../lib/call_store.js');

describe('callStore', function () {
  var subject;

  beforeEach(function () {
    subject = callStore();
  });

  describe('.store', function () {
    it('stores a new call details', function () {
      var obj = {};

      subject.store('method', [1], obj);

      expect(subject.fetch('method', [1])).to.equal(obj);
    });

    it('updates an existing call details', function () {
      var obj = {};

      subject.store('method', [1], {});
      subject.store('method', [1], obj);
      subject.store('method', [], obj);

      expect(subject.fetch('method', [1])).to.equal(obj);
    });
  });

  describe('.fetch', function () {
    it('returns call details', function () {
      var obj1 = {}, obj2 = {};

      subject.store('method', [1], obj1);
      subject.store('method', [2], obj2);
      expect(subject.fetch('method', [1])).to.equal(obj1);
      expect(subject.fetch('method', [2])).to.equal(obj2);
    });

    it('returns undefined when it cannot find details', function () {
      expect(subject.fetch('method', [1])).to.be(undefined);
    });
  });

  describe('.forEach', function () {
    it('iterates items calling passed function', function () {
      var expectedArgs = [],
          expectedObj = {},
          called = false;

      subject.store('method', expectedArgs, expectedObj);
      subject.forEach(function (method, args, details) {
        called = true;
        expect(method).to.equal('method');
        expect(args).to.equal(expectedArgs);
        expect(details).to.equal(expectedObj);
      });

      expect(called).to.be(true);
    });
  });
});
