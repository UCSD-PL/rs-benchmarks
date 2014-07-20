/// <reference path="../../d3.d.ts" />
/// <reference path="ascending.ts" />
function d3_bisector(compare: (data: any, index: number) => any): any {
    return {
    left<T>: function (a: T[], x: T, lo?: number, hi?: number): number {
            if (arguments.length < 3)
                lo = 0;
            if (arguments.length < 4)
                hi = a.length;
            while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) < 0)
                    lo = mid + 1;
                else
                    hi = mid;
            }
            return lo;
        },
        right<T>: function (a:T[], x:T, lo?: number, hi?: number): number {
            if (arguments.length < 3)
                lo = 0;
            if (arguments.length < 4)
                hi = a.length;
            while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) > 0)
                    hi = mid;
                else
                    lo = mid + 1;
            }
            return lo;
        }
    };
}

var d3_bisect = d3_bisector(d3_ascending);
d3.bisectLeft = d3_bisect.left;
d3.bisect = d3.bisectRight = d3_bisect.right;

d3.bisector = function (f: (data: any, index: number) => any): any {
    return d3_bisector(f.length === 1 ? function (d, x) {
        return d3_ascending(f(d), x);
    } : f);
};
