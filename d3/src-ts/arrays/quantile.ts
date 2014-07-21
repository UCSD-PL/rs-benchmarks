// R-7 per <http://en.wikipedia.org/wiki/Quantile>
/// <reference path="../../d3.d.ts" />

d3.quantile = function(values:number[], p:number): number {
  var H = (values.length - 1) * p + 1,
      h:number = Math.floor(H),
      v:number = +values[h - 1],
      e:number = H - h;
  return e ? v + e * (values[h] - v) : v;
};
