/// <reference path="../../d3.d.ts" />
d3.permute = function(array: any[], indexes:any[]) {
  var i = indexes.length, permutes:any[] = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
};
