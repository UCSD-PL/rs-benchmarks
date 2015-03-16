/// <reference path="../../../d3.d.ts" />

/*@ qualif Bot(s:Str,v:a): hasProperty(s,v) */
/*@ qualif Bot(s:Str,v:a): enumProp(s,v) */

/*@ d3_entries :: forall T . ([Immutable]{[k:string]:T}) => {MArray<{key:string; value:T}> | true} */ 
function d3_entries<T>(map) {
  /*@ entries :: MArray<{key:string; value:T}> */
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};

// TODO: d3.entries = d3_entries;
