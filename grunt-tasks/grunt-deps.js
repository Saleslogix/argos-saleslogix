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
    var graph = new Graph();
    var nodes = {};

    // TODO: We will populate all the nodes here,
    // We can optimize this and add nodes/edges as we go in the second loop,
    // and remove this one.
    files.forEach(function(f) {
      nodes[f] = {
        name: f
      };
      graph.add(nodes[f]);
    });

    files.forEach(function(file) {
      var contents = grunt.file.read(file, { encoding: 'utf8' });
      try {
        var tree = esprima.parse(contents, { tolerant: true });
        var body = tree.body;
        var modules = body.filter(function(node) {
          return node.type === 'ImportDeclaration';
        }).map(function(node) {
          return {
            module: node.source.value
          };
        });
        // TODO: Resolve the modules to a file path
        grunt.log.writeln(JSON.stringify(modules, null, 2));
      } catch (error) {
        grunt.log.writeln(file);
        grunt.log.writeln(error);
      }
    })
  });
};
