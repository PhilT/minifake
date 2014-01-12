'use strict';

var expect = require('expect.js'),
    xj = require('../lib/xj.js');

describe('xj', function () {
  describe('.error', function () {
    it('instantiates a new Error with a message', function () {
      var error = xj.error('message');
      expect(error).to.be.a(Error);
      expect(error.message).to.equal('message');
    });
  });

  describe('.countToWord', function () {
    it('return "none" when passed 0', function () {
      expect(xj.countToWord(0)).to.equal('none');
    });

    it('retuns "once" when passed 1', function () {
      expect(xj.countToWord(1)).to.equal('once');
    });

    it('returns "twice" when passed 2', function () {
      expect(xj.countToWord(2)).to.equal('twice');
    });

    it('returns "3 times" when passed 3', function () {
      expect(xj.countToWord(3)).to.equal('3 times');
    });
  });

  describe('.arrayCompare', function () {
    var array,
        equalArray,
        diffArray;

    beforeEach(function () {
      var obj = {};
      array = [1, obj];
      equalArray = [1, obj];
      diffArray = [1, {}];
    });

    it('returns true when arrays are the same', function () {
      var result = xj.arrayCompare(array, equalArray);
      expect(result).to.be(true);
    });

    it('returns false when arrays are different', function () {
      var result = xj.arrayCompare(array, diffArray);
      expect(result).to.be(false);
    });

    it('returns false when arrays are different lengths', function () {
      var a = [],
          b = [],
          result;

      b.length = 1;
      result = xj.arrayCompare(a, b);
      expect(result).to.be(false);
    });
  });

  describe('.last', function () {
    it('returns the last item', function () {
      expect(xj.last([1, 2, 3])).to.equal(3);
    });
  });
});
