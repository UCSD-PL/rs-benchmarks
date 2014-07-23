/// <reference path="../../d3.d.ts" />
/// <reference path="../selection/each.ts" />
/// <reference path="transition.ts" />

d3_transitionPrototype.delay = function(value) {
  var id = this.id;
  if (arguments.length < 1) return this.node().__transition__[id].delay;
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.__transition__[id].delay = +value.call(node, node.__data__, i, j); }
      : (value = +value, function(node) { node.__transition__[id].delay = value; }));
};
