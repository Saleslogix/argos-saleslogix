module.exports = function gruntClean(grunt) {
  grunt.config('clean', {
    js: ['src-out/**/*.js'],
    css: ['min/css/**/*.css'],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
