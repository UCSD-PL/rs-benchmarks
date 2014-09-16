/// <reference path="../../d3.d.ts" />
/// <reference path="../arrays/bisect.ts" />
/// <reference path="scale.ts" />

d3.scale.threshold = function() {
  return new ThresholdScaleImpl([.5], [0, 1]);
};

class ThresholdScaleImpl implements D3.Scale.ThresholdScale {
  constructor(private dmn:number[], private rng:any[]) { }

  convert(x:number) {
    if (x <= x) return this.rng[d3.bisect(this.dmn, x)];
  }

  domain(values:number[]):D3.Scale.ThresholdScale;
  domain():number[];
  domain(values?:number[]):any {
    if (!arguments.length) return this.dmn;
    this.dmn = values;
    return this;
  }

  range(values:any[]):D3.Scale.ThresholdScale;
  range():any[];
  range(values?:any[]):any {
    if (!arguments.length) return this.rng;
    this.rng = values;
    return this;
  }

  invertExtent(y:any):number[] {
    y = this.rng.indexOf(y);
    return [this.dmn[y - 1], this.dmn[y]];
  }

  copy() {
    return new ThresholdScaleImpl(this.dmn, this.rng);
  }
}
