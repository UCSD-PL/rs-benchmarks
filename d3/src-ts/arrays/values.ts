/// <reference path="../../d3.d.ts" />
d3.values = function(map:any[]):any[] {
  var values:any[] = [];
  for (var key in map) values.push(map[key]);
  return values;
};
