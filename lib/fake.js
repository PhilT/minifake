'use strict';

var fake = function fake(name) {
  var calls = {};

  return {
    register: function register(method, args, options) {
      calls[method] = {
        args: args,
        not: options.not,
        called: false,
        required: options.required
      };
      this[method] = function () {
        var calledArgs = [].slice.call(arguments),
            i = calledArgs.length - 1,
            matching = true;

        if (calledArgs.length !== args.length) { return; }

        for (; i >= 0; i -= 1) {
          if (calledArgs[i] !== args[i]) {
            matching = false;
            break;
          }
        }

        if (matching) {
          calls[method].called = true;
        }

        return calls[method].returns;
      };

      return {
        and_return: function (value) {
          calls[method].returns = value;
        }
      };
    },

    verify: function verify() {
      Object.keys(calls).forEach(function (methodName) {
        var method = calls[methodName];
        if (method.required && (method.not ? method.called : !method.called)) {
          throw new Error('Expected ' + name + '.' + methodName +
            '(' + method.args.join(', ') + ') to ' +
            (method.not ? 'not be ' : 'be ') +
            'called, but was ' + (method.not ? '' : 'not ') + 'called.');
        }
      });
    }
  };
};

module.exports = fake;
