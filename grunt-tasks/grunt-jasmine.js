module.exports = function gruntJasmine(grunt) {
  grunt.config('jasmine', {
    coverage: {
      src: ['src-out/**/*.js', 'configuration/**/*.js', 'localization/**/*.js'],
      options: {
        specs: 'tests/**/*.spec.js',
        host: 'http://127.0.0.1:8001/products/argos-saleslogix/',
        template: require('grunt-template-jasmine-istanbul'),
        templateOptions: {
          coverage: 'coverage/coverage.json',
          report: [{
            type: 'text-summary',
          }, {
            type: 'html',
            options: {
              dir: 'coverage',
            },
          }],
          template: 'GruntRunner.tmpl',
        },
      },
    },
    basic: {
      src: ['src-out/**/*.js', 'configuration/**/*.js', 'localization/**/*.js'],
      options: {
        specs: 'tests/**/*.spec.js',
        host: 'http://127.0.0.1:8001/products/argos-saleslogix/',
        template: 'GruntRunnerBasic.tmpl',
        summary: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
