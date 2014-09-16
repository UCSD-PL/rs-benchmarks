/// <reference path="../../d3.d.ts" />
/// <reference path="../../d3.rsc.ts" />

d3.shuffle = function<T>(array: T[]):T[] {
  var m = array.length;
  while (m) {
      // ORIG Math.random() * m-- | 0;
      m--;
      var i      = randomN(m); 
      
      // ORIG t = array[m], array[m] = array[i], array[i] = t;
      var t      = array[m];
      array[m]   = array[i];
  }
  return array;
};
