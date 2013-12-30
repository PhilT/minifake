# MiniFake

Simple fakes with contract tests inspired by RSpec, Bogus and work by JB Rainsberger.

## Synopsis

Currently works with expect.js.

## Features

* Single interface for mocking and stubing (through `fake('name')`)
* Automatic mock verification (when using mocha/jasmine or any framework that supports global afterEach)
* [TODO] Built in contract test discovery

## Usage

### A note on using with Mocha (and probably other testing frameworks)

This may be obvious to those that have used JS testing frameworks for a while.

Don't assign variables in describe functions. Only declare them in the describe and assign them in a beforeEach. Fakes will misbehave (due to being verified in a beforeEach) if assigned like this. It's probably advisable to use beforeEach to assign any variable not just fakes.

    var fake = require('minifake').fake,
        expect = require('minifake').expect;
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

