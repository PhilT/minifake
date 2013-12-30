'use strict';

var expect = require('../lib/fake_expect.js'),
    fake = require('../lib/fake.js');

describe('fake', function () {
  describe('#receive', function () {
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
      logger.verify();
    });

    it('fails when expecting to log an account closed message', function () {
      expect(logger).to.receive('account_closed', account);
      expect(logger.verify).to.throwError(/Expected Logger.account_closed\(\[object Object\]\) to be called, but was not called./);
    });

    it('does not log an account closed message', function () {
      expect(logger).to.not.receive('account_closed', account);
      logger.verify();
    });

    it('fails when expecting not to log an account closed message', function () {
      expect(logger).to.not.receive('account_closed', account);
      account.close();
      expect(logger.verify).to.throwError(/Expected Logger.account_closed\(\[object Object\]\) to not be called, but was called./);
    });
  });

  it('second receive overrides first', function () {
    var subject = fake();

    expect(subject).to.receive('method').and_return(1);
    expect(subject).to.receive('method').and_return(2);

    expect(subject.method()).to.equal(2);
  });

  describe('once', function () {
    var subject = fake();

    beforeEach(function () {
      expect(subject).to.receive('method').once().and_return(1);
    });

    it('calls fake once', function () {
      subject.method();
      subject.verify();
    });

    it('fails when called twice', function () {
      subject.method();
      subject.method();
      expect(subject.verify).to.throwError(/Expected Fake.method\(\) to be called once, but was called twice./);
    });

    it('returns a value', function () {
      expect(subject.method()).to.equal(1);
    });
  });

  describe('twice', function () {
    var subject = fake();

    beforeEach(function () {
      expect(subject).to.receive('method').twice().and_return(1);
    });

    it('calls fake twice', function () {
      subject.method();
      subject.method();
      subject.verify();
    });

    it('fails when only called once', function () {
      subject.method();
      expect(subject.verify).to.throwError(/Expected Fake.method\(\) to be called twice, but was called once./);
    });

    it('returns a value', function () {
      expect(subject.method()).to.equal(1);
      expect(subject.method()).to.equal(1);
      subject.verify();
    });

    it('returns different value on subsequent calls', function () {
      expect(subject).to.receive('method').twice().and_return(1, 2);
      expect(subject.method()).to.equal(1);
      expect(subject.method()).to.equal(2);
      subject.verify();
    });
  });

  describe('verifyAll', function () {
    it('verifies all fakes', function () {
      var fake1 = fake('Fake1'),
          fake2 = fake('Fake2');

      expect(fake1).to.receive('method1');
      expect(fake2).to.receive('method2');

      fake1.method1();

      expect(fake1.verifyAll).to.throwError();
    });
  });
});
