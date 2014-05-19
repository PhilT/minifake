'use strict';

module.exports = function qualifier(details) {
  return {
    once: function once() {
      details.count = 1;
      return this;
    },
    twice: function twice() {
      details.count = 2;
      return this;
    },
    times: function times(count) {
      details.count = count;
    },
    and_return: function and_return() {
      details.returns = [].slice.call(arguments);
    }
  };
};
