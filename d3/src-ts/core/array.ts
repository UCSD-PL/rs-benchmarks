/// <reference path="../../d3.d.ts" />
var d3_arraySlice = function<T>(start:number, end?:number):T[] {
	var doSlice = (<Array<T>>[]).slice;
	return doSlice.call(this, start, end);
}, // TODO: this is so much uglier than the original :(
    d3_array = function(list:any):any[] { return d3_arraySlice.call(list); }; // conversion for NodeLists
