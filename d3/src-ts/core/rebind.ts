/// <reference path="../../d3.d.ts" />
// Copies a variable number of methods from source to target.
d3.rebind = function(target: any, source: any, ...names: Array<any>): any {
  var i = 0, n = names.length, method:any;
  while (i++ < n) target[method = names[i]] = d3_rebind(target, source, source[method]);
  return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target:any, source:any, method:any) {
  return function() {
    var value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}
