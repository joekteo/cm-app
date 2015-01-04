'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    'app/**/**/**.js'
  ];

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    browserify: {
      dev: {
        src: ['app/public/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
      // test: {
      //   src: ['test/client/**/*test.js'],
      //   dest:'test/test_bundle.js',
      //   options:{
      //     transform: ['debowerify']
      //   }
      // }
    },
    jshint: {
      all: srcFiles,
      options: {
        jshintrc: true
      }
    },
    copy:{
      app: {
        cwd: 'app/',
        src: ['*.html'],
        expand: true,
        dest: 'build/'
      }
    },
    clean: {
      dev: {
        src: ['build/**/*.js']
      }
      // css: {
      //   src: ['build/css/']
      // }
    },
    uglify: {
      my_target: {
        options: {
          compress: true
        },
        files: {
          './build/bundle.min.js': ['./build/bundle.js']
        }
      }
    },
    watch: {
      script: {
        files: [
          'app/**/**.js',
          'app/**.js'
        ],
        tasks: ['build:js'],
        options: {
          livereload: true
        }
      }
      // css: {
      //   files: [
      //     'app/assets/stylesheets/**/*.scss',
      //     'app/assets/stylesheets/**/*.sass',
      //     'app/**/*.html'
      //   ],
      //   tasks: ['build:css'],
      //   options: {
      //     livereload: true
      //   }
      // }
    },
    jscs: {
      src: srcFiles,
      options: {
        config: '.jscsrc'
      }
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'copy:app', 'browserify:dev']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('default', ['test']);
};
