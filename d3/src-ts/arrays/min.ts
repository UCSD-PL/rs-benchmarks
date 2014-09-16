/// <reference path="../../d3.d.ts" />

/*@ d3_min_1 :: forall T . (arr: #Array[#Immutable, T]) => { T + undefined | true } */
function d3_min_1<T>(array: T[]) : any {
  var i = -1,
      n = array.length;

  /*@ a :: T + undefined */
  var a = undefined;
  /*@ b :: T + undefined */
  var b = undefined;

  //ORIG: while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
  //PV: skip over null or undefined values
  i++;
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
  return a;
}


/*@ d3_min_2 :: forall T U . (arr: #Array[#Immutable, T], f: (x:T, i:number) => U) => { U + undefined | true } */
function d3_min_2 <T, U>(array:T[], f:(x:T, i:number) => U) : any {
    
  var i = -1,
      n = array.length;
 

  /*@ aa :: U + undefined */
  var aa = undefined;
    
  /*@ bb :: U + undefined */
  var bb = undefined;


  //ORIG: while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
  i++;
  while (i < n) {
      aa = f.call(array, array[i], i);
      if (!(aa != null && aa <= aa)) aa = undefined; 
      i++;
  }

  //ORIG: while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  i++;
  while (i < n) {
      bb = f.call(array, array[i], i);
      if (!(bb != null && aa > bb)) aa = bb;
      i++;
  }

  return aa;
}

/* d3_min :: /\ forall T U . (arr: #Array[#Immutable, T], f: (x:T, i:number) => U) => { U + undefined | true }
             /\ forall T   . (arr: #Array[#Immutable, T]) => { T + undefined | true } 
 */
d3.min = function (array:any, f?:any) {
  if (arguments.length === 1) {
      return d3_min_1(array);
  } else {
      return d3_min_2(array, f);
  }
}

// HIDEME function d3_minZZZZ<T, U>(array:any, f?:any) {
// HIDEME 
// HIDEME   var i = -1,
// HIDEME       n = array.length;
// HIDEME   
// HIDEME   if (arguments.length === 1) {
// HIDEME   
// HIDEME     /*@ a :: T + undefined */
// HIDEME     var a = undefined;
// HIDEME     
// HIDEME     /*@ b :: T + undefined */
// HIDEME     var b = undefined;
// HIDEME 
// HIDEME     //ORIG: while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
// HIDEME     //PV: skip over null or undefined values
// HIDEME     i++;
// HIDEME     var cnt = true;
// HIDEME     while (i < n && cnt) {
// HIDEME       a = array[i];
// HIDEME       if (!(a != null && a <= a)) { a = undefined; i++; }
// HIDEME       else { cnt = false; }
// HIDEME     }
// HIDEME 
// HIDEME     //ORIG: while (++i < n) if ((b = array[i]) != null && a > b) a = b;
// HIDEME     i++;
// HIDEME     cnt = true;
// HIDEME     while (i < n) {
// HIDEME       b = array[i];
// HIDEME       if (!(b != null && a > b)) { a = b; i++; }
// HIDEME       else { cnt = false; }
// HIDEME     }
// HIDEME     return a;
// HIDEME 
// HIDEME   } 
// HIDEME   else {    
// HIDEME   
// HIDEME     /*@ aa :: U + undefined */
// HIDEME     var aa = undefined;
// HIDEME     
// HIDEME     /*@ bb :: U + undefined */
// HIDEME     var bb = undefined;
// HIDEME 
// HIDEME 
// HIDEME     //ORIG: while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
// HIDEME     i++;
// HIDEME     while (i < n) {
// HIDEME       aa = f.call(array, array[i], i);
// HIDEME       if (!(aa != null && aa <= aa)) aa = undefined; 
// HIDEME       i++;
// HIDEME     }
// HIDEME 
// HIDEME     //ORIG: while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
// HIDEME     i++;
// HIDEME     while (i < n) {
// HIDEME       bb = f.call(array, array[i], i);
// HIDEME       if (!(bb != null && aa > bb)) aa = bb;
// HIDEME       i++;
// HIDEME     }
// HIDEME 
// HIDEME     return aa;
// HIDEME   }
// HIDEME 
// HIDEME   // return a;
// HIDEME }
