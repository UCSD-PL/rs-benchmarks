/// <reference path= "../math/abs.ts" />
/// <reference path="../../d3.d.ts" />
d3.range = function(start:number, stop?:number, step?:number): number[] {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step === Infinity) throw new Error("infinite range");
  var range:number[] = [],
       k:number = d3_range_integerScale(abs(step)),
       i = -1,
       j:number;
  start *= k, stop *= k, step *= k;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
  else while ((j = start + step * ++i) < stop) range.push(j / k);
  return range;
};

function d3_range_integerScale(x:number):number {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k;
}
