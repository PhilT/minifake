'use strict';

// verifyAll is explicitly called to verify fakes
// as we need to check they fail correctly
// and that the error messages are constructed correctly.
//
// Normally this would be called in an afterEach.

var expect = require('../lib/fake_expect.js'),
    allow = require('../lib/allow.js'),
    fake = require('../lib/core.js').fake,
    verifyAll = require('../lib/core.js').verifyAll;

describe('core', function () {
  var subject;

  describe('.receive', function () {
    var logger, account, fakeHandler;

    beforeEach(function () {
      logger = fake('Logger');
      account = {
        close: function close() {
          logger.account_closed(this);
        }
      };
      account.logger = logger;
    });

    it('logs an account closed message', function () {
      expect(logger).to.receive('account_closed', account);
      account.close();
      verifyAll();
    });

    it('fails when expecting to log an account closed message', function () {
      expect(logger).to.receive('account_closed', account);
      expect(verifyAll).to.throwError(/Expected Logger.account_closed\(\[object Object\]\) to be called, but was not called./);
    });

    it('does not log an account closed message', function () {
      expect(logger).to.not.receive('account_closed', account);
      verifyAll();
    });

    it('fails when expecting not to log an account closed message', function () {
      expect(logger).to.not.receive('account_closed', account);
      account.close();
      expect(verifyAll).to.throwError(/Expected Logger.account_closed\(\[object Object\]\) to not be called, but was called./);
    });

    it('supports multiple calls with different parameters', function () {
      subject = fake();

      expect(subject).to.receive('method', 1).and_return(1);
      expect(subject).to.receive('method', 2).and_return(2);

      expect(subject.method(1)).to.equal(1);
      expect(subject.method(2)).to.equal(2);

      verifyAll();
    });

    it('modifies call with same parameters', function () {
      subject = fake('FakeWithParams');

      expect(subject).to.receive('method', 1).and_return(1);

      subject.method(1);

      verifyAll();
    });
  });

  it('second .receive overrides first', function () {
    subject = fake('FakeOverride');

    expect(subject).to.receive('method').and_return(1);
    expect(subject).to.receive('method').and_return(2);

    expect(subject.method()).to.equal(2);

    verifyAll();
  });

  describe('.once', function () {
    beforeEach(function () {
      subject = fake('FakeOnce');
      expect(subject).to.receive('method').once().and_return(1);
    });

    it('calls fake once', function () {
      subject.method();
      verifyAll();
    });

    it('fails when called twice', function () {
      subject.method();
      subject.method();
      expect(verifyAll).to.throwError(/Expected FakeOnce.method\(\) to be called once, but was called twice./);
    });

    it('returns a value', function () {
      expect(subject.method()).to.equal(1);
      verifyAll();
    });
  });

  describe('.twice', function () {
    beforeEach(function () {
      subject = fake('FakeTwice');
      expect(subject).to.receive('method').twice().and_return(1);
    });

    it('calls fake twice', function () {
      subject.method();
      subject.method();

      verifyAll();
    });

    it('fails when only called once', function () {
      subject.method();
      expect(verifyAll).to.throwError(/Expected FakeTwice.method\(\) to be called twice, but was called once./);
    });

    it('returns a value', function () {
      expect(subject.method()).to.equal(1);
      expect(subject.method()).to.equal(1);

      verifyAll();
    });

    it('returns different value on subsequent calls', function () {
      expect(subject).to.receive('method').twice().and_return(1, 2);
      expect(subject.method()).to.equal(1);
      expect(subject.method()).to.equal(2);

      verifyAll();
    });
  });

  describe('.times', function () {
    it('calls fake three times', function () {
      subject = fake('Fake3Times');
      expect(subject).to.receive('method').times(3);

      subject.method();
      subject.method();
      subject.method();
    });
  });

  describe('.verifyAll', function () {
    it('verifies all fakes', function () {
      var fake1 = fake('Fake1'),
          fake2 = fake('Fake2');

      expect(fake1).to.receive('method1');
      expect(fake2).to.receive('method2');

      fake1.method1();

      expect(verifyAll).to.throwError();
    });
  });
});
