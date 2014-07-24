/// <reference path="../../d3.d.ts" />
var d3_subclass = {}.__proto__?

// Until ECMAScript supports array subclassing, prototype injection works well.
function(object:any, prototype:any) {
  object.__proto__ = prototype;
}:

// And if your browser doesn't support __proto__, we'll use direct extension.
function(object:any, prototype:any) {
  for (var property in prototype) object[property] = prototype[property];
};
