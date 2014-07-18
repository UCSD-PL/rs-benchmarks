/// <reference path="../../d3.d.ts" />
d3.shuffle = function<T>(array: T[]):T [] {
  var m = array.length, t:T, i:number;
  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
};
