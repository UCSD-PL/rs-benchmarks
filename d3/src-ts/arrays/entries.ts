/// <reference path="../../d3.d.ts" />
d3.entries = function(map: any): any[] {
  var entries:any[] = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
