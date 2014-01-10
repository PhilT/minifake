'use strict';

var expect = require('expect.js'),
    api = require('../lib/api.js');

describe('api', function () {
  describe('.setup', function () {
    var fake,
        registerCalledWith,
        receive,
        assertion;

    beforeEach(function () {
      fake = {
        register: function register(method, args, options) {
          registerCalledWith = {method: method, args: args, options: options};
        }
      };
      assertion = {obj: fake};
      registerCalledWith = {};
    });

    describe('returns receive function and ', function () {
      beforeEach(function () {
        receive = api.setup('required', 'property');
      });

      it('calls register with method', function () {
        receive.call(assertion, 'method');
        expect(registerCalledWith.method).to.equal('method');
      });

      it('calls register arguments', function () {
        receive.call(assertion, null, 1, 2);
        expect(registerCalledWith.args).to.eql([1, 2]);
      });

      it('calls register with correct options', function () {
        receive.call(assertion);
        expect(registerCalledWith.options).to.eql({
          required: 'required',
          not: undefined,
          property: 'property'
        });
      });

      it('calls register with "not" set when flags on fake set', function () {
        assertion.flags = {not: 'not'};
        receive.call(assertion);
        expect(registerCalledWith.options.not).to.equal('not');
      });
    });
  });
});
