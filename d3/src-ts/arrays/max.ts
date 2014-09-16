/// <reference path="../../d3.d.ts" />

d3.max = function(array, f?) {

  var i = -1,
      n = array.length;
  
  /*@ a :: T + undefined */
  var a = undefined;
  /*@ b :: T + undefined */
  var b = undefined;

  if (arguments.length === 1) {

    //ORIG: while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
    //PV: skip over null or undefined values
    i++;
    var cnt = true;
    while (i < n && cnt) {
      a = array[i];
      if (!(a != null && a <= a)) { a = undefined; i++; }
      else { cnt = false; }
    }

    //ORIG: while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    i++;
    cnt = true;
    while (i < n) {
      b = array[i];
      if (!(b != null && b > a)) { a = b; i++; }
      else { cnt = false; }
    }

  } 
  else {    

    //ORIG: while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
    i++;
    while (i < n) {
      a = f.call(array, array[i], i);
      if (!(a != null && a <= a)) a = undefined; 
      i++;
    }

    //ORIG: while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    i++;
    while (i < n) {
      b = f.call(array, array[i], i);
      if (!(b != null && b > a)) a = b;
      i++;
    }

  }

  return a;
}
