'use strict';

var expect = require('expect.js'),
    qualifier = require('../lib/qualifier.js');

describe('qualifier', function () {
  var subject,
      details;

  beforeEach(function () {
    details = {};
    subject = qualifier(details);
  });

  describe('once', function () {
    it('sets count to 1', function () {
      subject.once();
      expect(details.count).to.equal(1);
    });
  });

  describe('twice', function () {
    it('sets count to 2', function () {
      subject.twice();
      expect(details.count).to.equal(2);
    });
  });

  describe('times', function () {
    it('sets count to 3', function () {
      subject.times(3);
      expect(details.count).to.equal(3);
    });
  });

  describe('and_return', function () {
    it('sets returns to array of arguments', function () {
      subject.and_return(1, 2, 3);
      expect(details.returns).to.eql([1, 2, 3]);
    });
  });
});
