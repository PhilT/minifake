'use strict';

var xj = require('./xj.js');

module.exports = function callRecorder(callStore) {
  var callCount = 0;

  return {
    record: function () {
      var args = [].slice.call(arguments),
          callDetails,
          returnValue;

      callDetails = callStore.fetch(this.method, args);
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
        throw xj.error('unexpected call ' + this.name + '.' + this.method +
          '(' + args.join(', ') + ')');
      }
    }
  };
};
