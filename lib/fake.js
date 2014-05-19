'use strict';

var xj = require('./xj.js'),
    callStore = require('./call_store.js'),
    callRecorder = require('./call_recorder.js'),
    qualifierLib = require('./qualifier.js'),
//    fakes = [],
    fake;

fake = function fake(object, options) {
  options = options || {};
  var self,
      calls = options.callStore || callStore(),
      recorder = options.callRecorder || callRecorder(calls);

  self = {
    name: options.name || 'Fake',
    register: function register(method, args, options) {
      options = options || {};
      var qualifier = options.qualifier || qualifierLib(),
          lastCallDetails;

      lastCallDetails = {
        called: 0,
        required: options.required
      };
      calls.store(method, args, lastCallDetails);

      if (options.property) {
        if (typeof this[method] === 'function') {
          throw xj.error('cannot register a property for `' + method + '` as it already exists as a method');
        }
        Object.defineProperty(this, method, {
          get: recorder.record.bind(this),
          set: recorder.record.bind(this)
        });
      }
      else {
        if (Object.getOwnPropertyDescriptor(this, method)) {
          throw xj.error('cannot register `method` as it already exists as a property');
        }
        this[method] = recorder.record.bind(this);
      }
      return qualifier;
    }
  };

//  fakes.push(self);
  return self;
};

module.exports = {
  fake: fake
};
