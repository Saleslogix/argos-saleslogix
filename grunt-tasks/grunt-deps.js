/* eslint-disable */
var Graph = require('graphs');
var esprima = require('esprima');
var path = require('path');

module.exports = function gruntDeps(grunt) {
  grunt.config('deps', {
    files: '../src/**/*.js',
    cwd: './build',
    template: 'release.tmpl',
    output: 'release.jsb2',
    modules: [{
      name: 'crm',
      location: '../src'
    }]
  });

  grunt.registerTask('deps', function() {
    var config = grunt.config.get('deps');
    grunt.file.setBase(config.cwd);
    var files = grunt.file.expand(config.files);
    var graph = new Graph();
    var nodes = {};

    // Resolves import modules into a relative file path
    function resolvePath(module, sourceFile) {
      var config = grunt.config.get('deps');
      // Relative modules start with a period
      if (module[0] === '.') {
        var sourceDir = path.dirname(sourceFile);
        return path.join(sourceDir, module) + '.js';
      } else {
        var parts = module.split('/');
        var moduleName = parts.shift();
        var config = config.modules.filter(function(m) {
          return m.name === moduleName;
        })[0];
        if (config && config.location) {
          var relativeModule = parts.join(path.sep);
          return path.join(config.location, relativeModule) + '.js';
        }
      }
    }

    // Add nodes to the graph where f is the file path.
    function add(f) {
      if (nodes[f] || f === null || typeof f === 'undefined') {
        return nodes[f];
      }

      nodes[f] = {
        name: f
      };

      graph.add(nodes[f]);
      return nodes[f];
    }

    // Khan topological sort (https://en.wikipedia.org/wiki/Topological_sorting#Algorithms)
    function sortGraph(graph) {
      var set = [];
      var sorted = [];
      // start nodes which have no incoming edges
      graph.forEach((node) => {
        if (graph.to(node)
          .size === 0) {
          set.push(node);
        }
      });

      while (set.length > 0) {
        var n = set.shift();
        sorted.push(n);

        var incoming = graph.from(n);
        for (var m of incoming) {
          graph.unlink(n, m);
          if (graph.to(m)
            .size === 0) {
            set.push(m);
          }
        };
      }

      // Ensure the graph has no more links
      graph.forEach((node) => {
        if (graph.from(node)
          .size > 0 || graph.to(node)
          .size > 0) {
          throw new Error('Circular dependencies detected.');
        }
      });

      return sorted;
    }

    // - Iterate our ES6 files
    // - parse them in esprima to get a list of imports (dependencies)
    // - Add each file to the graph
    // - Resolve the dependencies to a filename and add them to the graph
    // - Link dependency to file.
    files.forEach(function(file) {
      var sourceDir = path.dirname(file);
      var base = path.basename(file);
      var filepath = path.join(sourceDir, base); // grunt is not using correct seperator on windows
      var fileNode = add(filepath);
      var contents = grunt.file.read(filepath, {
        encoding: 'utf8'
      });
      try {
        var tree = esprima.parse(contents, {
          tolerant: true
        });
        var body = tree.body;
        body.filter(function(node) {
            return node.type === 'ImportDeclaration';
          })
          .forEach(function(node) {
            var p = resolvePath(node.source.value, filepath);
            var depNode = add(p);
            if (depNode) {
              graph.link(depNode, fileNode);
            }
          });
      } catch (error) {
        grunt.log.writeln(error);
      }
    });

    // Sort the graph and transform the data so it is template friendly
    var sorted = sortGraph(graph)
      .map(function(node) {
        return {
          folderName: path.dirname(node.name)
            .replace(/\\/gi, '/') // force unix path seperator
            .replace(/\/src/gi, '/src-out'), // replace src with src-out since our dependencies were scanned in ES6
          fileName: path.basename(node.name)
        };
      });

    // Template processing
    var template = grunt.file.read(config.template, {
      encoding: 'utf8'
    });
    var content = grunt.template.process(template, {
      data: {
        files: sorted
      }
    });
    grunt.file.write(config.output, content, {
      encoding: 'utf8'
    });
  });
};
