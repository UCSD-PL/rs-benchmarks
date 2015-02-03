/// <reference path="../../d3.d.ts" />
/// <reference path="../color/rgb.ts" />

d3.interpolateRgb = d3_interpolateRgb;

function d3_interpolateRgb(a:D3.Color.RGBColor, b:D3.Color.RGBColor) {
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t:number) {
    return d3_rgb(ar + br * t, ag + bg * t, ab + bb * t);
  };
}
