/// <reference path="../../d3.d.ts" />
/// <reference path="../core/class.ts" />

d3.map = function(object?: any):Map {
  var map:Map = new d3_Map;
  if (object instanceof d3_Map) object.forEach(function(key, value) { map.set(key, value); });
  else for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map():Map {}

d3_class(d3_Map, {
  has: d3_map_has,
  get: function(key:string):any {
    return this[d3_map_prefix + key];
  },
  set: function<T>(key: string, value:T):T {
    return this[d3_map_prefix + key] = value;
  },
  remove: d3_map_remove,
  keys: d3_map_keys,
  values: function():Array<any> {
    var values:Array<any> = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  },
  entries: function():Array:<any> {
    var entries:Array<any> = [];
    this.forEach(function(key, value) { entries.push({key: key, value: value}); });
    return entries;
  },
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: function(f:(key:string,value:any)=>void):void {
    for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this[key]);
  }
});

var d3_map_prefix:string = "\0", // prevent collision with built-ins
    d3_map_prefixCode:number = d3_map_prefix.charCodeAt(0);

function d3_map_has(key:string):boolean {
  return d3_map_prefix + key in this;
}

function d3_map_remove(key:string):boolean {
  key = d3_map_prefix + key;
  return key in this && delete this[key];
}

function d3_map_keys():Array<string> {
  var keys = [];
  this.forEach(function(key) { keys.push(key); });
  return keys;
}

function d3_map_size():number {
  var size = 0;
  for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) ++size;
  return size;
}

function d3_map_empty():boolean {
  for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
  return true;
}
