module.exports = function(grunt) {
    grunt.config('manifest', {
        deploy: {
            options: {
                basePath: '<%= crm.deployPath %>',
                exclude: ['web.config', 'manifest.appcache'],
                network: ['../sdata/'],
                timestamp: true,
                hash: true,
                master: ['index.aspx']
            },
            src: [
                '**/*.*'
            ],
            dest: 'manifest.appcache'
        }
    });

    grunt.loadNpmTasks('grunt-manifest');
};

