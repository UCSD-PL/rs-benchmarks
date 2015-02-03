/// <reference path="../../d3.d.ts" />
/// <reference path="number.ts" />

d3.interpolateString = d3_interpolateString;

interface IndexedInterpolator {
  i: number;
  x: D3.Transition.STPInterpolate<number>;
}

function d3_interpolateString(a:string, b:string) {
  var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0, // scan index for next number in b
      am:RegExpExecArray, // current match in a
      bm:RegExpExecArray, // current match in b
      bs:string, // string preceding current number in b, if any
      i = -1, // index in s
      j:number,
      am0:string,
      bm0:string,
      stpi:D3.Transition.STPInterpolate<number>,
      s:any[] = [], // string constants and placeholders
      q:IndexedInterpolator[] = []; // number interpolators

  // Interpolate pairs of numbers in a & b.
  while ((am = d3_interpolate_numberA.exec(a))
      && (bm = d3_interpolate_numberB.exec(b))) {
    if ((j = bm.index) > bi) { // a string precedes the next number in b
      bs = b.substring(bi, j);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am0 = am[0]) === (bm0 = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm0; // coalesce with previous string
      else s[++i] = bm0;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: d3_interpolateNumber(Number(am0), Number(bm0))});
    }
    bi = d3_interpolate_numberB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.substring(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2
      ? (q[0] ? (stpi = q[0].x, function(t:number) { return stpi(t) + ""; })
      : function() { return b; })
      : (j = q.length, function(t:number) {
          for (var i = 0, o:IndexedInterpolator; i < j; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
