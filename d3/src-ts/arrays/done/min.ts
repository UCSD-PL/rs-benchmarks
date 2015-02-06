/// <reference path="../../../d3.d.ts" />
/// <reference path="../../../d3.rsc.ts" />

/* d3_min_1 :: forall T . (arr: IArray<T>) => { T + undefined | true } */
/*@ d3_min_1 :: forall T . (arr: IArray<T>) => { T | true } */
function d3_min_1<T>(array: T[]) : any {
  var i = 0,
      n = array.length;
  /*@ a :: T + undefined */
  var a;
  /*@ b :: T + undefined */
  var b;

  //ORIG: while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
  //PV: skip over null or undefined values
  var cnt = true;
  while (i < n && cnt) {
    a = array[i];
    if (!(a != null && a <= a)) { a = undefined; i++; }
    else { cnt = false; }
  }

  //ORIG: while (++i < n) if ((b = array[i]) != null && a > b) a = b;
  i++;
  cnt = true;
  while (i < n) {
    b = array[i];
    if (!(b != null && a > b)) { a = b; i++; }
    else { cnt = false; }
  }
    
  return check_undefined(a);
}


/*@ d3_min_2 :: forall T U . (arr: IArray<T>, f: (x:T, i:number) => U) => { U | true } */
function d3_min_2 <T, U>(array:T[], f:(x:T, i:number) => U) : any {
  var i = 0,
      n = array.length;
  /*@ a :: U + undefined */
  var a;
  /*@ b :: U + undefined */
  var b;

  //ORIG: while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
  while (i < n) {
    a = f.call(array, array[i], i);
    if (!(a != null && a <= a)) a = undefined; 
    i++;
  }

  //ORIG: while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  i++;
  while (i < n) {
    b = f.call(array, array[i], i);
    if (!(b != null && a > b)) a = b;
    i++;
  }

  return check_undefined(a);
}

/* d3_min :: /\ forall T U . (arr: IArray<T>, f: (T, number) => U) => { U | true }
             /\ forall T   . (arr: IArray<T>) => { T | true } 
 */
d3.min = function(array:any, f?:any) {
  if (arguments.length === 1) {
    return d3_min_1(array);
  } else {
    return d3_min_2(array, f);
  }
}
