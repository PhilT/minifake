module.exports = function (grunt) {
  'use strict';
  var PORT = 80;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'spec/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'progress',

          // Ensure tests are reloaded when in same process (i.e. with spawn: false)
          clearRequireCache: true
        },
        src: ['spec/**/*.js']
      }
    },

    watch: {
      options: {
        spawn: false,
        interrupt: true
      },
      hint: {
        files: ['lib/**/*.js', 'spec/**/*.js'],
        tasks: ['jshint']
      },
      mocha: {
        files: ['lib/**/*.js', 'spec/**/*.js'],
        tasks: ['mochaTest']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
};
