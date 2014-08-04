/// <reference path="../../d3.d.ts" />
/// <reference path="../core/document.ts" />
/// <reference path="../core/vendor.ts" />
/// <reference path="../selection/on.ts" />

var d3_event_dragSelect:string = "onselectstart" in d3_document ? null : d3_vendorSymbol(d3_documentElement.style, "userSelect"),
    d3_event_dragId = 0;

function d3_event_dragSuppress() :(suppress:any)=>void{
  var name:string = ".dragsuppress-" + ++d3_event_dragId,
      click:string = "click" + name,
      w:D3.Selection = d3.select(d3_window)
          .on("touchmove" + name, d3_eventPreventDefault)
          .on("dragstart" + name, d3_eventPreventDefault)
          .on("selectstart" + name, d3_eventPreventDefault);
  if (d3_event_dragSelect) {
    var style:Object= d3_documentElement.style,
        select:string = style[d3_event_dragSelect];
    style[d3_event_dragSelect] = "none";
  }
  return function(suppressClick) {
    w.on(name, null);
    if (d3_event_dragSelect) style[d3_event_dragSelect] = select;
    if (suppressClick) { // suppress the next click, but only if it’s immediate
      function off() { w.on(click, null); }
      w.on(click, function() { d3_eventPreventDefault(); off(); }, true);
      setTimeout(off, 0);
    }
  };
}
