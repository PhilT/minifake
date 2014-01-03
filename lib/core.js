'use strict';

var fakes = [],
    util = require('./util.js'),
    callStore = require('./call_store.js');

module.exports.verifyAll = function verifyAll() {
  var fakesToVerify = fakes;
  fakes = [];

  fakesToVerify.forEach(function (fake) {
    fake.verify();
  });
};

module.exports.fake = function fake(name) {
  var calls = callStore(),
      self,
      noop;

  name = name || 'Fake';

  self = {
    name: name,
    register: function register(method, args, options) {
      var lastCallDetails = {
        called: 0,
        not: options.not,
        required: options.required
      };

      calls.store(method, args, lastCallDetails);

      this[method] = function () {
        var callDetails,
            returnValue;

        callDetails = calls.fetch(method, [].slice.call(arguments));
        if (callDetails) {
          returnValue = callDetails.returns &&
            (callDetails.returns[callDetails.called] ||
            callDetails.returns[callDetails.returns.length - 1]);
          callDetails.called += 1;
          return returnValue;
        }
      };

      return {
        once: function once() {
          lastCallDetails.count = 1;
          return this;
        },
        twice: function twice() {
          lastCallDetails.count = 2;
          return this;
        },
        times: function times(count) {
          lastCallDetails.count = count;
        },
        and_return: function and_return() {
          lastCallDetails.returns = [].slice.call(arguments);
        }
      };
    },

    verify: function verify() {
      var failed = false,
          countText = ['', ''],
          negative = ['', ''];

      calls.forEach(function (method, args, details) {
        if (details.required) {
          if (!details.not && details.called) {
            if (typeof details.count !== 'undefined' && details.count !== details.called) {
              countText = [' ' + util.countToWord(details.count), ' ' + util.countToWord(details.called)];
              failed = true;
            }
          }
          else if (!details.not && !details.called) {
            negative = ['', 'not '];
            failed = true;
          }
          else if (details.not && details.called) {
            negative = ['not ', ''];
            failed = true;
          }
        }

        if (failed) {
          throw new Error('Expected ' + name + '.' + method +
            '(' + args.join(', ') + ') to ' +
             negative[0] + 'be ' +
            'called' + countText[0] +
            ', but was ' + negative[1] + 'called' +
            countText[1] + '.');
        }
      });
    }
  };

  fakes.push(self);

  return self;
};
