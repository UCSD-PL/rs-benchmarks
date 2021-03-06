/// <reference path="../../d3.d.ts" />
/// <reference path="../core/document.ts" />
/// <reference path="../core/ns.ts" />

d3.transform = function(string:string):any {
  var g:any= d3_document.createElementNS(d3.ns.prefix.svg, "g");
  return (d3.transform = function(string:string) :any{
    if (string != null) {
      g.setAttribute("transform", string);
      var t:SVGTransformList = g.transform.baseVal.consolidate();
    }
    return new d3_transform(t ? t.matrix : d3_transformIdentity);
  })(string);
};

// Compute x-scale and normalize the first row.
// Compute shear and make second row orthogonal to first.
// Compute y-scale and normalize the second row.
// Finally, compute the rotation.
function d3_transform(m:any) :void{
  var r0 :number[]= [m.a, m.b],
      r1:number[] = [m.c, m.d],
      kx :number= d3_transformNormalize(r0),
      kz:number = d3_transformDot(r0, r1),
      ky:number = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
  if (r0[0] * r1[1] < r1[0] * r0[1]) {
    r0[0] *= -1;
    r0[1] *= -1;
    kx *= -1;
    kz *= -1;
  }
  this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
  this.translate = [m.e, m.f];
  this.scale = [kx, ky];
  this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
};

d3_transform.prototype.toString = function() :string{
  return "translate(" + this.translate
      + ")rotate(" + this.rotate
      + ")skewX(" + this.skew
      + ")scale(" + this.scale
      + ")";
};

function d3_transformDot(a:number[],  b: number[]) :number{
  return a[0] * b[0] + a[1] * b[1];
}

function d3_transformNormalize(a:number[]) :number{
  var k = Math.sqrt(d3_transformDot(a, a));
  if (k) {
    a[0] /= k;
    a[1] /= k;
  }
  return k;
}

function d3_transformCombine(a:number[] ,b:number[], k:number) :number[]{
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

var d3_transformIdentity:Object= {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
