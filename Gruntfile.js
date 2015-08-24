module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    watch: {
      karma: {
        files: [ 'ng-segmentio.js', 'test/unit/*.js' ],
        tasks: [ 'karma:unit:run' ] // NOTE the :run flag
      }
    },

    karma: {
      options: {
        browsers: [ 'PhantomJS' ],
        frameworks: [ 'jasmine' ]
      },

      unit: {
        singleRun: true,
        options: {
          files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'ng-segmentio.js',
            'test/unit/**/*.js'
          ]
        }
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      build: {
        files: {
          'build/ng-segmentio.min.js': [ 'ng-segmentio.js' ]
        }
      }
    },

    uglify: {
      build: {
        files: {
          'build/ng-segmentio.min.js': [ 'ng-segmentio.js' ]
        }
      }
    },

    standard: {
      options: {
        format: true
      },
      app: {
        src: [
          'ng-segmentio.js'
        ]
      }
    }
  })

  // Default task.
  grunt.registerTask('default', [
    'standard',
    'ngAnnotate',
    'uglify'
  ])

  grunt.registerTask('test', [
    'karma',
    'validate-shrinkwrap'
  ])
}
