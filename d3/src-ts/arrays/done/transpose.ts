/// <reference path="../../../d3.d.ts" />
/// <reference path="zip.ts" />

d3.transpose = function(matrix) {
  //ORIG: return d3.zip.apply(d3, matrix);
  return d3.zip(matrix);
};
