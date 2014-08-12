/// <reference path="../../d3.d.ts" />
// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/
// See lib/geographiclib/LICENSE for details.

function d3_adder():void {}

interface d3_adder{

  s:number 
  t:number 
  add:(y:number)=>void 
  reset:()=>void
  valueOf:()=>number


 }


d3_adder.prototype = {
  s: 0, // rounded value
  t: 0, // exact error
  add: function(y:number):void {
    d3_adderSum(y, this.t, d3_adderTemp);
    d3_adderSum(d3_adderTemp.s, this.s, this);
    if (this.s) this.t += d3_adderTemp.t;
    else this.s = d3_adderTemp.t;
  },
  reset: function():void {
    this.s = this.t = 0;
  },
  valueOf: function():number {
    return this.s;
  }
};

var d3_adderTemp:d3_adder = new d3_adder;

function d3_adderSum(a:number, b:number, o:d3_adder):void {
  var x:number = o.s = a + b, // a + b
      bv:number = x - a, av:number = x - bv; // b_virtual & a_virtual
  o.t = (a - av) + (b - bv); // a_roundoff + b_roundoff
}
