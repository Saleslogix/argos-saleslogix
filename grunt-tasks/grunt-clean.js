module.exports = function(grunt) {
    grunt.config('clean', {
        deploys: {
            options: {
                // force to allow deleting outside our working directory (for argos-sdk)
                force: true
            },
            src: ''
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};

