
/*@ alias Nat       = {number | 0 <= v}     */
/*@ alias iArray[T] = #Array[#Immutable, T] */
/*@ alias pair[T]   = {v: #iArray[T] | len(v) = 2} */

/*@ randomN :: (n:#Nat) => {v:#Nat | v < n} */

function randomN(n:number):number {
    var r = Math.random() * n;
    r = r | 0;
    assume (0 <= r && r < n);
    return r;
}