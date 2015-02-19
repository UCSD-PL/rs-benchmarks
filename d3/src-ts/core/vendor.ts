/// <reference path="../../d3.d.ts" />
/// <reference path="document.ts" />

/*@ d3_vendorSymbol :: (object: Object, name: string): { string | true } */
function d3_vendorSymbol(object:any, name:string) {
  if (name in object) return name;
  name = name.charAt(0).toUpperCase() + name.substring(1);
  for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
    var prefixName = d3_vendorPrefixes[i] + name;
    if (prefixName in object) return prefixName;
  }
}

var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];
