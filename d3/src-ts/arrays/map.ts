/// <reference path="../../d3.d.ts" />

d3.map = function(object?: any):D3.Map {
  var map:D3.Map = new MapImpl();
  //TODO: I don't think this instanceof line works anymore
  if (object instanceof d3_Map) object.forEach(function(key:string, value:any) { map.set(key, value); });
  else for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map():void {}

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
function d3_Map():D3.Map { return new MapImpl() }

class MapImpl implements D3.Map {
  s:{[x:string]:any};

  constructor() { this.s = {} }

  has = d3_map_has;

  get(key:string):any {
    return this.s[d3_map_prefix + key];
  }

  set<T>(key: string, value:T):T {
    return this.s[d3_map_prefix + key] = value;
  }

  remove = d3_map_remove;

  keys = d3_map_keys;

  values():Array<any> {
    var values:Array<any> = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  }

  entries():Array<any> {
    var entries:Array<any> = [];
    this.forEach(function(key, value) { entries.push({key: key, value: value}); });
    return entries;
  }

  size = d3_map_size;

  empty = d3_map_empty;

  forEach(f:(key:string,value:any)=>void):void {
    for (var key in this.s) if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this.s[key]);
  }
}

var d3_map_prefix:string = "\0", // prevent collision with built-ins
    d3_map_prefixCode:number = d3_map_prefix.charCodeAt(0);

function d3_map_has(key:string):boolean {
  return d3_map_prefix + key in this.s;
}

function d3_map_remove(key:string):boolean {
  key = d3_map_prefix + key;
  return key in this.s && delete this.s[key];
}

function d3_map_keys():Array<string> {
  var keys:string[] = [];
  this.forEach(function(key:string) { keys.push(key); });
  return keys;
}

function d3_map_size():number {
  var size = 0;
  for (var key in this.s) if (key.charCodeAt(0) === d3_map_prefixCode) ++size;
  return size;
}

function d3_map_empty():boolean {
  for (var key in this.s) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
  return true;
}
