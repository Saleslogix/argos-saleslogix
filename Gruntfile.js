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
        bundleName: "Mobile 4.2 DE",
      },
      'en-GB': {
        bundleName: "Mobile 4.2 EN-GB",
      },
      'es': {
        bundleName: "Mobile 4.2 ES",
      },
      'pt-BR': {
        bundleName: "Mobile 4.2 PT-BR",
      },
      'fr': {
        bundleName: "Mobile 4.2 FR",
      },
      'it': {
        bundleName: "Mobile 4.2 IT",
      },
      'ja': {
        bundleName: "Mobile 4.2 JA",
      },
      'nl': {
        bundleName: "Mobile 4.2 NL",
      },
      'ru': {
        bundleName: "Mobile 4.2 RU",
      },
      'th': {
        bundleName: "Mobile 4.2 TH",
      },
      'zh-CN': {
        bundleName: "Mobile 4.2 ZH-CN",
        includes: [
          {
            src: './index.aspx',
            dest: './deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/index.aspx'
        }],
      },
      'zh-TW': {
        bundleName: "Mobile 4.2 ZH-TW",
        includes: [
          {
            src: './index.aspx',
            dest: './deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/index.aspx'
        }],
      }
    },
    jsb: {
      file: grunt.file.readJSON('./build/release.jsb2'),
      options: {
      },
    },
  });

  // Load per-task config from separate files
  grunt.loadTasks('grunt-tasks');

  // Register alias tasks
  grunt.registerTask('test', ['connect', 'jasmine:basic']);
  grunt.registerTask('bundle', ['shell:bundle:<%= pkg.version %>']);
};
