/// <reference path="../../d3.d.ts" />

/*@ alias idx[a]    = {v: number | (0 <= v && v < (len a)) }  */

/*@ qualif ArrLen(v:number, a:a) : v < (len a) */


var d3_permute = function<T>(array: T[], indexes:number[]) : T[] 
/*@ <anonymous> forall T . (array:   #Array[#Immutable, T], 
                            indexes: #Array[#Immutable, #idx[array]] )
                    => { #Array[#Immutable, T] | true } */
{
  var i = indexes.length, permutes = new Array(i);
  // while (i--) permutes[i] = array[indexes[i]];
  while (i) {
    i--;
    permutes[i] = array[indexes[i]];
  }
  i--;
  return permutes;
};
