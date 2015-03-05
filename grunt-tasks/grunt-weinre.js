module.exports = function(grunt) {
    grunt.config('weinre', {
        dev: {
            options: {
                httpPort: 8080,
                boundHost: '-all-',
                verbose: false,
                debug: false,
                readTimeout: 5,
                deathTimeout: 15
            }
        }
    });

    grunt.loadNpmTasks('grunt-weinre');
};
