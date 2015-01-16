/// <reference path="../../../d3.d.ts" />
/// <reference path="../../math/number.ts" />
 
/*@ d3_mean :: 
    /\ forall T. (array : IArray<T>, f: (T, idx[array]) => number) => {number + undefined | true}
    /\           (array : IArray<number>) => {number + undefined | true} */ 
function d3_mean(array, f?) {
  var s = 0,
      n = array.length,
      a:number,
      i = 0,
      j = n;
  if (arguments.length === 1) {
    while (i < n) { 
      a = array[i];
      if (d3_number(a)) s += a; else --j;
      i++;
    }
  } else {
    while (i < n) { 
      a = f.call(array, array[i], i);
      if (d3_number(a)) s += a; else --j;
      i++;
    }
  }
  return j ? s / j : undefined; 
}

d3.mean = d3_mean;
