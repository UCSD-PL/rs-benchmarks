/// <reference path="../../d3.d.ts" />

function foo(x:number):number {
    return x + 1;
}

function bar(z:number):number {
    return foo(z);
}

d3.descending = function<T>(a:T, b:T): number {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
