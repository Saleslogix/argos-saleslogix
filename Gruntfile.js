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
    'lang-pack': {
      'de': {
        bundleName: "Mobile 3.4.2 DE",
      },
      'es': {
        bundleName: "Mobile 3.4.2 ES",
      },
      'pt': {
        bundleName: "Mobile 3.4.2 PT",
      },
      'en-GB': {
        bundleName: "Mobile 3.4.2 EN-GB"
      },
      'fr': {
        bundleName: "Mobile 3.4.2 FR",
      },
      'it': {
        bundleName: "Mobile 3.4.2 IT",
      },
      'ru': {
        bundleName: "Mobile 3.4.2 RU",
      },
      'zh-CN': {
        bundleName: "Mobile 3.4.2 ZH-CN",
        includes: [
          {
            src: './index-nocache.aspx',
            dest: './deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/index-nocache.aspx'
          }, {
            src: './index.aspx',
            dest: './deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/index.aspx'
        }],
      },
      'zh-TW': {
        bundleName: "Mobile 3.4.2 ZH-TW",
        includes: [
          {
            src: './index-nocache.aspx',
            dest: './deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/index-nocache.aspx'
          }, {
            src: './index.aspx',
            dest: './deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/index.aspx'
        }],
      }
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
