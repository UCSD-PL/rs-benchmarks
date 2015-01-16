/// <reference path="../../d3.d.ts" />

/*@ qualif KeyIn(v:a,s:string): keyIn(v,s) */


d3.values = function<T>(map:{[k:string]:T}):T[] {
    var values:T[] = [];
    for (var key in map) {
		var v = map[key];
		values.push(v);
    }
    return values;
};


