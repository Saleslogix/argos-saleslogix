module.exports = function gruntEslint(grunt) {
  grunt.config('eslint', {
    options: {
      configFile: '.eslintrc',
    },
    target: [
      'src/**/*.js',
    ],
  });

  grunt.loadNpmTasks('grunt-eslint');
};
