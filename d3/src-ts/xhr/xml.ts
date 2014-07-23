/// <reference path="../../d3.d.ts" />
/// <reference path="xhr.ts" />

d3.xml = d3_xhrType(function(request) {
  return request.responseXML;
});
