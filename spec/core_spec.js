'use strict';

// verifyAll is used to manually verify fakes
// as we need to check they fail correctly
// and that the error messages are constructed correctly

var expect = require('../lib/fake_expect.js'),
    fake = require('../lib/core.js').fake,
    fakes = require('../lib/core.js').fakes,
    verifyAll = require('../lib/core.js').verifyAll;

describe('core', function () {
  describe('receive()', function () {
    var logger, account;

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
  });

  it('second receive overrides first', function () {
    var subject = fake();

    expect(subject).to.receive('method').and_return(1);
    expect(subject).to.receive('method').and_return(2);

    expect(subject.method()).to.equal(2);

    verifyAll();
  });

  describe('once()', function () {
    var subject;

    beforeEach(function () {
      subject = fake();
      expect(subject).to.receive('method').once().and_return(1);
    });

    it('calls fake once', function () {
      subject.method();
      verifyAll();
    });

    it('fails when called twice', function () {
      subject.method();
      subject.method();
      expect(verifyAll).to.throwError(/Expected Fake.method\(\) to be called once, but was called twice./);
    });

    it('returns a value', function () {
      expect(subject.method()).to.equal(1);
      verifyAll();
    });
  });

  describe('twice()', function () {
    var subject;

    beforeEach(function () {
      subject = fake();
      expect(subject).to.receive('method').twice().and_return(1);
    });

    it('calls fake twice', function () {
      subject.method();
      subject.method();

      verifyAll();
    });

    it('fails when only called once', function () {
      subject.method();
      expect(verifyAll).to.throwError(/Expected Fake.method\(\) to be called twice, but was called once./);
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

  describe('verifyAll', function () {
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
