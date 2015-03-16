/// <reference path="../../d3.d.ts" />

/*@ qualif Bot(s:Str,v:a): hasProperty(s,v) */
/*@ qualif Bot(s:Str,v:a): enumProp(s,v) */

/*@ d3_map :: /\ (d3_Map<Immutable>) => {d3_Map<Immutable> | true}
              /\ ([Immutable]{}) => {d3_Map<Immutable> | true} */
function d3_map(object) {
  var map /*@ readonly */ = new d3_Map();
  if (object instanceof d3_Map) {
    var map_object = <d3_Map>object; 
    map_object.forEach(function(key, value) 
      /*@ <anonymous> (string,top) => void */ 
      { map.set(key, value); });
  }
  else for (var key in object) map.set(key, object[key]);
  return map;
};

/*@ emptyStringIndexerObject :: forall T . () => {{[s:string]:T} | true} */
function emptyStringIndexerObject() {
  assume(false);
  return {};
};

var d3_map_prefix /*@ readonly */ = "\0", // prevent collision with built-ins
    d3_map_prefixCode /*@ readonly */ : number = d3_map_prefix.charCodeAt(0);


class d3_Map {

  /*@ internalMap : [Mutable] {[s:string]:top} */
  private internalMap = emptyStringIndexerObject();

  constructor() { }

  /*@ has : (string) : {boolean | true} */
  public has(key: string): boolean {
    return d3_map_prefix + key in this.internalMap;
  }

  /*@ get : (string) : {top | true} */
  public get(key: string): any {
    return this.internalMap[d3_map_prefix + key];
  }

  /*@ set : forall T . (string, value:top) : {top | v = value} */
  public set(key: string, value: any): any {
    this.internalMap[d3_map_prefix + key] = value;
    return value;
  }

  /*@ remove : (string) : {boolean | true} */
  public remove(key: string): boolean {
    key = d3_map_prefix + key;
    return key in this.internalMap //ORIG: && delete this[key];
  }

  /*@ keys : () : {MArray<string> | true} */
  public keys(): Array<string> {
    var keys /*@ readonly */ : string[] = [];
    this.forEach(function(key: string, IGNORED: any) 
      /*@ <anonymous> (string,top) => void */ 
      { keys.push(key); });
    return keys;
  }

  /*@ values : () : {MArray<top> | true} */
  public values(): Array<any> {
    var values /*@ readonly */ : Array<any> = [];
    this.forEach(function(key, value) 
      /*@ <anonymous> (string, top) => void */ 
      { values.push(value); });
    return values;
  }

  /*@ entries : () : {MArray<{key:string; value:top}> | true} */
  public entries() {
    var entries /*@ readonly */ = [];
    this.forEach(function(key, value) 
      /*@ <anonymous> (string, top) => void */ 
      { entries.push({ key: key, value: value }); });    
    return entries;
  }

  /*@ size : () : {number | true} */
  private size(): number {
    var size = 0;
    for (var key in this.internalMap) if (key.charCodeAt(0) === d3_map_prefixCode)++size;    
    return size;
  }

  /*@ empty : () : {boolean | true} */
  public empty(): boolean {
    for (var key in this.internalMap) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
    return true;
  }

  public forEach(f: (key: string, value: any) => void): void {
    for (var key in this.internalMap) if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this.internalMap[key]); // TODO: f.call this or this.internalMap?
  }

}

