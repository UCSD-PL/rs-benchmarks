/// <reference path="../../../d3.d.ts" />
/// <reference path="../../math/number.ts" />

d3.median = function(array0 : any, f?: any): any {

  /*@ array :: IArray<number> */
  var array : number[];

  if (arguments.length > 1) array = array0.map(f);
  else array = array0;

  array = array.filter(d3_number);

  return array.length ? d3.quantile(array.sort(d3.ascending), 1/2 ) : undefined;

  // ORIG: return array.length ? d3.quantile(array.sort(d3.ascending), .5 ) : undefined;

};
