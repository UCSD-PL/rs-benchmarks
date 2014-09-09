/// <reference path="../../d3.d.ts" />
/*@ qualif Bot(v:a,s:string): keyIn(v,s) */

d3.entries = function<T>(map: {[k:string]:T}): {key:string; value:T}[] {
  var entries : {key:string; value:T}[] = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
