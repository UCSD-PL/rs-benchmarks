/// <reference path="../../d3.d.ts" />

/// <reference path="../math/number.ts" />
/// <reference path="ascending.ts" />
//  <reference path="quantile.ts" />


// DT types: 
// median(arr: number[]): number;
// median<T>(arr: T[], map: (v: T) => number): number;

d3.median = d3_median;

function d3_median<T>(array: number[]): number;
function d3_median<T>(array: T[], f?: (v: T) => T): number;
function d3_median<T>(array: any[], f?: any): number {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3_ascending), .5) : undefined;
};
