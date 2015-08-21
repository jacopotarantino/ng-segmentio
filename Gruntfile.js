module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    watch: {
      karma: {
        files: [ 'angular-segmentio.js', 'test/unit/*.js' ],
        tasks: [ 'karma:unitBackground:run' ] // NOTE the :run flag
      }
    },

    karma: {
      options: {
        configFile: 'config/karma.conf.js',
        browsers: [ 'Chrome' ]
      },

      unit: {
        singleRun: true
      },

      unitBackground: {
        background: true
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
