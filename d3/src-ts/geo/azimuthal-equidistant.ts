/// <reference path="../../d3.d.ts" />
/// <reference path="../core/identity.ts" />
/// <reference path="azimuthal.ts" />
/// <reference path="geo.ts" />
/// <reference path="projection.ts" />

var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(
  function(cosλcosφ) { var c = Math.acos(cosλcosφ); return c && c / Math.sin(c); },
  d3_identity
);

(d3.geo.azimuthalEquidistant = function() {
  return d3_geo_projection(d3_geo_azimuthalEquidistant);
}).raw = d3_geo_azimuthalEquidistant;
