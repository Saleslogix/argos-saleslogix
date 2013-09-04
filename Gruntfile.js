module.exports = function(grunt) { 
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['src/**/*.js']
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '127.0.0.1',
                    base: '../../'
                }
            }
        },
        jasmine: {
            src: ['src/**/*.js'],
            options: {
                specs: 'tests/**/*.spec.js',
                host: 'http://127.0.0.1:8000/products/argos-saleslogix/',
                template: 'GruntRunner.tmpl'
            }
        },
        less: {
            development: {
                options: {
                    paths: ['content/css']
                },
                files: {
                    'min/css/app.min.debug.css': 'content/css/app.less'
                }
            },
            production: {
                options: {
                    paths: ['content/css'],
                    yuicompress: true
                },
                files: {
                    'min/css/app.min.css': 'content/css/app.less'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'min/css/app.min.css': ['content/css/toggle.css', 'content/css/app.css']
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc',
                formatters: [
                    { id: 'junit-xml', dest: 'report/junit.xml' }
                ]
            },
            lax: {
                src: ['content/**/*.css']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('test', ['connect', 'jasmine']);
    grunt.registerTask('default', ['test', 'cssmin']);
};
