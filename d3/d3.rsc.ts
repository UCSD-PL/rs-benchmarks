/// <reference path="d3.d.ts" />

/*@ check_undefined :: forall T.(T + undefined) => {T | true} */
function check_undefined<T>(x:any) : T{
    if (typeof x === "undefined") 
	return crash();
    return <T>x;
}

/*@ randomN :: (n : #nat) => {v : #nat | v < n} */
function randomN(n:number):number {
    var r = Math.random() * n;
    r = r | 0;
    assume (0 <= r && r < n);
    return r;
}