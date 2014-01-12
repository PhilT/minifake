// Reason to change: Add method calls indexed by signature (method name + args)

'use strict';

var xj = require('./xj.js');

module.exports = function callStore() {
  var calls = [],
      match;

  match = function match(method, args, func) {
    return calls.some(function (call) {
      if (call.method === method &&
          xj.arrayCompare(call.args, args)) {
        func(call);
        return true;
      }
    });
  };

  return {
    forEach: function forEach(func) {
      calls.forEach(function (call) {
        func(call.method, call.args, call.details);
      });
    },

    store: function store(method, args, details) {
      var found = match(method, args, function (call) {
        call.details = details;
      });

      if (!found) {
        calls.push({
          method: method,
          args: args,
          details: details
        });
      }
    },

    fetch: function fetch(method, args) {
      var details;

      match(method, args, function (call) {
        details = call.details;
      });

      return details;
    }
  };
};
