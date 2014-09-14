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

  has(key: string): boolean {
    return d3_map_prefix + key in this;
  }

  add(value:any) {
    this.s[d3_map_prefix + value] = true;
    return value;
  }

  remove(value:any) {
    value = d3_map_prefix + value;
    return value in this.s && delete this.s[value];
  }

  values(): Array<string> {
    var keys: string[] = [];
    this.forEach(function(key: string) { keys.push(key); });
    return keys;
  }

  private size(): number {
    var size = 0;
    for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode)++size;    
    return size;
  }

  public empty(): boolean {
    for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
    return true;
  }

  forEach(f:(value:any)=>void) {
    for (var value in this.s) if (value.charCodeAt(0) === d3_map_prefixCode) f.call(this, value.substring(1));
  }
}
