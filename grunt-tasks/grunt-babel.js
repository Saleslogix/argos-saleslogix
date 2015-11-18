module.exports = function gruntBabel(grunt) {
  grunt.config('babel', {
    options: {
      sourceMaps: 'inline',
      modules: 'amd',
      moduleIds: true,
      moduleRoot: 'crm',
      sourceRoot: 'src',
      blacklist: [
        'strict',
      ],
    },
    dist: {
      files: [{
        expand: true,
        cwd: 'src',
        src: ['**/*.js'],
        dest: 'src-out',
      }],
    },
  });

  grunt.loadNpmTasks('grunt-babel');
};
