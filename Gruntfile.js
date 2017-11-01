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
        bundleName: "Mobile 3.6.1 DE",
      },
      'en-GB': {
        bundleName: "Mobile 3.6.1 EN-GB",
      },
      'es': {
        bundleName: "Mobile 3.6.1 ES",
      },
      'es-ES': {
        bundleName: "Mobile 3.6.1 ES-ES",
      },
      'pt': {
        bundleName: "Mobile 3.6.1 PT",
      },
      'fr': {
        bundleName: "Mobile 3.6.1 FR",
      },
      'it': {
        bundleName: "Mobile 3.6.1 IT",
      },
      'ja': {
        bundleName: "Mobile 3.6.1 JA",
      },
      'nl': {
        bundleName: "Mobile 3.6.1 NL",
      },
      'ru': {
        bundleName: "Mobile 3.6.1 RU",
      },
      'th': {
        bundleName: "Mobile 3.6.1 TH",
      },
      'zh-CN': {
        bundleName: "Mobile 3.6.1 ZH-CN",
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
        bundleName: "Mobile 3.6.1 ZH-TW",
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
    jsb: {
      file: grunt.file.readJSON('./build/release.jsb2'),
      options: {
      },
    },
  });

  // Load per-task config from separate files
  grunt.loadTasks('grunt-tasks');

  // Register alias tasks
  grunt.registerTask('build', ['clean', 'less']);
  grunt.registerTask('test', ['connect', 'jasmine:coverage']);
  grunt.registerTask('test:basic', ['connect', 'jasmine:basic']);
  grunt.registerTask('server', ['connect:server:keepalive']);
  grunt.registerTask('bundle', ['less', 'shell:bundle:<%= pkg.version %>']);
};
