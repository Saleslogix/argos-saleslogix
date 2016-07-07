module.exports = function gruntClean(grunt) {
  grunt.config('clean', {
    js: ['src-out/**/*.js'],
    css: ['min/css/**/*.css'],
    deploys: {
      options: {
        // force to allow deleting outside our working directory (for argos-sdk)
        force: true
      },
      src: ''
    },
    bundle: {
      src: 'deploy/bundle',
      options: {
        force: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
