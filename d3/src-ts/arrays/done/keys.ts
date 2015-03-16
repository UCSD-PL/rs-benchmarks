/// <reference path="../../../d3.d.ts" />

/*@ qualif Bot(s:Str,v:a): hasProperty(s,v) */
/*@ qualif Bot(s:Str,v:a): enumProp(s,v) */

d3.keys = function(map:{ }): string[] 
/*@ <anonymous> (map: [Immutable]{ }) => MArray<{string | hasProperty(v, map) && enumProp(v, map)}> */
{
  var keys: string[] = [];
  for (var key in map) keys.push(key);
  return keys;
};
