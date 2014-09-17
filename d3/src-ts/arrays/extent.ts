/// <reference path="../../d3.d.ts" />

// d3.extent = d3_extend;

// RJ: simplifying this as RSC ensures that no 'undefined' or 'null' in the array

/*@ d3_extent_1 :: forall T . ({#iArray[T] | 0 < len v}) => #pair[T] */
function d3_extent_1<T>(array: T[]): T[]{
  var i = 0,
      n = array.length,
      b = array[0],
      a = b,
      c = b;

  while (i < n) { 
      b = array[i];
      if ( b != null) {
	  if (a > b) a = b;
	  if (c < b) c = b;
      }
      i++;
  }
  return [a, c];

};

/*@ d3_extent_2 :: forall T U . ({#iArray[T] | 0 < len v}, f: (x:T, i:number) => U) => #pair[U] */
function d3_extent_2<T, U>(array: T[], f:(T, number) => U): U[] {
  var i = 0,
      n = array.length,
      b = f.call(array, array[0], 0),
      a = b,
      c = b;

  while (i < n) { 
      b = f.call(array, array[i], i);
      if ( b != null) {
	  if (a > b) a = b;
	  if (c < b) c = b;
      }
      i++;
  }
  return [a, c];
};

function d3_extent(array: any, f?:any):any {
  if (arguments.length === 1) {
      return d3_extent_1(array);
  } else {
      return d3_extent_2(array, f);
  }
};
