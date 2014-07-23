/// <reference path="../../d3.d.ts" />
/// <reference path="../color/color.ts" />
/// <reference path="../color/rgb.ts" />
/// <reference path="rgb.ts" />
/// <reference path="object.ts" />
/// <reference path="array.ts" />
/// <reference path="number.ts" />
/// <reference path="string.ts" />

d3.interpolate = d3_interpolate;

function d3_interpolate(a, b) {
  var i = d3.interpolators.length, f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f;
}

d3.interpolators = [
  function(a, b) {
    var t = typeof b;
    return (t === "string" ? (d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString)
        : b instanceof d3_color ? d3_interpolateRgb
        : Array.isArray(b) ? d3_interpolateArray
        : t === "object" && isNaN(b) ? d3_interpolateObject
        : d3_interpolateNumber)(a, b);
  }
];
