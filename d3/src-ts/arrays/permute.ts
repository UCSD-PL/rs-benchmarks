/// <reference path="../../d3.d.ts" />
d3.permute = function<T>(array: T[], indexes:number[]) : T[] {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
};
