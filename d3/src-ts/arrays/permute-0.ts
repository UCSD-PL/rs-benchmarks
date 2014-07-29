/// <reference path="../../d3.d.ts" />

var d3_permute = function<T>(array: T[], indexes:number[]) : T[]{
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
};
