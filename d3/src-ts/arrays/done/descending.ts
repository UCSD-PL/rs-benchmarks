/// <reference path="../../../d3.d.ts" />

d3.descending = function<T>(a:T, b:T): number
/*@ <anonymous> /\ (a: number, b: number) => { number | [ (a > b => v = -1);
                                                          (a = b => v =  0);
                                                          (a < b => v =  1)] }
                /\ forall T . (T,T) => {number | true}
 */

{
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
