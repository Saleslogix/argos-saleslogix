module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // Load per-task config from separate files
    grunt.loadTasks('grunt-tasks');

    // Register alias tasks
    grunt.registerTask('test', ['connect', 'jasmine:coverage']);
    grunt.registerTask('server', ['connect:server:keepalive']);
    grunt.registerTask('bundle', ['shell:bundle:<%= pkg.version %>']);
    grunt.registerTask('default', ['test']);
};
