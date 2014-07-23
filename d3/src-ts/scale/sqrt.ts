/// <reference path="../../d3.d.ts" />
/// <reference path="pow.ts" />
/// <reference path="scale.ts" />

d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5);
};
