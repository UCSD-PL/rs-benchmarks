/// <reference path="../../d3.d.ts" />

//d3.extent = d3_extend;

//function d3_extend<T,U>(array: T[], f: (T, number) => U): U[] {

function d3_extend<T>(array: T[], f?: (T, number) => T) {
  var i = -1,
      n = array.length,
      a: T,
      b: T,
      c: T;
  if (arguments.length === 1) {
    while (++i < n && !((a = c = array[i]) != null && a <= a)) a = c = undefined;
    while (++i < n) if ((b = array[i]) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  } else {
    while (++i < n && !((a = c = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  }
  return [a, c];
};
