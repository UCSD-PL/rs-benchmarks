// d3.pairs = d3_pairs;

var d3_pairs = function<T> (array: T[]): number[] {
  var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = [p0 = p1, p1 = array[++i]];
  return pairs;
};
