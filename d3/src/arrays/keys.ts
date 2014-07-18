/// <reference path="../../d3.d.ts" />
d3.keys = function(map:any): string[] {
  var keys: string[] = [];
  for (var key in map) keys.push(key);
  return keys;
};
