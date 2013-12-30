# MiniFake

Simple fakes with contract tests inspired by RSpec, Bogus and work by JB Rainsberger.

## Synopsis

Currently works with expect.js.

It's simple in that you always use `fake('name')` to create a new fake regardless of whether you're stubbing or mocking.

It extends the expect.js syntax by adding `allow()` to cover stubs as does the RSpec framework.

## Usage

    var expect = require('../lib/fake_expect.js'),
        fake = require('../lib/fake.js');
    ...
    var thing = fake('Thing');

### mocks

    expect(thing).to.receive('method', param1, param2, ...).and_return('something');

### stubs

    allow(thing).to.receive('another_method').and_return('something');
    expect(thing.another_method()).to.equal('something');

### verify expectations

Hope to move into an auto afterEach function.

    thing.verify();
    thing.verifyAll(); // verifies all fakes (not just the current one)

### number of times a fake is called

    expect(thing).to.receive('method').once().and_return(1);

### return something different on each call

    expect(thing).to.receive('method').twice().and_return(1, 2);

### Second receive overrides first

    expect(thing).to.receive('method').and_return(1);
    expect(thing).to.receive('method').and_return(2);

    thing.method(); // => 2

## TODO

* Different paramater calls should be separate expectations.
* Identify missing contract tests (i.e. mocks used without corresponding test)
