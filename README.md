# MiniFake

Simple fakes with contract tests inpired by RSpec.

Currently works with expect.js.

    var expect = require('../lib/fake_expect.js'),
        fake = require('../lib/fake.js');
    ...
    var thing = fake('Thing');

    // mocks
    expect(thing).to.receive('method', param1, param2, ...);

    // stubs
    allow(thing).to.recevie('another_method').and_return('something');
    expect(thing.another_method()).to.equal('something');


    // verify mock expectations

    thing.verify();

