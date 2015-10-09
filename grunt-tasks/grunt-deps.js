/* eslint-disable */
var Graph = require('graphs');
var esprima = require('esprima');
var path = require('path');

module.exports = function gruntDeps(grunt) {
  grunt.config('deps', {
    files: 'src/**/*.js',
    modules: [{
      name: 'dojo',
      location: '../../argos-sdk/libraries/dojo/dojo'
    }, {
      name: 'dijit',
      location: '../../argos-sdk/libraries/dojo/dijit'
    }, {
      name: 'crm',
      location: 'src'
    }]
  });

  grunt.registerTask('deps', function() {
    var config = grunt.config.get('deps');
    var files = grunt.file.expand(config.files);
    files.forEach(function(file) {
      var contents = grunt.file.read(file, { encoding: 'utf8' });
      try {
        var tree = esprima.parse(contents, { tolerant: true, comment: true });
        var body = tree.body;
        body = body.filter(function(node) {
          return node.type === 'ImportDeclaration';
        }).map(function(node) {
          return {
            module: node.source.value
          };
        });
        grunt.log.writeln(JSON.stringify(body, null, 2));
      } catch (error) {
        grunt.log.writeln(file);
        grunt.log.writeln(error);
      }
    })
  });
};
