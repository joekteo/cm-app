'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    'app/**/**/**.js'
  ];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      all: srcFiles,
      options: {
        jshintrc: true
      }
    },
    jscs: {
      src: srcFiles,
      options: {
        config: '.jscsrc'
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('default', ['test']);
};
