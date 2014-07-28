/// <reference path="../../d3.d.ts" />
/// <reference path="color.ts" />
/// <reference path="rgb.ts" />

//d3.hsl = d3_hsl;

class HSLImpl implements D3.Color.HSLColor {
  h:number;
  s:number;
  l:number;

  constructor(h:number, s:number, l:number) {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  brighter(k?:number) {
    k = Math.pow(0.7, arguments.length ? k : 1);
    return new HSLImpl(this.h, this.s, this.l / k);
  }

  darker(k?:number) {
    k = Math.pow(0.7, arguments.length ? k : 1);
    return new HSLImpl(this.h, this.s, k * this.l);
  }

  rgb() {
    var h = this.h,
        s = this.s,
        l = this.l,
        m1:number,
        m2:number;

    /* Some simple corrections for h, s and l. */
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;

    /* From FvD 13.37, CSS Color Module Level 3 */
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;

    function v(h:number) {
      if (h > 360) h -= 360;
      else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }

    function vv(h:number) {
      return Math.round(v(h) * 255);
    }

    return new RGBImpl(vv(h + 120), vv(h), vv(h - 120));
  }

  toString() { return this.rgb() + ""; }
}


