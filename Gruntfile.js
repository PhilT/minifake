module.exports = function (grunt) {
  'use strict';
  var PORT = 80;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: { src: ['lib/**/*.js', 'spec/**/*.js'] },
      options: {
        jshintrc: '.jshintrc'
      }
    },

    mochaTest: {
      test: {
        options: {
          // Ensure tests are reloaded when in same process (i.e. with spawn: false)
          clearRequireCache: true
        },
        src: ['spec/**/*_spec.js']
      }
    },

    watch: {
      options: {
        spawn: false,
        interrupt: true
      },
      mocha: {
        files: ['lib/**/*.js', 'spec/**/*.js'],
        tasks: ['jshint', 'mochaTest']
      }
    }
  });

  // just hint and test the changed file only
  grunt.event.on('watch', function (action, path) {
    grunt.config('jshint.all.src', path);

    var spec_path = path.replace(/^lib(.*).js$/, 'spec$1_spec.js');
    grunt.config('mochaTest.test.src', spec_path);
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', 'mochaTest');
};
