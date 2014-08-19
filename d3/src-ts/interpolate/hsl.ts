/// <reference path="../../d3.d.ts" />
/// <reference path="../color/hsl.ts" />

d3.interpolateHsl = d3_interpolateHsl;

function d3_interpolateHsl(a:D3.Color.HSLColor, b:D3.Color.HSLColor) {
  var ah = a.h,
      as = a.s,
      al = a.l,
      bh = b.h - ah,
      bs = b.s - as,
      bl = b.l - al;
  if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
  return function(t:number) {
    return d3_hsl(ah + bh * t, as + bs * t, al + bl * t);
  };
}
