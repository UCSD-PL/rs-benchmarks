/// <reference path="../../d3.d.ts" />
d3.permute = function (array, indexes) {
    var i = indexes.length, permutes = new Array(i);
    while (i--)
        permutes[i] = array[indexes[i]];
    return permutes;
};
