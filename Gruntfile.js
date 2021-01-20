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
        bundleName: "Mobile 4.3 DE",
      },
      'en-GB': {
        bundleName: "Mobile 4.3 EN-GB",
      },
      'es': {
        bundleName: "Mobile 4.3 ES",
      },
      'pt-BR': {
        bundleName: "Mobile 4.3 PT-BR",
      },
      'fr': {
        bundleName: "Mobile 4.3 FR",
      },
      'it': {
        bundleName: "Mobile 4.3 IT",
      },
      'ja': {
        bundleName: "Mobile 4.3 JA",
      },
      'nl': {
        bundleName: "Mobile 4.3 NL",
      },
      'ru': {
        bundleName: "Mobile 4.3 RU",
      },
      'th': {
        bundleName: "Mobile 4.3 TH",
      },
      'zh-CN': {
        bundleName: "Mobile 4.3 ZH-CN",
        includes: [
          {
            src: './index.aspx',
            dest: './deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/index.aspx'
        }],
      },
      'zh-TW': {
        bundleName: "Mobile 4.3 ZH-TW",
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
