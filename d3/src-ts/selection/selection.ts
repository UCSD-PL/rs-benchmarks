/// <reference path="../../d3.d.ts" />
/// <reference path="../core/array.ts" />
/// <reference path="../core/document.ts" />
/// <reference path="../core/subclass.ts" />
/// <reference path="../core/vendor.ts" />

function d3_selection(groups) {
  d3_subclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return n.querySelectorAll(s); },
    d3_selectMatcher = d3_documentElement.matches || d3_documentElement[d3_vendorSymbol(d3_documentElement, "matchesSelector")],
    d3_selectMatches = function(n, s) { return d3_selectMatcher.call(n, s); };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0] || null; };
  d3_selectAll = Sizzle;
  d3_selectMatches = Sizzle.matchesSelector;
}

d3.selection = function() {
  return d3_selectionRoot;
};

var d3_selectionPrototype = d3.selection.prototype = [];

/// <reference path="select.ts" />
/// <reference path="selectAll.ts" />
/// <reference path="attr.ts" />
/// <reference path="classed.ts" />
/// <reference path="style.ts" />
/// <reference path="property.ts" />
/// <reference path="text.ts" />
/// <reference path="html.ts" />
/// <reference path="append.ts" />
/// <reference path="insert.ts" />
/// <reference path="remove.ts" />
/// <reference path="data.ts" />
/// <reference path="datum.ts" />
/// <reference path="filter.ts" />
/// <reference path="order.ts" />
/// <reference path="sort.ts" />
/// <reference path="on.ts" />
/// <reference path="each.ts" />
/// <reference path="call.ts" />
/// <reference path="empty.ts" />
/// <reference path="node.ts" />
/// <reference path="size.ts" />
/// <reference path="enter.ts" />

/// <reference path="transition.ts" />
/// <reference path="interrupt.ts" />

// TODO fast singleton implementation?
d3.select = function(node) {
  var group = [typeof node === "string" ? d3_select(node, d3_document) : node];
  group.parentNode = d3_documentElement;
  return d3_selection([group]);
};

d3.selectAll = function(nodes) {
  var group = d3_array(typeof nodes === "string" ? d3_selectAll(nodes, d3_document) : nodes);
  group.parentNode = d3_documentElement;
  return d3_selection([group]);
};

var d3_selectionRoot = d3.select(d3_documentElement);
