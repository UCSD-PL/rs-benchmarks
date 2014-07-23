/// <reference path="../../d3.d.ts" />
/// <reference path="selection.ts" />

d3_selectionPrototype.size = function() {
  var n = 0;
  this.each(function() { ++n; });
  return n;
};
