module.exports = (grunt) -> 
    grunt.initConfig {
        jshint: {
            options: {
                "sub": true
            },
            all: ['src/**/*.js']
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '../../'
                }
            }
        },
        jasmine: {
            src: ['src/**/*.js'],
            options: {
                specs: 'tests/**/*.spec.js',
                host: 'http://localhost:8000/products/argos-saleslogix/',
                template: 'GruntRunner.tmpl'
            }
        }
    }
    
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-contrib-jasmine'

    grunt.registerTask 'test', ['connect', 'jasmine']
    grunt.registerTask 'default', ['test']

