'use strict';

var expect = require('../node_modules/expect.js/expect.js'),
    api = require('../lib/api.js');

describe('api', function () {
  describe('setupReceive', function () {
    var fake,
        registerCalledWith;

    beforeEach(function () {
      registerCalledWith = '';
      fake = {
        register: function register(method) {
          registerCalledWith = method;
        }
      };
    });

    it('returns a receive function that calls register', function () {
      var receive = api.setup(true),
          assertion = {obj: fake};
      receive.call(assertion, 'method');
      expect(registerCalledWith).to.equal('method');
    });
  });
});
