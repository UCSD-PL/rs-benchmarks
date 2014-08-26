/// <reference path="../../d3.d.ts" />

d3.max = d3_max;

function d3_max(array: number[]): number;
function d3_max<T>(array: T[], f: (v: T) => number): number;
function d3_max<T>(array: any[], f?: (v: T) => number): number {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
  } else {
    while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
  }
  return a;
};
