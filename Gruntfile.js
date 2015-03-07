module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        argos: {
            basePath: '../../argos-sdk',
            deployPath: '<%=argos.basePath%>/deploy'
        },
        crm: {
            basePath: '.',
            deployPath: '<%=crm.basePath%>/deploy'
        },
        products: {
            'argos-saleslogix': {
                basePath: '.'
            },
            'argos-sdk':{
                basePath: '../../argos-sdk'
            }/*,
            'argos-sample': {
                basePath: '../argos-sample'
            }*/
        }
    });

    // Load per-task config from separate files
    grunt.loadTasks('grunt-tasks');

    // Register alias tasks
    grunt.registerTask('test', ['jshint', 'connect', 'jasmine:coverage']);
    grunt.registerTask('server', ['connect:server:keepalive']);
    grunt.registerTask('bundle', ['shell:bundle:<%= pkg.version %>']);
    grunt.registerTask('default', ['test']);

    grunt.registerTask('release', 'Full release build for all products in the configuration', function() {
        var product, products, options;

        grunt.config.requires('products');
        grunt.config.requires('products.argos-sdk');
        grunt.config.requires('products.argos-sdk.basePath');
        grunt.config.requires('products.argos-saleslogix');
        grunt.config.requires('products.argos-saleslogix.basePath');

        products = grunt.config.get('products');

        // Run argos-saleslogix first, so cleaning it's deploy folder won't mess up
        // other modules that might run before it
        grunt.task.run('release:product:argos-saleslogix');
        delete products['argos-saleslogix'];

        // Build the rest (argos-sdk is included as a product, even though it isn't in the "products" folder)
        for (product in products) {
            grunt.task.run('release:product:' + product);
        }

        grunt.task.run('manifest:deploy');
        grunt.task.run('copy:manifest');
    });

    grunt.registerTask('release:product', 'Release for a individual product', function() {
        var targets, product, products, options, defaultConfig;

        targets = Array.prototype.slice.call(arguments);

        if (targets.length !== 1) {
            return false;
        }

        product = targets[0];
        products = grunt.config.get('products');
        options = products[product];

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
            defaultConfig.files = [
                {expand: true, cwd: options.basePath + '/deploy', src:['**'], dest: products['argos-saleslogix'].basePath + '/deploy' }
            ];

            grunt.config.set('copy.' + product, defaultConfig);
            grunt.task.run('copy:' + product);
        }
    });
};

