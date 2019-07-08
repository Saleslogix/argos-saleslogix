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
        bundleName: "Mobile 4.0 DE",
      },
      'en-GB': {
        bundleName: "Mobile 4.0 EN-GB",
      },
      'es': {
        bundleName: "Mobile 4.0 ES",
      },
      'pt-BR': {
        bundleName: "Mobile 4.0 PT-BR",
      },
      'fr': {
        bundleName: "Mobile 4.0 FR",
      },
      'it': {
        bundleName: "Mobile 4.0 IT",
      },
      'ja': {
        bundleName: "Mobile 4.0 JA",
      },
      'nl': {
        bundleName: "Mobile 4.0 NL",
      },
      'pl': {
        bundleName: "Mobile 4.0 PL",
      },
      'ru': {
        bundleName: "Mobile 4.0 RU",
      },
      'th': {
        bundleName: "Mobile 4.0 TH",
      },
      'zh-CN': {
        bundleName: "Mobile 4.0 ZH-CN",
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
        bundleName: "Mobile 4.0 ZH-TW",
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
