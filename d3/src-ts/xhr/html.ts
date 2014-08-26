/// <reference path="../../d3.d.ts" />
/// <reference path="../core/document.ts" />
/// <reference path="xhr.ts" />

d3.html = function(url: string, 
callback?: (response: DocumentFragment) => void ): D3.Xhr{
return d3_xhr(url, "text/html", d3_html, 
callback );
};

function d3_html(request: XMLHttpRequest):DocumentFragment {
  var range:Range = d3_document.createRange();
  range.selectNode(d3_document.body);
  return range.createContextualFragment(request.responseText);
}
