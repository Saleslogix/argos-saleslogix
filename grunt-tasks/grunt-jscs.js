module.exports = function(grunt) {
    grunt.config('jscs', {
        src: ['src/**/*.js', 'grunt-tasks/**/*.js', 'configuration/**/*.js'],
        options: {
            config: '.jscsrc'
        }
    });

    grunt.loadNpmTasks('grunt-jscs');
};

