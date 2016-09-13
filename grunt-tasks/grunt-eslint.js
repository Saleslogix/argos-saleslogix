module.exports = function gruntEslint(grunt) {
  grunt.config('eslint', {
    options: {
      configFile: '.eslintrc.js',
    },
    target: [
      'src/**/*.js',
    ],
  });

  grunt.loadNpmTasks('grunt-eslint');
};
