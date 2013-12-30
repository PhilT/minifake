'use strict';

var fakes = [];

module.exports = function fake(name) {
  var calls = {},
      self,
      countToWord;

  countToWord = function countToWord(value) {
    return ['none', 'once', 'twice', '' + value + ' times'][value];
  };

  self = {
    name: name,
    register: function register(method, args, options) {
      var argsMatch;

      argsMatch = function argsMatch(calledArgs) {
        var i = calledArgs.length - 1,
            matching = true;
        if (calledArgs.length !== args.length) { return false; }

        for (; i >= 0; i -= 1) {
          if (calledArgs[i] !== args[i]) {
            matching = false;
            break;
          }
        }
        return matching;
      };

      calls[method] = {
        args: args,
        not: options.not,
        called: 0,
        required: options.required
      };

      this[method] = function () {
        var methodCall,
            returnValue;

        if (argsMatch([].slice.call(arguments))) {
          methodCall = calls[method];
          returnValue = methodCall.returns &&
            (methodCall.returns[methodCall.called] ||
            methodCall.returns[methodCall.returns.length - 1]);
          methodCall.called += 1;
          return returnValue;
        }
      };

      return {
        once: function once() {
          calls[method].count = 1;
          return this;
        },
        twice: function twice() {
          calls[method].count = 2;
          return this;
        },
        and_return: function and_return() {
          calls[method].returns = [].slice.call(arguments);
        }
      };
    },

    verify: function verify() {
      Object.keys(calls).forEach(function (methodName) {
        var method = calls[methodName],
            countText = ['', ''],
            failed = false,
            negative = ['', ''];

        if (method.required) {
          if (!method.not && method.called) {
            if (typeof method.count !== 'undefined' && method.count !== method.called) {
              countText = [' ' + countToWord(method.count), ' ' + countToWord(method.called)];
              failed = true;
            }
          }
          else if (!method.not && !method.called) {
            negative = ['', 'not '];
            failed = true;
          }
          else if (method.not && method.called) {
            negative = ['not ', ''];
            failed = true;
          }
        }

        if (failed) {
          throw new Error('Expected ' + (name || 'Fake') + '.' + methodName +
            '(' + method.args.join(', ') + ') to ' +
             negative[0] + 'be ' +
            'called' + countText[0] +
            ', but was ' + negative[1] + 'called' +
            countText[1] + '.');
        }
      });
    },

    verifyAll: function verifyAll() {
      fakes.forEach(function (fake) {
        fake.verify();
      });
      fakes = [];
    }
  };

  fakes.push(self);

  return self;
};
