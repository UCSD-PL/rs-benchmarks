/// <reference path="../../d3.d.ts" />
/// <reference path="../interpolate/ease.ts" />
/// <reference path="../selection/each.ts" />
/// <reference path="transition.ts" />

d3_transitionPrototype.ease = function(value) {
  var id = this.id;
  if (arguments.length < 1) return this.node().__transition__[id].ease;
  if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
  return d3_selection_each(this, function(node) { node.__transition__[id].ease = value; });
};
