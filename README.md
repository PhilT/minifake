# MiniFake

Simple fakes with contract tests inspired by RSpec, Bogus and works by JB Rainsberger.

## Synopsis

Currently works with expect.js.

## Features

* Single interface for mocking and stubing (through `fake('name')`)
* Automatic mock verification (when using mocha/jasmine or any framework that supports global afterEach)
* mock/stub properties
* [TODO] Built in contract test discovery

## Usage

### A note on using with Mocha (and probably other testing frameworks)

This may be obvious to those that have used JS testing frameworks for a while.

Don't assign variables in describe functions. Only declare them in the describe and assign them in a beforeEach. Fakes will misbehave (due to being verified in a beforeEach) if assigned like this. It's probably advisable to use beforeEach to assign any variable not just fakes.

    var fake = require('minifake').fake,
        expect = require('minifake').expect;
    ...

    // Optional options hash can be passed in.
    // Currently supports fakes with ordered calls
    var thing = fake('Thing', {ordered: true});

### mocks

    expect(thing).to.receive('method', param1, param2, ...).and_return('something');
    expect(thing).to.get('property').and_return('something');
    expect(thing).to.set('property', param1);

### stubs

    allow(thing).to.receive('another_method').and_return('something');
    expect(thing.another_method()).to.equal('something');
    allow(thing).to.get('property').and_return('something');
    allow(thing).to.set('property', param1);

### number of times a fake is called

    expect(thing).to.receive('method').once().and_return(1);

### return something different on each call

    expect(thing).to.receive('method').twice().and_return(1, 2);

### Second receive overrides first

    expect(thing).to.receive('method').and_return(1);
    expect(thing).to.receive('method').and_return(2);

    thing.method(); // => 2

### Supports different parameters

    expect(thing).to.receive('method', 1, 2);
    expect(thing).to.receive('method', 2, 2);

## TODO

* Identify missing contract tests (i.e. mocks used without corresponding test)
* Accept anyArgs() in parameter list for a method/property

## Development

Runs jshint and tests:

    grunt watch

