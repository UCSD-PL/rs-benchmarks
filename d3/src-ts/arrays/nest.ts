/// <reference path="../../d3.d.ts" />
/// <reference path="map.ts" />

d3.nest = function() { return new NestImpl() };

interface NestComparator {
  (d1: any, d2: any): number;
};

class NestImpl {
  keys:any[] = [];
  sortKeysVar:NestComparator[] = [];
  sortValuesVar:NestComparator;
  rollupVar:(data: any, index: number) => any;

  private mapI(mapType:any, array, depth:number) {
    if (depth >= this.keys.length) return this.rollupVar
        ? this.rollupVar.call(this, array) : (this.sortValuesVar
        ? array.sort(this.sortValuesVar)
        : array);

    var i = -1,
        n = array.length,
        key = this.keys[depth++],
        keyValue,
        object,
        setter,
        valuesByKey = d3.map(),
        values;

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
        values.push(object);
      } else {
        valuesByKey.set(keyValue, [object]);
      }
    }

    if (mapType) {
      object = mapType();
      setter = function(keyValue, values) {
        object.set(keyValue, this.mapI(mapType, values, depth));
      };
    } else {
      object = {};
      setter = function(keyValue, values) {
        object[keyValue] = this.mapI(mapType, values, depth);
      };
    }

    valuesByKey.forEach(setter);
    return object;
  }

  private entriesI(map, depth) {
    if (depth >= this.keys.length) return map;

    var array = [],
        sortKey = this.sortKeysVar[depth++];

    map.forEach(function(key, keyMap) {
      array.push({key: key, values: this.entriesI(keyMap, depth)});
    });

    return sortKey
        ? array.sort(function(a, b) { return sortKey(a.key, b.key); })
        : array;
  }

  map(array: any[], mapType: any) {
    return this.mapI(mapType, array, 0);
  }

  entries(array: any[]) {
    return this.entriesI(this.mapI(d3.map, array, 0), 0);
  }

  key(keyFunction: (data: any, index: number) => string) {
    this.keys.push(keyFunction);
    return this;
  }

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  sortKeys(comparator: NestComparator) {
    this.sortKeysVar[this.keys.length - 1] = comparator;
    return this;
  }

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  sortValues(comparator: NestComparator) {
    this.sortValuesVar = comparator;
    return this;
  }

  rollup(f: (data: any, index: number) => any) {
    this.rollupVar = f;
    return this;
  }
}
