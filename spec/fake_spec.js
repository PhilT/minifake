'use strict';

var expect = require('expect.js'),
    fake = require('../lib/fake.js').fake;

describe('fake', function () {
  var subject,
      fakeStore,
      fakeRecorder,
      fakeQualifier = {},
      options;

  beforeEach(function () {
    fakeStore = {
      store: function store(method, args, details) {
        this.method = method;
        this.args = args;
        this.details = details;
      }
    };

    fakeRecorder = {
      record: function record(value) {
        this.called = (this.called || 0) + 1;
        this.withValue = value;
        return true;
      }
    };

    options = {
      callStore: fakeStore,
      callRecorder: fakeRecorder
    };
    subject = fake(null, options);
  });

  it('does not break when no options', function () {
    subject = fake();
  });

  it('can set a name', function () {
    options.name = 'name';
    subject = fake(null, options);
    expect(subject.name).to.equal('name');
  });

  it('has a default name', function () {
    expect(subject.name).to.equal('Fake');
  });

  describe('.register', function () {
    it('stores a method call', function () {
      subject.register('method', 'args', {required: true});

      expect(fakeStore.method).to.equal('method');
      expect(fakeStore.args).to.equal('args');
      expect(fakeStore.details.required).to.equal(true);
    });

    it('adds method to fake', function () {
      subject.register('method');
      expect(subject.method).to.not.throwException();
    });

    it('sets the method to a recorder', function () {
      subject.register('method');
      subject.method();
      expect(subject.called).to.equal(1);
    });

    describe('when a property', function () {
      beforeEach(function () {
        subject.register('property', null, {property: true});
      });

      it('creates a getter', function () {
        subject.property = 'value';
        expect(subject.called).to.equal(1);
        expect(subject.withValue).to.equal('value');
      });

      it('creates a setter', function () {
        var ignored = subject.property;
        expect(subject.called).to.equal(1);
        expect(subject.withValue).to.equal(undefined);
      });

      describe('when a method already exists', function () {
        beforeEach(function () {
          subject.register('method', null, {property: false});
        });

        it('fails to register a property of the same name', function () {
          expect(function () {
            subject.register('method', null, {property: true});
          }).to.throwException(/cannot register a property for `method` as it already exists as a method/);
        });
      });

      describe('when a property already exists', function () {
        it('fails to register a method of the same name', function () {
          expect(function () {
            subject.register('property', null, {property: false});
          }).to.throwException(/cannot register `method` as it already exists as a property/);
        });
      });
    });

    it('returns a qualifier', function () {
      var result = subject.register('method', null, {qualifier: fakeQualifier});
      expect(result).to.equal(fakeQualifier);
    });
  });
});
