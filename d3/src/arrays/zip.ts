/// <reference path="../../d3.d.ts" />
/// <reference path="min.ts" />

d3.zip = function(...arrs:any[]):any[] {
  if (!(n = arguments.length)) return [];
  for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
    for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
      zip[j] = arguments[j][i];
    }
  }
  return zips;
};

function d3_zipLength(d:any[]):number {
  return d.length;
}
