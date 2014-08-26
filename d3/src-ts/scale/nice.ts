/// <reference path="../../d3.d.ts" />
/// <reference path="../core/identity.ts" />

interface Nicifier {
  floor: (x:number) => number;
  ceil: (x:number) => number;
}

function d3_scale_nice(domain:number[], nice:Nicifier) {
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      dx:number;

  if (x1 < x0) {
    dx = i0, i0 = i1, i1 = dx;
    dx = x0, x0 = x1, x1 = dx;
  }

  domain[i0] = nice.floor(x0);
  domain[i1] = nice.ceil(x1);
  return domain;
}

function d3_scale_niceStep(step:number) {
  return step ? {
    floor: function(x:number) { return Math.floor(x / step) * step; },
    ceil: function(x:number) { return Math.ceil(x / step) * step; }
  } : d3_scale_niceIdentity;
}

var d3_scale_niceIdentity = {
  floor: d3_identity,
  ceil: d3_identity
};
