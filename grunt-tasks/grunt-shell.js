module.exports = function(grunt) {
    grunt.config('shell', {
        bundle: {
            command: function(version) {
                var cmd = 'build\\bundle';
                if (version) {
                    return [cmd, ' ', version].join('');
                }

                return cmd;
            },
            options: {
                stderr: true,
                stdout: true,
                stdin: true,
                execOptions: {
                    cwd: '.'
                }
            }
        },
        release: {
            command: 'build\\release.cmd',
            options: {
                execOptions: {
                    cwd: ''
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};

