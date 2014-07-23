/// <reference path="../../d3.d.ts" />

// RJ: I tried adding this but it still fails. At any rate, we should be able to
// check this WITHOUT requiring the below annotation.
/*  d3_descending :: forall T. (a:T, b:T) => number */

var d3_descending = function <T>(a: T, b: T): number {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
