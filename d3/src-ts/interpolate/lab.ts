/// <reference path="../../d3.d.ts" />
/// <reference path="../color/lab.ts" />

d3.interpolateLab = d3_interpolateLab;

function d3_interpolateLab(a:D3.Color.LABColor, b:D3.Color.LABColor) {
  var al = a.l,
      aa = a.a,
      ab = a.b,
      bl = b.l - al,
      ba = b.a - aa,
      bb = b.b - ab;
  return function(t:number) {
    return d3_lab(al + bl * t, aa + ba * t, ab + bb * t);
  };
}
