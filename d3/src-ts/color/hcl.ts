/// <reference path="../../d3.d.ts" />
/// <reference path="../math/trigonometry.ts" />
/// <reference path="color.ts" />
/// <reference path="lab.ts" />
/// <reference path="rgb.ts" />

//d3.hcl = d3_hcl;

class HCLImpl implements D3.Color.HCLColor {
  h:number;
  c:number;
  l:number;

  constructor(h:number, c:number, l:number) {
    this.h = h;
    this.c = c;
    this.l = l;
  }

  brighter(k?:number) {
    return new HCLImpl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  }

  darker(k?:number) {
    return new HCLImpl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  }

  rgb() {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  }

};

function d3_hcl_lab(h, c, l) {
  if (isNaN(h)) h = 0;
  if (isNaN(c)) c = 0;
  return new LABImpl(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
}
