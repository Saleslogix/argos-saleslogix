module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        argos: {
            basePath: '../../argos-sdk',
            deployPath: '<%=argos.basePath%>/deploy'
        },
        crm: {
            basePath: '.',
            deployPath: '<%=crm.basePath%>/deploy'
        },
        products: {
            'argos-saleslogix': {
                basePath: '.'
            },
            'argos-sdk':{
                basePath: '../../argos-sdk'
            }/*,
            'argos-sample': {
                basePath: '../argos-sample'
            }*/
        }
    });

    // Load per-task config from separate files
    grunt.loadTasks('grunt-tasks');

    // Register alias tasks
    grunt.registerTask('test', ['jshint', 'connect', 'jasmine:coverage']);
    grunt.registerTask('server', ['connect:server:keepalive']);
    grunt.registerTask('bundle', ['shell:bundle:<%= pkg.version %>']);
    grunt.registerTask('default', ['test']);
};

