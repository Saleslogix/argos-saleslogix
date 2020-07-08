module.exports = function gruntJasmine(grunt) {
  grunt.config('jasmine', {
    basic: {
      src: ['src-out/**/*.js', 'configuration/**/*.js', 'localization/**/*.js'],
      options: {
        specs: 'tests/**/*.spec.js',
        host: 'http://127.0.0.1:8001/products/argos-saleslogix/',
        template: 'GruntRunnerBasic.tmpl',
        summary: true,
        sandboxArgs: {
          args: [
            '--aggressive-cache-discard',
          ],
          dumpio: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
