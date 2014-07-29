/// <reference path="../../d3.d.ts" />

// d3.ascending = d3_ascending;

/*@ d3_ascending :: 
  /\ (a: number, b: number) => { number | [ (a < b => v = -1);
                                            (a = b => v =  0);
                                            (a > b => v =  1)] }
  /\ forall T . (T,T) => number */
function d3_ascending<T>(a:T, b:T): number {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
