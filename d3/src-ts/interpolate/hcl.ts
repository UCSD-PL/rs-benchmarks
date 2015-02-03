/// <reference path="../../d3.d.ts" />
/// <reference path="../color/hcl.ts" />

d3.interpolateHcl = d3_interpolateHcl;

function d3_interpolateHcl(a:D3.Color.HCLColor, b:D3.Color.HCLColor) {
  var ah = a.h,
      ac = a.c,
      al = a.l,
      bh = b.h - ah,
      bc = b.c - ac,
      bl = b.l - al;
  if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
  return function(t:number) {
    return d3_hcl(ah + bh * t, ac + bc * t, al + bl * t);
  };
}
