module.exports = function(grunt) {
    grunt.config('connect', {
        server: {
            options: {
                port: 8000,
                hostname: '127.0.0.1',
                base: '../../',
                directory: '../../'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};
