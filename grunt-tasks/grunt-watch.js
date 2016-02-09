module.exports = function gruntWatch(grunt) {
  grunt.config('watch', {
    options: {
      livereload: true,
    },
    babel: {
      files: ['src/**/*.js'],
      tasks: ['lint'],
      options: {
        spawn: false,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
