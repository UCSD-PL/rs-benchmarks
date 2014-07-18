/// <reference path="../../d3.d.ts" />
/// <reference path="zip" />

d3.transpose = function(matrix:any[]):any[] {
  return d3.zip.apply(d3, matrix);
};
