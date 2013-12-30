# MiniFake

Simple fakes with contract tests inspired by RSpec, Bogus and work by JB Rainsberger.

## Synopsis

Currently works with expect.js.

## Features

* Single interface for mocking and stubing (through `fake('name')`)
* Automatic mock verification (when using mocha/jasmine or any framework that supports global afterEach)
* [TODO] Built in contract test discovery

## Usage

Don't assign variables in describe functions. Declare the variable and assign it in a beforeEach. Fakes will misbehave if declared like this but it's probably advisable to use beforeEach anyway.

    var expect = require('../lib/fake_expect.js'),
        fake = require('../lib/fake.js');
    ...
    var thing = fake('Thing');

### mocks

    expect(thing).to.receive('method', param1, param2, ...).and_return('something');

### stubs

    allow(thing).to.receive('another_method').and_return('something');
    expect(thing.another_method()).to.equal('something');

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

## Development

Runs jshint and tests:

    grunt watch

