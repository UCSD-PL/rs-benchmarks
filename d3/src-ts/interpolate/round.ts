/// <reference path="../../d3.d.ts" />
d3.interpolateRound = d3_interpolateRound;

function d3_interpolateRound(a:number, b:number) {
  b -= a;
  return function(t:number) { return Math.round(a + b * t); };
}
