/// <reference path="../../d3.d.ts" />
/// <reference path="../math/number.ts" />

/* d3_mean :: /\ (array : #iArray[number]) => {number + undefined | true} 
               /\ forall T. (array : #iArray[T], f: (T, {#nat | v < len(array)}) => number) => {number + undefined | true} */

d3.mean = function (array: any, f?: any): number {
  var s = 0,
      n = array.length,
      a:number,
      i = 0,
      j = n;
  if (arguments.length === 1) {
    while (i < n) { 
	a = array[i];
	if (d3_number(a)) { 
          s += a;
	} else {
	    --j;
	}
	i++;
    }
  } else {
      while (i < n) { 
	  a = f.call(array, array[i], i);
	  if (d3_number(a)) { 
	      s += a; 
	  } else { 
	      --j;
	  }
	  i++;
      }
  }
  if (j) {return s / j;}  else {return undefined;}  // ORIG: return j ? s / j : undefined;
}
