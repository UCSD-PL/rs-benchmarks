/// <reference path="../../d3.d.ts" />
d3.entries = function (map) {
    var entries = [];
    for (var key in map)
        entries.push({ key: key, value: map[key] });
    return entries;
};
