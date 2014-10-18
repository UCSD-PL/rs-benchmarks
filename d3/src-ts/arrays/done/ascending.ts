/// <reference path="../../../d3.d.ts" />

d3.ascending = function<T>(a:T, b:T): number {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

