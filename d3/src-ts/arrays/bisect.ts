/// <reference path="../../d3.d.ts" />
/// <reference path="done/ascending.ts" />

/*@ qualif Len(v:b, w:a): v <= (len w) */

interface Id3_bisector<T> {
	/*@ left : /\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]}, hi:{number | [lo <= v ; v <= (len a)]}) => number
				/\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]})                                         => number
				/\ (a: IArray<T>, x:T)                                                                               => {number | true} */
	left : (a: T[], x: T, lo?: number, hi?: number) => number;
	/*@ right : /\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]}, hi:{number | [lo <= v ; v <= (len a)]}) => number
				/\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]})                                         => number
				/\ (a: IArray<T>, x:T)                                                                               => {number | true} */
	right: (a: T[], x: T, lo?: number, hi?: number) => number;
}

/*@ d3_bisector :: forall T . (comp: (T,T)=>number) => {Id3_bisector<Immutable, T> | true} */
function d3_bisector<T>(comp: (data: T, index: T) => number): Id3_bisector<T> {
	var compare /*@ readonly */ = comp;

	var rightAllArgs /*@ readonly */ = function(a, x, lo, hi)
	/*@ <anonymous> (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]}, hi:{number | [lo <= v ; v <= (len a)]}) => number */
	{
		while (lo < hi) {
			var mid = lo + hi >>> 1;
			assume(lo <= mid);
			assume(mid < hi);
			if (compare(a[mid], x) > 0)
				hi = mid;
			else
				lo = mid + 1;
		}
		return lo;
	}

	var leftAllArgs /*@ readonly */ = function(a, x, lo, hi)
	/*@ <anonymous> (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]}, hi:{number | [lo <= v ; v <= (len a)]}) => number */
	{
		while (lo < hi) {
			var mid = lo + hi >>> 1;
			assume(lo <= mid);
			assume(mid < hi);
			if (compare(a[mid], x) < 0)
				lo = mid + 1;
			else
				hi = mid;
		}
		return lo;
	}

    return {
    	left: function(a, x, lo?, hi?) 
			/*@ <anonymous> /\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]}, hi:{number | [lo <= v ; v <= (len a)]}) => number
							/\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]})                                         => number
							/\ (a: IArray<T>, x:T)                                                                                => {number | true} */
			{
				if (arguments.length < 3)
					return rightAllArgs(a, x, 0, a.length);
				if (arguments.length < 4)
					return rightAllArgs(a, x, lo, a.length);
				return rightAllArgs(a, x, lo, hi);
			},
		right: function(a, x, lo?, hi?) 
			/*@ <anonymous> /\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]}, hi:{number | [lo <= v ; v <= (len a)]}) => number
							/\ (a: IArray<T>, x:T, lo:{number | [0 <= v ; v <= (len a)]})                                         => number
							/\ (a: IArray<T>, x:T)                                                                                => {number | true} */
			{
				if (arguments.length < 3)
					return rightAllArgs(a, x, 0, a.length);
				if (arguments.length < 4)
					return rightAllArgs(a, x, lo, a.length);
				return rightAllArgs(a, x, lo, hi);
			}
	};
}

// var d3_bisect = d3_bisector(d3_ascending);
// d3.bisectLeft = d3_bisect.left;
// d3.bisectRight = d3_bisect.right;
// d3.bisect = d3_bisect.right;

// d3.bisector = function (f: (data: any, index?: number) => any): any {
// 	return d3_bisector(f.length === 1
// 		? function (d, x) { return d3_ascending(f(d), x); }
// 		: f);
// };
