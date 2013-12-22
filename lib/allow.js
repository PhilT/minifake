'use strict';

module.exports = function allow(obj) {
  var object = obj;

  return {
    to: (function to() {
      return {
        receive: function receive(method) {
          var args = [].slice.call(arguments, 1),
              options = {required: false, not: false};
          return object.register(method, args, options);
        }
      };
    })()
  };
};
