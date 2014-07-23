/// <reference path="../../d3.d.ts" />
/// <reference path="azimuthal.ts" />
/// <reference path="geo.ts" />
/// <reference path="projection.ts" />

var d3_geo_gnomonic = d3_geo_azimuthal(
  function(cosλcosφ) { return 1 / cosλcosφ; },
  Math.atan
);

(d3.geo.gnomonic = function() {
  return d3_geo_projection(d3_geo_gnomonic);
}).raw = d3_geo_gnomonic;
