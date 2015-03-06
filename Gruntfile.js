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
        }
    });

    // Load per-task config from separate files
    grunt.loadTasks('grunt-tasks');

    // Register alias tasks
    grunt.registerTask('test', ['jshint', 'connect', 'jasmine:coverage']);
    grunt.registerTask('server', ['connect:server:keepalive']);
    grunt.registerTask('bundle', ['shell:bundle:<%= pkg.version %>']);
    grunt.registerTask('default', ['test']);
    grunt.registerTask('release', [/*'jshint', 'test',*/ 'release:full']);

    grunt.registerTask('release:full', 'Full release build (including SDK)', function() {
        grunt.log.writeln('Building release..');
        var sdk;

        grunt.config.requires('argos.basePath');
        sdk = grunt.config('argos.basePath');

        grunt.log.writeln('SDK Path: ' + sdk);

        grunt.task.run('clean:deploys');

        grunt.task.run('shell:argosRelease');
        grunt.task.run('shell:crmRelease');

        grunt.task.run('copy:argosDeploy');

        grunt.task.run('manifest:deploy');
        grunt.task.run('copy:manifest');

        //grunt.task.requires('jshint');
        //grunt.task.requires('test');
    });
};
