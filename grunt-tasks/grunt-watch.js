module.exports = function(grunt) {
    grunt.config('watch', {
        options: {
            livereload: true
        },
        scripts: {
            files: ['src/**/*.js', 'configuration/**/*.js', '../../argos-sdk/src/**/*.js'],
            tasks: ['jshint'],
            options: {
                spawn: false
            }
        },
        less: {
            // To get livereload to work with less files, you need to go into node_modules\grunt-contrib-watch\node_modules\tiny-lr\lib\public\livereload.js
            // and modify the reloadLess function and remove the cache busting code.
            // See: https://github.com/mklabs/tiny-lr/issues/22#issuecomment-34702527
            files: ['content/**/*.less'],
            tasks: ['less'],
            options: {
                spawn: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};

