module.exports = function gruntLangPack(grunt) {
  grunt.registerMultiTask('lang-pack', 'Full language pack build for all languages in the configuration', function() {
    // Clear the bundle folder instead of the full deploy folder, since if we're running multiple language packs
    // we might clean the completed ones otherwise. Also this may run after a full build, and those bundles would
    // be there as well.
    grunt.task.run('clean:bundle');

    // Fetch fresh model folder.
    grunt.task.run('copy:model');

    // Build bundle.config file
    var baseConfigFile = grunt.file.read('./build/bundleConfig.tmpl');
    var obj = { bundleName: this.data.bundleName };
    var configOutFileName = 'bundle-' + this.target + '.config';
    var outFilePath = './deploy/' + configOutFileName;
    grunt.file.write(outFilePath, grunt.template.process(baseConfigFile, {data: obj}));

    // Copy the localization files.
    var copyFilesConfig = grunt.config.get('copy.deploy');
    copyFilesConfig.files = [{
       src: '{help,localization}/locales/*/' + this.target + '/*',
       dest: 'deploy/bundle/model/Portal/SlxMobile/SourceFiles/products/argos-saleslogix/',
     }, {
       expand: true,
       cwd: '../../',
       src: 'argos-sdk/localization/locales/*/' + this.target + '/*',
       dest: 'deploy/bundle/model/Portal/SlxMobile/SourceFiles/',
    }];

    grunt.config.set('copy.localization', copyFilesConfig);
    grunt.task.run('copy:localization');

    // Copy any extra includes needed (for bug-fixes, etc.)
    if(this.data.includes) {
      var copyIncludedFilesConfig = grunt.config.get('copy.deploy');
      copyIncludedFilesConfig.files = this.data.includes;
      grunt.config.set('copy.localization-includes', copyIncludedFilesConfig);
      grunt.task.run('copy:localization-includes');
    }

    // Bundle
    grunt.task.run('shell:lang-bundle:"' + this.data.bundleName + '":' + configOutFileName);
  });
};
