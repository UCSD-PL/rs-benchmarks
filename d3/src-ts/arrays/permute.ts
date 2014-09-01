/// <reference path="../../d3.d.ts" />

d3.permute = function<T>(array: T[], indexes:number[]) : T[] 
/*@ <anonymous> forall T . (array: #Array[#Immutable, T], indexes: #Array[#Immutable, #idx[array]]) => { #Array[#Immutable, T] | (len v) = (len indexes) } */
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
