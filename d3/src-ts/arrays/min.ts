/// <reference path="../../d3.d.ts" />
d3.min = function<T,U>(array:T[], f?:(v:T)=>U):any {
  var i = -1,
      n = array.length,
      a:any,
      b:any;
  if (arguments.length === 1) {
    while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
  } else {
    while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  }
  return a;
};
