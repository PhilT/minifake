'use strict';

var expect = require('../lib/fake_expect.js'),
    fake = require('../lib/fake.js');

describe('fake', function () {
  describe('#receive', function () {
    var logger, subject;

    beforeEach(function () {
      logger = fake('Logger');
      subject = {
        close: function close() {
          logger.account_closed(this);
        }
      };
      subject.logger = logger;
    });

    it('logs an account closed message', function () {
      expect(logger).to.receive('account_closed', subject);
      subject.close();
      logger.verify();
    });

    it('fails to log an account closed message', function () {
      expect(logger).to.receive('account_closed', subject);
      expect(logger.verify).to.throwError(/Expected Logger.account_closed\(\[object Object\]\) to be called, but was not called./);
    });

    it('does not log an account closed message', function () {
      expect(logger).to.not.receive('account_closed', subject);
      logger.verify();
    });

    it('fails to not log an account closed message', function () {
      expect(logger).to.not.receive('account_closed', subject);
      subject.close();
      expect(logger.verify).to.throwError(/Expected Logger.account_closed\(\[object Object\]\) to not be called, but was called./);
    });
  });
});
