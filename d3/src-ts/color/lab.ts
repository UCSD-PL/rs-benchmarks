/// <reference path="../../d3.d.ts" />
/// <reference path="../math/trigonometry.ts" />
/// <reference path="color.ts" />
/// <reference path="hcl.ts" />
/// <reference path="rgb.ts" />

d3.lab = d3_lab;

function d3_lab(l: number, a: number, b: number): D3.Color.LABColor;
function d3_lab(color: string): D3.Color.LABColor;
function d3_lab(x: any, a?: number, b?: number): D3.Color.LABColor {
  if (arguments.length === 3)
    return new LABImpl(x, a, b);
  var rgb:D3.Color.RGBColor = d3.rgb(x);
  return d3_rgb_lab(rgb.r, rgb.g, rgb.b);
}

class LABImpl implements D3.Color.LABColor {
  l:number;
  a:number;
  b:number;

  constructor(l:number, a:number, b:number) {
    this.l = l;
    this.a = a;
    this.b = b;
  }

  brighter(k?:number) {
    return new LABImpl(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  }

  darker(k?:number) {
   return new LABImpl(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  }

  rgb() {
   return d3_lab_rgb(this.l, this.a, this.b);
  }

  toString() { return this.rgb() + ""; }
}

// Corresponds roughly to RGB brighter/darker
var d3_lab_K = 18;

// D65 standard referent
var d3_lab_X = 0.950470,
    d3_lab_Y = 1,
    d3_lab_Z = 1.088830;

function d3_lab_rgb(l:number, a:number, b:number) {
  var y = (l + 16) / 116,
      x = y + a / 500,
      z = y - b / 200;
  x = d3_lab_xyz(x) * d3_lab_X;
  y = d3_lab_xyz(y) * d3_lab_Y;
  z = d3_lab_xyz(z) * d3_lab_Z;
  return new RGBImpl(
    d3_xyz_rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
    d3_xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
    d3_xyz_rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
  );
}

function d3_lab_hcl(l:number, a:number, b:number) {
  return l > 0
      ? new HCLImpl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l)
      : new HCLImpl(NaN, NaN, l);
}

function d3_lab_xyz(x:number) {
  return x > 0.206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
}
