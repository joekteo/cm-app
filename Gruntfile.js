'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    'app/**/**/**.js',
    'app/**/*.js',
    'app/tests/*.js'
  ];

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mongoimport');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    browserify: {
      dev: {
        src: ['app/public/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },
      test: {
        src: ['app/tests/client/*.js'],
        dest:'build/tests/test_bundle.js',
        options:{
          transform: ['debowerify']
        }
      }
    },
    jshint: {
      all: srcFiles,
      options: {
        jshintrc: true
      }
    },
    copy: {
      app: {
        cwd: 'app/',
        src: ['*.html', '*.css'],
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
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    mongoimport: {
      options: {
        db: 'cm_development',
        host: 'localhost',
        port: '27017',
        stopOnError: true,
        collections: [
          {
            name: 'feeds',
            type: 'json',
            file: './app/server/lib/feeds.json',
            jsonArray: true,
            upsert: true,
            drop: true
          }
        ]
      }
    },
    simplemocha: {
      src: ['app/tests/feedTest.js']
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'copy:app', 'browserify:dev', 'mongoimport']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('test', ['build:test', 'jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('test:client', ['browserify:test', 'karma:unit']);
  grunt.registerTask('default', ['test']);
};
