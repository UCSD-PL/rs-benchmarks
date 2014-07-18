/// <reference path="../math/number.ts" />
/// <reference path="../../d3.d.ts" />
///  <reference path="ascending.ts" />
//   <reference path="quantile.ts" />

d3.median = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3_ascending), .5) : undefined;
};
