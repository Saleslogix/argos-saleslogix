/*eslint-disable*/
var os = require('os');

module.exports = function(grunt) {
  grunt.config('shell', {
    bundle: {
      command: function(version) {
        if (os.platform() !== 'win32') {
          throw new Error('The bundle command is not available on non-windows platforms.');
        }

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
          cwd: '.',
          maxBuffer: false
        }
      }
    },
    release: {
      command: os.platform() === 'win32' ? 'build\\release.cmd' : 'build/release.sh',
      options: {
        execOptions: {
          cwd: '',
          maxBuffer: false
        }
      }
    },
    'lang-bundle': {
      command: function(bundleName, configFileName) {
        var cmd = 'build\\langBundle';
        return [cmd, ' ', bundleName, ' ', configFileName].join('');

        return cmd;
      },
      options: {
        stderr: true,
        stdout: true,
        stdin: true,
        execOptions: {
          cwd: '.',
          maxBuffer: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
};
