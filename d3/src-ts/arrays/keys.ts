/// <reference path="../../d3.d.ts" />
d3.keys = function<T>(map:{ [k:string]:T }): string[] {
  var keys: string[] = [];
  for (var key in map) keys.push(key);
  return keys;
};
