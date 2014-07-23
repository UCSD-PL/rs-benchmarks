/// <reference path="../../d3.d.ts" />
/// <reference path="../core/array.ts" />
/// <reference path="selection.ts" />

d3_selectionPrototype.call = function(callback) {
  var args = d3_array(arguments);
  callback.apply(args[0] = this, args);
  return this;
};
