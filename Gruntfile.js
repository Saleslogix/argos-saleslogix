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
        bundleName: "Mobile 3.7 DE",
      },
      'en-GB': {
        bundleName: "Mobile 3.7 EN-GB",
      },
      'es': {
        bundleName: "Mobile 3.7 ES",
      },
      'es-ES': {
        bundleName: "Mobile 3.7 ES-ES",
      },
      'pt': {
        bundleName: "Mobile 3.7 PT",
      },
      'pt-BR': {
        bundleName: "Mobile 3.7 PT-BR",
      },
      'fr': {
        bundleName: "Mobile 3.7 FR",
      },
      'it': {
        bundleName: "Mobile 3.7 IT",
      },
      'ja': {
        bundleName: "Mobile 3.7 JA",
      },
      'nl': {
        bundleName: "Mobile 3.7 NL",
      },
      'ru': {
        bundleName: "Mobile 3.7 RU",
      },
      'th': {
        bundleName: "Mobile 3.7 TH",
      },
      'zh-CN': {
        bundleName: "Mobile 3.7 ZH-CN",
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
        bundleName: "Mobile 3.7 ZH-TW",
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
  grunt.registerTask('bundle', ['shell:bundle:<%= pkg.version %>']);
};
