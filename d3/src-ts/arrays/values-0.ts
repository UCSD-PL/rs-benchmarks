/// <reference path="../../d3.d.ts" />

var d3_values = function<T>(map:{[k:string]:T}):T[] {
  var values:T[] = [];
  for (var key in map) values.push(map[key]);
  return values;
};

