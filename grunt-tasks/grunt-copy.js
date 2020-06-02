module.exports = function gruntCopy(grunt) {
  grunt.config('copy', {
    deploy: {
      files: [{
        expand: true,
        cwd: '',
        src: ['**'],
        dest: '',
      }],
    },
    model: {
      expand: true,
      src: 'bundle/**',
      dest: 'deploy/'
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
