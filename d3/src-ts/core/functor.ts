/// <reference path="../../d3.d.ts" />
function d3_functor<R,T>(func: (p : R) => T): (p : R) => T;
function d3_functor<T>(value: T): (p : any) => T;
function d3_functor<T>(v: any): (p : any) => T {
  return typeof v === "function" ? v : function() { return v; };
}

d3.functor = d3_functor;
