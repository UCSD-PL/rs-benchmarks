/// <reference path="../../d3.d.ts" />
/// <reference path="geom.ts" />

// @deprecated; use d3.geom.voronoi triangles instead.
d3.geom.delaunay = function(vertices) {
  return d3.geom.voronoi().triangles(vertices);
};
