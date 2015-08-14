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
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
