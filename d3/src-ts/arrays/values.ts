/// <reference path="../../d3.d.ts" />
d3.values = function<T>(map:{[k:string]:T}):T[] {
  var values:T[] = [];
  for (var key in map) values.push(map[key]);
  return values;
};

