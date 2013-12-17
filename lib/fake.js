var fake = function fake(name) {
  var calls = {};

  return {
    register: function register(method, not, args) {
      calls[method] = {args: args, not: not, called: false};
      this[method] = function () {
        var calledArgs = [].slice.call(arguments),
            i = calledArgs.length - 1,
            matching = true;

        if (calledArgs.length !== args.length) return;

        for (; i >= 0; i--) {
          if (calledArgs[i] !== args[i]) {
            matching = false;
            break;
          }
        }

        if (matching) {
          calls[method].called = true;
        }
      };
    },
    verify: function verify() {
      Object.keys(calls).forEach(function(methodName) {
        var method = calls[methodName];
        if (method.not ? method.called : !method.called) {
          throw Error('Expected ' + name + '.' + methodName +
            '(' + method.args.join(', ') + ') to ' + 
            (method.not ? 'not be ' : 'be ') + 
            'called, but was ' + (method.not ? '' : 'not ') + 'called.');
        }
      });
    }
  };
};

module.exports = fake;
