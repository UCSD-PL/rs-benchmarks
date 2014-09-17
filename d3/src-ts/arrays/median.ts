/// <reference path="../../d3.d.ts" />
/// <reference path="../math/number.ts" />

// FIXME d3.median = d3_median;

/*@ array_filter :: forall T. (a: #iArray[T], (x:T+undefined) => boolean) => {#iArray[T] | true} */
function array_filter(a, f) {
    return array_filter(a, f);
}

/*@ array_map :: forall T U. (a: #iArray[T], (x:T) => U) => {#iArray[U] | true} */
function array_map(a, f) {
    return array_map(a, f);
}

/*@ array_sort :: forall T. (a: #iArray[T], (T, T) => number) => {v : #iArray[T] | len(v) = len(a)} */
function array_sort(a, f){
    return array_sort(a, f);
}

d3.median = function(array0 : any, f?: any): any {

  /*@ array :: #iArray[number] */
  var array : number[];

  if (arguments.length > 1) { 
      array = array_map(array0, f); // ORIG: array0.map(f)
  } else {
      array = array0;
  }

  array = array_filter(array, d3_number); // ORIG: array.filter(d3_number);
    
  //ORIG: return array.length ? d3.quantile(array.sort(d3.ascending), .5 ) : undefined;
  var half = 50 / 100; // ORIG : .5
  if (array.length) 
      return d3.quantile(array_sort(array, d3.ascending), half);
  else 
      return undefined;
};
