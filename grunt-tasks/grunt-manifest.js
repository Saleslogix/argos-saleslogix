module.exports = function(grunt) {
    var fontAwesome = [
        'content/css/themes/fonts/FontAwesome.otf?v=4.1.0',
        'content/css/themes/fonts/fontawesome-webfont.eot?v=4.1.0',
        'content/css/themes/fonts/fontawesome-webfont.svg?v=4.1.0',
        'content/css/themes/fonts/fontawesome-webfont.ttf?v=4.1.0',
        'content/css/themes/fonts/fontawesome-webfont.woff?v=4.1.0'
    ];

    grunt.config('manifest', {
        deploy: {
            options: {
                basePath: '<%= products["argos-saleslogix"].basePath + "/deploy" %>',
                exclude: ['web.config', 'manifest.appcache'],
                network: ['../sdata/'],
                timestamp: true,
                hash: true,
                master: ['index.aspx', 'index.html', 'index-nocache.aspx', 'index-nocache.html'],
                cache: fontAwesome,
                fallback: fontAwesome
            },
            src: [
                '**/*.*'
            ],
            dest: 'manifest.appcache'
        }
    });

    grunt.loadNpmTasks('grunt-manifest');
};

