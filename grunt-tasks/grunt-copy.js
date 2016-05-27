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
    manifest: {
      src: './manifest.appcache',
      dest: './deploy/manifest.appcache',
    },
    model: {
      expand: true,
      src: 'bundle/**',
      dest: 'deploy/'
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
