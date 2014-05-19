'use strict';

var expect = require('expect.js'),
    callRecorder = require('../lib/call_recorder.js');

describe('callRecorder', function () {
  describe('record', function () {
    var fakeStore,
        subject,
        mockFake;

    beforeEach(function () {
      fakeStore = {
        details: {},
        fetch: function fetch(method, args) {
          this.method = method;
          this.args = args;
          return this.details;
        }
      };

      mockFake = {
        name: 'Name',     // should be passed in
        method: 'method'  // should be passed in
      };

      subject = callRecorder(fakeStore);
    });

    it('fetches previously stored call details', function () {
      subject.record.call(mockFake, 'arg1', 'arg2');
      expect(fakeStore.args).to.eql(['arg1', 'arg2']);
      expect(fakeStore.method).to.equal('method');
      expect(fakeStore.details).to.eql({order: 0, called: NaN});
    });
  });
});
