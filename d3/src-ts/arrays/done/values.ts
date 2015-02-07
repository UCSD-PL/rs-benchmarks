/// <reference path="../../../d3.d.ts" />

/*@ qualif Bot(v:a,s:string): hasProperty(v,s) */
/*@ qualif Bot(v:a,s:string): enumProp(v,s) */

/*@ d3_values :: forall T . (map: [Immutable]{[k:string]:T}) => {MArray<T> | true} */
function d3_values<T>(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};

//TODO: d3.values = d3_values
