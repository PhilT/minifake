'use strict';

module.exports.setup = function setup(required, property) {
  return function receive(message) {
    return this.obj.register(
      message,
      [].slice.call(arguments, 1),
      {
        required: required,
        not: this.flags && this.flags.not,
        property: property
      }
    );
  };
};
