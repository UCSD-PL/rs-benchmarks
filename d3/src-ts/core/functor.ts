/// <reference path="../../d3.d.ts" />

/*@ d3_functor :: forall R T . (fun: (p: R) => T) => (p: R) => { T | true } */
function d3_functor<R,T>(fun: (p : R) => T): (p : R) => T;

/*@ d3_functor :: forall T . (value: T) => () => { T | true } */
function d3_functor<T>(value: T): (p : any) => T;

function d3_functor<T>(x: any): (p : any) => T {

  // return typeof v === "function" ? v : function() { return v; }; // ORIG

  /*@ readonly xx :: # */
  var xx = x; 
  
  if (typeof xx === "function") {
  // 
  // PV: There is an occurs-check failure here, which is a VALID one since 
  //     the second overload is not guaranteed to not be a function, so it 
  //     could still enter this branch. 
  // 
  //     Perhaps this could be fixed we somehow can get the guarantee that 
  //     only the first overload can be a function. 
  // 
    return xx;
  }
  else {
    return function() /*@ <anonymous> () => { T | true } */ { return xx; };
  }

}

// d3.functor = d3_functor;
