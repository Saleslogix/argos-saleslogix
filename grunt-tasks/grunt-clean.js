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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
