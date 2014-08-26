/// <reference path="../../d3.d.ts" />

d3.sum = d3_sum;

function d3_sum(array: number[]): number;
function d3_sum<T>(array: T[], f: (v: T) => number): number;
function d3_sum<T>(array: any[], f?: (v: T) => number): number {
  var s = 0,
  n = array.length,
  a:number,
  i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = +array[i])) s += a;
  } else {
    while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
  }

  return s;
};
