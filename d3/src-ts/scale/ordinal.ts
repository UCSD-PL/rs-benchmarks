/// <reference path="../../d3.d.ts" />
/// <reference path="../arrays/map.ts" />
/// <reference path="../arrays/range.ts" />
/// <reference path="scale.ts" />

d3.scale.ordinal = function() {
  return new OrdinalScaleImpl([], {t: "range", a: [[]]});
};

class OrdinalScaleImpl implements D3.Scale.OrdinalScale {
  dmn: any[];
  ranger: { t: string; a: any };
  index: D3.Map;
  rng: any[];
  rngBand: number;

  constructor(dmn:any[], ranger:any) {
    this.ranger = ranger;
    this.domain(dmn);
  }

  convert(x: any) {
    return this.rng[((this.index.get(x) || (this.ranger.t === "range" ? this.index.set(x, this.dmn.push(x)) : NaN)) - 1) % this.rng.length];
  }

  private steps(start:number, step:number) {
    return d3.range(this.dmn.length).map(function(i) { return start + step * i; });
  }

  domain(values:any[]):D3.Scale.OrdinalScale;
  domain():any[];
  domain(values?:any[]):any {
    if (!arguments.length) return this.dmn;
    this.dmn = [];
    this.index = d3.map();
    var i = -1, n = values.length, xi:any;
    while (++i < n) if (!this.index.has(xi = values[i])) this.index.set(xi, this.dmn.push(xi));
    return this[this.ranger.t].apply(this.convert, this.ranger.a);
  }

  range(values:any[]):D3.Scale.OrdinalScale;
  range():any[];
  range(values?:any[]):any {
    if (!arguments.length) return this.rng;
    this.rng = values;
    this.rngBand = 0;
    this.ranger = {t: "range", a: arguments};
    return this;
  }

  rangePoints(x: number[], padding?: number): D3.Scale.OrdinalScale {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (Math.max(1, this.dmn.length - 1) + padding);
    this.rng = this.steps(this.dmn.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
    this.rngBand = 0;
    this.ranger = {t: "rangePoints", a: arguments};
    return this;
  }

  rangeBands(x: number[], padding?: number, outerPadding?: number): D3.Scale.OrdinalScale {
    if (arguments.length < 2) padding = 0;
    if (arguments.length < 3) outerPadding = padding;
    var reverse = x[1] < x[0] ? 1 : 0,
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = (stop - start) / (this.dmn.length - padding + 2 * outerPadding);
    this.rng = this.steps(start + step * outerPadding, step);
    if (reverse) this.rng.reverse();
    this.rngBand = step * (1 - padding);
    this.ranger = {t: "rangeBands", a: arguments};
    return this;
  }

  rangeRoundBands(x: number[], padding?: number, outerPadding?: number): D3.Scale.OrdinalScale {
    if (arguments.length < 2) padding = 0;
    if (arguments.length < 3) outerPadding = padding;
    var reverse = x[1] < x[0] ? 1 : 0,
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = Math.floor((stop - start) / (this.dmn.length - padding + 2 * outerPadding)),
        error = stop - start - (this.dmn.length - padding) * step;
    this.rng = this.steps(start + Math.round(error / 2), step);
    if (reverse) this.rng.reverse();
    this.rngBand = Math.round(step * (1 - padding));
    this.ranger = {t: "rangeRoundBands", a: arguments};
    return this;
  }

  rangeBand(): number {
    return this.rngBand;
  }

  rangeExtent(): any[] {
    return d3_scaleExtent(this.ranger.a[0]);
  }

  copy(): D3.Scale.OrdinalScale {
    return new OrdinalScaleImpl(this.dmn, this.ranger);
  }
}
