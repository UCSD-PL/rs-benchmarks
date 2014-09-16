/// <reference path="../../d3.d.ts" />
 
d3.sum = function (array: any, f?:any): number {
    var s:number = 0;
    var n:number = array.length;
    var i:number = 0;
    var a;

    if (arguments.length === 1) {
      while (i < n) {
          a = array[i]; 
          if (!isNaN(a)) { 
 	      s += a;
 	  }
 	  i++;
      }
    } else {
      while (i < n) { 
	  a = f.call(array, array[i], i);
          if (!isNaN(a)) { 
      	      s += a;
      	  }
      	  i++;
      }
    }

  return s;
};
