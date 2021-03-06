/// <reference path="../../d3.d.ts" />
/// <reference path="../core/source.ts" />
/// <reference path="../core/target.ts" />
/// <reference path="geo.ts" />
/// <reference path="distance.ts" />

// @deprecated use {type: "LineString"} or d3.geo.distance instead.
d3.geo.greatArc = function() {
  var source = d3_source, source_,
      target = d3_target, target_;

  function greatArc() {
    return {type: "LineString", coordinates: [
      source_ || source.apply(this, arguments),
      target_ || target.apply(this, arguments)
    ]};
  }

  greatArc.distance = function() {
    return d3.geo.distance(
      source_ || source.apply(this, arguments),
      target_ || target.apply(this, arguments)
    );
  };

  greatArc.source = function(_) {
    if (!arguments.length) return source;
    source = _, source_ = typeof _ === "function" ? null : _;
    return greatArc;
  };

  greatArc.target = function(_) {
    if (!arguments.length) return target;
    target = _, target_ = typeof _ === "function" ? null : _;
    return greatArc;
  };

  greatArc.precision = function() {
    return arguments.length ? greatArc : 0;
  };

  return greatArc;
};
