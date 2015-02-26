/// <reference path="../../../d3.d.ts" />

//TODO: move to prelude? why does the annotation make rsc stall?
/* Infinity :: {number | v = numeric_positive_infinity} */
declare var Infinity:number;

/*@ d3_range :: /\ (number, number, {number | v != 0}) =>   MArray<number>
                /\ (number, number                   ) => { MArray<number> | true }
                /\ (number                           ) => { MArray<number> | true } */
function d3_range(start:number, stop?:number, step?:number): number[] {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step === Infinity) throw new Error("infinite range");
  var range:number[] = [],
       k:number = d3_range_integerScale(Math.abs(step)),
       i = 0;
  start *= k; stop *= k; step *= k;
  var j = start;
  if (step < 0) while (j > stop) { range.push(j / k); i++; j = start + step * i; }
  else          while (j < stop) { range.push(j / k); i++; j = start + step * i; }
  return range;
};

function d3_range_integerScale(x:number):number {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k;
}

// d3.range = d3_range;
