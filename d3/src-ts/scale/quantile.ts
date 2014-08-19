/// <reference path="../../d3.d.ts" />
/// <reference path="../arrays/ascending.ts" />
/// <reference path="../arrays/bisect.ts" />
/// <reference path="../arrays/quantile.ts" />
/// <reference path="../math/number.ts" />
/// <reference path="scale.ts" />

d3.scale.quantile = function() {
  return new QuantileScaleImpl([], []);
};

class QuantileScaleImpl implements D3.Scale.QuantileScale {
  dmn:number[];
  rng:any[];
  thresholds:number[];

  constructor(dmn:number[], rng:any[]) {
    this.dmn = dmn;
    this.rng = rng;
    this.rescale();
  }

  convert(x:number):any {
    if (!isNaN(x = +x)) return this.rng[d3.bisect(this.thresholds, x)];
  }

  private rescale() {
    var k = 0,
        q = this.rng.length;
    this.thresholds = [];
    while (++k < q) this.thresholds[k - 1] = d3.quantile(this.dmn, k / q);
    return this;
  }

  domain(values:number[]):D3.Scale.QuantileScale;
  domain():number[];
  domain(values?:number[]):any {
    if (!arguments.length) return this.dmn;
    this.dmn = values.filter(d3_number).sort(d3.ascending);
    return this.rescale();
  }

  range(values:any[]):D3.Scale.QuantileScale;
  range():any[];
  range(values?:any[]):any {
    if (!arguments.length) return this.rng;
    this.rng = values.filter(d3_number).sort(d3.ascending);
    return this.rescale();
  }

  quantiles():number[] {
    return this.thresholds;
  }

  invertExtent(y:any):number[] {
    y = this.rng.indexOf(y);
    return y < 0 ? [NaN, NaN] : [
      y > 0 ? this.thresholds[y - 1] : this.dmn[0],
      y < this.thresholds.length ? this.thresholds[y] : this.dmn[this.dmn.length - 1]
    ];
  }

  copy() {
    return new QuantileScaleImpl(this.dmn, this.rng); // copy on write!
  }
}
