/// <reference path="../../d3.d.ts" />

/*@ d3_descending :: forall T. (a:T, b:T) => number */

var d3_descending = function<T>(a:T, b:T): number {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
