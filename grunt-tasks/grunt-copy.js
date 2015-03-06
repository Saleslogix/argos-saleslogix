module.exports = function(grunt) {
    grunt.config('copy', {
        argosDeploy: {
            files: [
                {expand: true, cwd: '<%= argos.deployPath %>', src:['**'], dest: '<%= crm.deployPath %>' }
            ]
        },
        manifest: {
            src: './manifest.appcache',
            dest: './deploy/manifest.appcache'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};

