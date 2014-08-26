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
  //if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
  //if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
  //else 
  if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
  return function(t) {
    return d3_hsl(ah + bh * t, as + bs * t, al + bl * t);
  };
}
