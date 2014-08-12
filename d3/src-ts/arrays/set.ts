/// <reference path="../../d3.d.ts" />
/// <reference path="map.ts" />

d3.set = function(array?: Array<any>): D3.Set {
  var set = new SetImpl();
  if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
  return set;
};

function d3_Set() { return new SetImpl() }

class SetImpl implements D3.Set {
  s:{[x:string]:any};

  constructor() { this.s = {} }

  has = d3_map_has;

  add(value:any) {
    this.s[d3_map_prefix + value] = true;
    return value;
  }

  remove(value:any) {
    value = d3_map_prefix + value;
    return value in this.s && delete this.s[value];
  }

  values = d3_map_keys;

  size = d3_map_size;

  empty = d3_map_empty;

  forEach(f:(value:any)=>void) {
    for (var value in this.s) if (value.charCodeAt(0) === d3_map_prefixCode) f.call(this, value.substring(1));
  }
}
