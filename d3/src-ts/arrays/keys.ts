/// <reference path="../../d3.d.ts" />

/*@ qualif Bot(v:a,s:string): keyIn(v,s) */
/*@ qualif Bot(v:a,s:string): enumProp(v,s) */

d3.keys = function(map:{ }): string[] {
  var keys: string[] = [];
  for (var key in map) keys.push(key);
  return keys;
};
