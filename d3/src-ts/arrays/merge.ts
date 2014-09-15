/// <reference path="../../d3.d.ts" />
d3.merge = function<T>(arrays: T[][]): T[] {
  var n = arrays.length,
      i = -1,
      j = 0;

  //Original code:
  //while (++i < n) j += arrays[i].length;
  i++;
  while (i < n) {
    j += arrays[i].length;
    i++;
  }

  var merged:T[] = new Array(j);

  //while (--n >= 0) {
  n--;
  while (n >= 0) {
    var array:T[] = arrays[n];
    var m = array.length;
    //while (--m >= 0) {
    m--;
    while (m >= 0 && j > 0) {
      merged[--j] = array[m];
      m--;
    }
    n--;
  }

  return merged;
};
