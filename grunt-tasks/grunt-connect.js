module.exports = function gruntConnect(grunt) {
  grunt.config('connect', {
    server: {
      options: {
        port: 8001,
        hostname: '127.0.0.1',
        base: '../../',
        directory: '../../',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};
