module.exports = (grunt) -> 
    grunt.initConfig {
        jshint: {
            options: {
                "sub": true
            },
            all: ['src/**/*.js']
        }
    }
    
    grunt.loadNpmTasks 'grunt-contrib-jshint'