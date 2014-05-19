'use strict';

/*
so we need spies:

* All the fakes need to register interactions in a persistent list
* Then log calls on an object that passed into verifyContract
* Finally, verify() ensures the all interactions have corresponding calls on the spy
 */

var expect = require('../lib/expect.js'),
    allow = require('../lib/allow.js'),
    fake = require('../lib/core.js').fake,
    verifyAll = require('../lib/core.js').verifyAll,
    verifyContract = require('../lib/contract.js'),
    consumer,
    collaborator;

collaborator = {
  calledWith: '',
  callMeWith: function callMeWith(string) {
    this.calledWith = string;
  },
  returns: function returns() {
    return this.calledWith;
  }
};

consumer = function subject(collaborator) {
  return {
    method: function method() {
      collaborator.callMeWith('Something');
    },
    methodReturns: function methodReturns() {
      return collaborator.returns();
    }
  };
};

describe('collaborator', function () {
  describe('.callMeWith', function () {
    var subject;

    beforeEach(function () {
      subject = Object.create(collaborator);
      verifyContract(subject);
    });

    it('accepts a string - fulfilling contract', function () {
      subject.callMeWith('something');
      expect(subject.calledWith).to.equal('something');
    });

    it('no params - does not fulfil contract', function () {
      subject.callMeWith();
      expect(subject.calledWith).to.equal(undefined);
    });
  });
});

describe('contract', function () {
  describe('no object exists yet', function () {
    it('does not attempt to verify contract', function () {

    });
  });

  describe('.verifyContract', function () {
    describe('object exists', function () {
      describe('expectation exists', function () {
        it('passes', function (done) {

        });
      });

      describe('when no expectation exists', function () {
        it('fails', function (done) {

        });
      });
    });
  });
});
