/// <reference path="../../d3.d.ts" />

/// <reference path="../math/number.ts" />
/// <reference path="ascending.ts" />
//  <reference path="quantile.ts" />

d3.median = d3_median;

function d3_median<T>(array: number[]): number;
function d3_median<T>(array: T[], f: (v: T) => number): number;
function d3_median<T>(array: any[], f?: (v: T) => number): number {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3_ascending), .5) : undefined;
};
