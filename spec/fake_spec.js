'use strict';

var fake = require('../lib/fake.js').fake,
    expect = require('../lib/fake.js').expect;

describe('fake', function () {
  it('loads and can use a fake', function () {
    var subject = fake();

    expect(subject).to.receive('method');

    subject.method();
  });
});

// This test fails intentionally to ensure
// verify is being called in an afterEach hook.
//
// Unfortunately, I can't figure out a way to
// test this as it seems impossible to override afterEach.

// describe('fake', function () {
//   it('ensure fake is verified', function () {
//     expect(fake()).to.receive('method');
//   });
// });
