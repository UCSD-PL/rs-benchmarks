/// <reference path="../../d3.d.ts" />
d3.interpolateNumber = d3_interpolateNumber;

function d3_interpolateNumber(a, b) {
  b -= a = +a;
  return function(t) { return a + b * t; };
}
