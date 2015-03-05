module.exports = function(grunt) {
    grunt.config('less', {
        development: {
            options: {
                paths: ['content/css']
            },
            files: {
                'min/css/app.min.debug.css': 'content/css/app.less'
            }
        },
        production: {
            options: {
                paths: ['content/css'],
                cleancss: true
            },
            files: {
                'min/css/app.min.css': 'content/css/app.less'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};

