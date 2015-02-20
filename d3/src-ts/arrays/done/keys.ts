/// <reference path="../../../d3.d.ts" />

/*@ qualif Bot(v:a,s:string): hasProperty(v,s) */
/*@ qualif Bot(v:a,s:string): enumProp(v,s) */

d3.keys = function(map:{ }): string[] 
/*@ <anonymous> (map: [Immutable]{ }) => MArray<{string | hasProperty(v, map) && enumProp(v, map)}> */
{
  var keys: string[] = [];
  for (var key in map) keys.push(key);
  return keys;
};
