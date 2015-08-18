/*eslint-disable*/
module.exports = function gruntRelease(grunt) {
  grunt.registerTask('release:all', ['release:modules']);

  grunt.registerTask('release', 'Full release build for all products in the configuration', function(arg1) {
    var modules;

    grunt.config.requires('products');
    grunt.config.requires('products.argos-sdk');
    grunt.config.requires('products.argos-sdk.basePath');
    grunt.config.requires('products.argos-saleslogix');
    grunt.config.requires('products.argos-saleslogix.basePath');

    modules = grunt.config.get('modules');

    // Run argos-saleslogix first, so cleaning it's deploy folder won't mess up
    // other modules that might run before it
    grunt.task.run('release:product:argos-saleslogix');
    grunt.task.run('release:product:argos-sdk');

    // Build any included modules if this task was run as release:all
    if (arg1 === 'modules') {
      Object.keys(modules).forEach(function(module) {
        grunt.task.run('release:product:' + module);
      });
    }

    grunt.task.run('manifest:deploy');
    grunt.task.run('copy:manifest');
  });

  grunt.registerTask('release:product', 'Release for a individual product', function() {
    var targets, product, products, modules, options, defaultConfig;

    targets = Array.prototype.slice.call(arguments);

    if (targets.length !== 1) {
      return false;
    }

    product = targets[0];
    products = grunt.config.get('products');
    modules = grunt.config.get('modules');
    options = products[product] || modules[product];

    if (!options) {
      grunt.fail.fatal('invalid product or module specified');
    }

    defaultConfig = grunt.config.get('clean.deploys');
    defaultConfig.src = options.basePath + '/deploy';
    grunt.config.set('clean.' + product, defaultConfig);
    grunt.task.run('clean:' + product);

    defaultConfig = grunt.config.get('shell.release');
    defaultConfig.options.execOptions.cwd = options.basePath;
    grunt.config.set('shell.' + product, defaultConfig);
    grunt.task.run('shell:' + product);

    if (product !== 'argos-saleslogix') {
      defaultConfig = grunt.config.get('copy.deploy');
      defaultConfig.files = [{
        expand: true,
        cwd: options.basePath + '/deploy',
        src: ['**'],
        dest: products['argos-saleslogix'].basePath + '/deploy'
      }];

      grunt.config.set('copy.' + product, defaultConfig);
      grunt.task.run('copy:' + product);
    }
  });
};
/*eslint-enable*/
