/* eslint-disable */
var util = require('util');
var path = require('path');
var UglifyJS = require("uglify-js");

module.exports = function gruntJsb2(grunt) {
  grunt.registerTask('jsb2', 'Execute Uglify/Copy on a JSB2 file.', function() {
    var jsb = grunt.config.get('jsb');
    var deployDir = jsb.file.deployDir;
    var pkgs = jsb.file.pkgs;

    grunt.file.setBase('./build');
    var results = pkgs.map(function(pkg) {
      console.log('Processing ' + pkg.name);
      var output = pkg.file;
      var files = pkg.fileIncludes.map(function(fi) {
        return path.join(fi.path, fi.text);
      });
      return {
        min: UglifyJS.minify(files, jsb.options),
        out: pkg.file,
      };
    });
    grunt.file.setBase('..');
    results.forEach((function(r) {
      grunt.file.write(path.join(deployDir, r.out), r.min.code, { encoding: 'utf8'});
    }));

    // TODO: Finish resources section in jsb2
  });
};
