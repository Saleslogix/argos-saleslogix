module.exports = function(grunt) {
    grunt.config('eslint', {
        options: {
            configFile: '.eslintrc'
        },
        target: [
            'src/**/*.js',
            'tests/src/**/*.js',
            'configuration/**/*.js',
            'grunt-tasks/**/*.js'
        ]
    });

    grunt.loadNpmTasks('grunt-eslint');
};
