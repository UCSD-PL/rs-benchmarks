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


/*@ d3_min :: /\ forall T U . (arr: #Array[#Immutable, T], f: (x:T, i:number) => U) => { U + undefined | true }
              /\ forall T  . (arr: #Array[#Immutable, T]) => { T + undefined | true } 
 */
declare function d3_min(arr:any, f?:any):any;



/*@ d3_zipLength :: (d:#iArray[number], i:number) => #nat */
function d3_zipLength(d:number[], i:number):number {
  return d.length;
}


/*@ dzip :: (args:#iArray[#iArray[number]]) => {v:#iArray[#iArray[number]] | true} */
function dzip(args:number[][]):number[][] {
    var n:number = args.length;
    if (!n) return [];

    var m : number = d3_min(args, d3_zipLength);
  
    if (typeof m === "number") { 
      var zips = new Array(<number>m);
       
      for (var i = 0; i < m; i++) {
          zips[i] = new Array(n);
      	var zip = zips[i];
          for (var j = 0; j < n; j++) {
            zip[j] = args[j][i];
          }
      }

      return zips;
    }
    return crash();
}
