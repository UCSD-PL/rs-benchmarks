/// <reference path="../../d3.d.ts" />
/// <reference path="../transition/transition.ts" />
/// <reference path="selection.ts" />

d3_selectionPrototype.interrupt = function() {
  return this.each(d3_selection_interrupt);
};

function d3_selection_interrupt() {
  var lock = this.__transition__;
  if (lock) ++lock.active;
}
