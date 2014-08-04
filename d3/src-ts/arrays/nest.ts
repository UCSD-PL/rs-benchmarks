/// <reference path="../../d3.d.ts" />
/// <reference path="map.ts" />

d3.nest = function() { return new NestImpl() };

class NestImpl {
  keys = [];
  sortKeys = [];
  sortValues;
  rollup;

  private mapI(mapType, array, depth:number) {
    if (depth >= keys.length) return rollup
        ? rollup.call(this, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
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
        object.set(keyValue, map(mapType, values, depth));
      };
    } else {
      object = {};
      setter = function(keyValue, values) {
        object[keyValue] = map(mapType, values, depth);
      };
    }

    valuesByKey.forEach(setter);
    return object;
  }

  private entriesI(map, depth) {
    if (depth >= keys.length) return map;

    var array = [],
        sortKey = sortKeys[depth++];

    map.forEach(function(key, keyMap) {
      array.push({key: key, values: entries(keyMap, depth)});
    });

    return sortKey
        ? array.sort(function(a, b) { return sortKey(a.key, b.key); })
        : array;
  }

  map(array, mapType) {
    return mapI(mapType, array, 0);
  }

  entries(array) {
    return entriesI(mapI(d3.map, array, 0), 0);
  }

  key(d) {
    keys.push(d);
    return this;
  }

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  sortKeys(order) {
    sortKeys[keys.length - 1] = order;
    return this;
  }

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  sortValues(order) {
    sortValues = order;
    return this;
  }

  rollup(f) {
    rollup = f;
    return this;
  }
}
