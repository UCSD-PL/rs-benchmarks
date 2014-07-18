/// <reference path="../../d3.d.ts" />
d3.merge = function(arrays: any[]): any [] {
  var n = arrays.length,
      m:number,
      i = -1,
      j = 0,
      merged:any[],
      array:any[];

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
};
