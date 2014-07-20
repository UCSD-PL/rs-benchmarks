/// <reference path="../../d3.d.ts" />

// d3.ascending = d3_ascending;

/*@ d3_ascending :: forall T . (T,T) => number */
function d3_ascending<T>(a:T, b:T): number {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
