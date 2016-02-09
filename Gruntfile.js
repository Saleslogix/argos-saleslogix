module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    products: {
      'argos-saleslogix': {
        basePath: '.',
      },
      'argos-sdk': {
        basePath: '../../argos-sdk',
      },
    },
    // modules.json is the same format as the productions configuration above.
    // Use grunt release:all or grunt release:modules to include them in a release build.
    modules: grunt.file.readJSON('modules.json'),
  });

  // Load per-task config from separate files
  grunt.loadTasks('grunt-tasks');

  // Register alias tasks
  grunt.registerTask('build', ['clean', 'babel', 'less']);
  grunt.registerTask('test', ['babel', 'connect', 'jasmine:coverage']);
  grunt.registerTask('server', ['connect:server:keepalive']);
  grunt.registerTask('bundle', ['babel', 'less', 'shell:bundle:<%= pkg.version %>']);
  grunt.registerTask('lint', ['babel', 'eslint']);
  grunt.registerTask('default', ['test']);
};
