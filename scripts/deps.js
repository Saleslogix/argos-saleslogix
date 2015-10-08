/*eslint-disable */
var Graph = require('graphs');

// Mock data
var graph = new Graph();
var util = {
  name: 'util'
};
var convert = {
  name: 'convert'
};
var format = {
  name: 'format'
};
var sdata = {
  name: 'sdata'
};
var mixins = {
  name: 'mixins'
};
graph.add(util);
graph.add(convert);
graph.add(format);
graph.add(sdata);
graph.add(mixins);

/*
 * Format depends on util
 * link(from, to); // format -> util
 */
graph.link(format, util);
graph.link(format, convert);
graph.link(sdata, convert);
graph.link(sdata, util);
graph.link(mixins, sdata);

// Khan topological sort (https://en.wikipedia.org/wiki/Topological_sorting#Algorithms)
var set = [];
var sorted = [];
var hr = '----------------------------------------';

console.log(hr);
// start nodes which have no incoming edges
graph.forEach((node) => {
  if (graph.to(node).size === 0) {
    console.log('Initial set:', node.name);
    set.push(node);
  }
});

console.log(hr);
while (set.length > 0) {
  var n = set.shift();
  console.log('Pushing node into SORT: ', n.name);
  sorted.push(n);

  var incoming = graph.from(n);
  console.log('Incoming size for node:', n.name, 'is', incoming.size);
  for (var m of incoming) {
    console.log('Unlinking(', n.name, 'to', m.name, ')');
    graph.unlink(n, m);
    if (graph.to(m).size === 0) {
      console.log('Pushing node into SET:', m.name);
      set.push(m);
    }
  };
}

console.log(hr);
console.log('Sorted length:', sorted.length);
sorted.forEach((s) => {
  console.log(s.name);
});

// Ensure the graph has no more links
graph.forEach((node) => {
  if (graph.from(node).size > 0 || graph.to(node).size > 0) {
    throw new Error('Circular dependencies detected.');
  }
})
