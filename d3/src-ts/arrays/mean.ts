/// <reference path="../../d3.d.ts" />
/// <reference path="../math/number.ts" />

d3.mean = d3_mean;

function d3_mean(array: number[]): number;
function d3_mean<T>(array: T[], f: (v: T) => number): number;
function d3_mean<T>(array: any[], f?: (v: T) => number): number {
  var s = 0,
      n = array.length,
      a:number,
      i = -1,
      j = n;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) s += a; else --j;
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) s += a; else --j;
  }
  return j ? s / j : undefined;
}
