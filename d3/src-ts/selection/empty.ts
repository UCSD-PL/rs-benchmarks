/// <reference path="../../d3.d.ts" />
/// <reference path="selection.ts" />

d3_selectionPrototype.empty = function() {
  return !this.node();
};
