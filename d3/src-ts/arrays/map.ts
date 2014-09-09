/// <reference path="../../d3.d.ts" />

// d3.map = function(object: {}): D3.Map {
//   var map = new d3_Map;
//   if (object instanceof d3_Map) {
//     var map_object = <d3_Map>object; 
//     map_object.forEach(function(key, value) { map.set(key, value); });
//   }
//   else for (var key in object) map.set(key, object[key]);
//   return map;
// };

var d3_map_prefix: string = "\0", // prevent collision with built-ins
    d3_map_prefixCode: number = d3_map_prefix.charCodeAt(0);


class d3_Map {

  public has(key: string): boolean {
    return d3_map_prefix + key in this;
  }

  public get(key: string): any {
    return this[d3_map_prefix + key];
  }

  public set<T>(key: string, value: T): T {
    return this[d3_map_prefix + key] = value;
  }

  public remove(key: string): boolean {
    key = d3_map_prefix + key;
    return key in this && delete this[key];
  }

  public keys(): Array<string> {
    var keys: string[] = [];
    this.forEach(function(key: string) { keys.push(key); });
    return keys;
  }

  public values(): Array<any> {
    var values: Array<any> = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  }

  public entries() {
    var entries = [];
    this.forEach(function(key, value) { entries.push({ key: key, value: value }); });    
    return entries;
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

  public forEach(func: (key: string, value: any) => void): void {
    for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) func.call(this, key.substring(1), this[key]);
  }

}

