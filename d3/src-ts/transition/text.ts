/// <reference path="../../d3.d.ts" />
/// <reference path="transition.ts" />
/// <reference path="tween.ts" />

d3_transitionPrototype.text = function(value) {
  return d3_transition_tween(this, "text", value, d3_transition_text);
};

function d3_transition_text(b) {
  if (b == null) b = "";
  return function() { this.textContent = b; };
}
