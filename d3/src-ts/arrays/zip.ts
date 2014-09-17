/// <reference path="../../d3.d.ts" />
// <reference path="min.ts" />

// d3.zip = function(...arrs:any[]):any[] {
//   if (!(n = arguments.length)) return [];
//   for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
//     for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
//       zip[j] = arguments[j][i];
//     }
//   }
//   return zips;
// };


/*@ d3_zipLength :: (d:#iArray[number], i:number) => #nat */
function d3_zipLength(d:number[], i:number):number {
  return d.length;
}

// TODO: this should be d3.zip -- after fixing POLYMORPHISM https://github.com/UCSD-PL/RefScript/issues/32

/*@ dzip :: (args:#iArray[#iArray[number]]) => {v:#iArray[#iArray[number]] | true} */
function dzip(args:number[][]):number[][] {
    var n:number = args.length;
    
    if (!n) return [];
    
    assert (n > 0);

    var m = d3.min(args, d3_zipLength);
  
    var zips = new Array(m);
       
    for (var i = 0; i < m; i++) {
      var zip = new Array(n);
      zips[i] = zip;
      for (var j = 0; j < n; j++) {
	  var tmp = args[j];
	  assume(i < tmp.length); // NOTE: check relies on d3_min returning a number that is smaller than length of ALL input rows.
          zip[j] = tmp[i];
      }
    }

    return zips;
}
