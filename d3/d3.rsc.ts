/// <reference path="d3.d.ts" />

/*@ randomN :: (n : #nat) => {v : #nat | v < n} */

function randomN(n:number):number {
    var r = Math.random() * n;
    r = r | 0;
    assume (0 <= r && r < n);
    return r;
}