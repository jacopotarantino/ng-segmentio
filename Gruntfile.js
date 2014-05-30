module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    watch: {
      karma: {
        files: ['angular-segmentio.js', 'test/unit/*.js'],
        tasks: ['karma:unitBackground:run'] //NOTE the :run flag
      }
    },
    karma: {
      options: {
        configFile: 'config/karma.conf.js',
        browsers: ['Chrome']
      },

      unit: {
        singleRun: true
      },

      unitBackground: {
        background: true
      }
    },
    uglify: {
      build: {
        files: {
          'build/angular-segmentio.min.js': [
            'angular-segmentio.js'
          ]
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'uglify',
    'ngmin'
  ]);
};
