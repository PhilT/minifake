'use strict';

var fakes = [],
    xj = require('./xj.js'),
    callStore = require('./call_store.js'),
    fake,
    verifyAll;

fake = function fake(object, options) {
  options = options || {};
  var name = options.name || 'Fake',
      ordered = options.ordered,
      callCount = 0,
      calls = callStore(),
      self;

  self = {
    name: name,
    register: function register(method, args, options) {
      var methodName = method,
        lastCallDetails = {
        called: 0,
        not: options.not,
        required: options.required
      };

      calls.store(method, args, lastCallDetails);

      if (options.property) {
        methodName = method + '_property';
        if (!this.hasOwnProperty(method)) {
          Object.defineProperty(this, method, {
            get: function () { return this[methodName](); },
            set: function (value) { this[methodName](value); }
          });
        }
      }

      if (this !== self) { throw new Error('This not equal to self'); }

      this[methodName] = function () {
        var args = [].slice.call(arguments),
            callDetails,
            returnValue;

        callDetails = calls.fetch(method, args);
        if (callDetails) {
          returnValue = callDetails.returns &&
            (callDetails.returns[callDetails.called] ||
            callDetails.returns[callDetails.returns.length - 1]);

          // TODO: need to handle multiple calls to the same
          // method/signature when order is important
          if (!callDetails.called) {
            callDetails.order = callCount;
            callCount += 1;
          }

          callDetails.called += 1;

          return returnValue;
        }
        else {
          throw xj.error('unexpected call ' + name + '.' + method +
            '(' + args.join(', ') + ')');
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
          negative = ['', ''],
          called = 'called',
          count = 0;

      calls.forEach(function (method, args, details) {
        if (details.required) {
          if (ordered && details.called && count !== details.order) {
            countText = [' in order', ''];
            negative = ['', 'not'];
            called = '';
            failed = true;
          }
          else if (!details.not && details.called) {
            if (typeof details.count !== 'undefined' && details.count !== details.called) {
              countText = [' ' + xj.countToWord(details.count), ' ' + xj.countToWord(details.called)];
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
          throw xj.error('expected ' + name + '.' + method +
            '(' + args.join(', ') + ') to ' +
             negative[0] + 'be ' +
            'called' + countText[0] +
            ', but was ' + negative[1] + called +
            countText[1] + '.');
        }

        count += 1;
      });
    }
  };

  fakes.push(self);

  return self;
};

verifyAll = function verifyAll() {
  var fakesToVerify = fakes;
  fakes = [];

  fakesToVerify.forEach(function (fake) {
    fake.verify();
  });
};

module.exports = {
  fake: fake,
  verifyAll: verifyAll
};
