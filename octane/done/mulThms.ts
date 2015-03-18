
// This will pass using "/*@ option REALS */", but we omit it when importing

/*@ alias pos = {number | v >  0 } */
/*@ alias nat = {number | v >= 0 } */

/*@ mulThm130 :: (a:{number | v = 130}) => {boolean | a * a > 7100} */
function mulThm130(a) { return true }
/*@ mulThm1 :: (a:nat, c:{number | v > 1}) => {boolean | a + a <= c * a} */
function mulThm1(a,c) { return true }
/*@ mulThm2 :: (a:nat, b:number, c:{number | v > b}) => {boolean | a + (b * a) <= c * a} */
function mulThm2(a,b,c) { 
    // assert((a * b) + a === a * (b + 1)); // either of these asserts will do
    assert(a * (b + 1) <= a * c); 
    return true;
}
