/// <reference path="../../d3.d.ts" />
/// <reference path="linear.ts" />
/// <reference path="scale.ts" />

d3.scale.identity = function() {
  return new IdentityScaleImpl([0, 1]);
};

class IdentityScaleImpl implements D3.Scale.IdentityScale {
  dmn:number[];

  constructor(dmn:number[]) {
    this.dmn = dmn;
  }

  convert(x:number):number { return +x; }

  invert(x:number):number { return this.convert(x); }

  domain(values:number[]):D3.Scale.IdentityScale;
  domain():number[];
  domain(values?:number[]):any {
    if (!arguments.length) return this.dmn;
    this.dmn = values.map(this.convert);
    return this;
  }

  range(values:number[]):D3.Scale.IdentityScale;
  range():number[];
  range(values?:number[]):any {
    return this.domain(values);
  } // TODO can we get the old one-line version "range = domain" back?

  ticks(count: number): any[] {
    return d3_scale_linearTicks(this.dmn, count);
  }

  tickFormat(count: number, format: string): (n: number) => string {
    return d3_scale_linearTickFormat(this.dmn, count, format);
  }

  copy() {
    return new IdentityScaleImpl(this.dmn);
  }
}
