/// <reference path="../../d3.d.ts" />
/// <reference path="../core/array.ts" />
/// <reference path="event.ts" />
/// <reference path="mouse.ts" />

d3.touches = function(container, touches) {
  if (arguments.length < 2) touches = d3_eventSource().touches;
  return touches ? d3_array(touches).map(function(touch) {
    var point = d3_mousePoint(container, touch);
    point.identifier = touch.identifier;
    return point;
  }) : [];
};
