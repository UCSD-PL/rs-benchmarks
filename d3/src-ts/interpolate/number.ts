/// <reference path="../../d3.d.ts" />
d3.interpolateNumber = d3_interpolateNumber;

function d3_interpolateNumber(a:number, b:number) {
  b -= a;
  return function(t:number) { return a + b * t; };
}
