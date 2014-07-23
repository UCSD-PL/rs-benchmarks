/// <reference path="../../d3.d.ts" />
/// <reference path="selection.ts" />

d3_selectionPrototype.datum = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.property("__data__");
};
