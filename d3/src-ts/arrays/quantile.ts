// R-7 per <http://en.wikipedia.org/wiki/Quantile>
/// <reference path="../../d3.d.ts" />

/*@ qualif RemoveMe(v:a): 2 < len(v) */

d3.quantile = function(values:number[], p:number): number {
    var H = (values.length - 1) * p + 1;
    var h:number = Math.floor(H);
    assume(1 <= h && h < values.length);
    var v:number = values[h - 1]; /* ORIG: +values[h-1], */
    var e:number = H - h;
    return (e === 0) /* ORIG: e */ ? v + e * (values[h] - v) : v;
};

