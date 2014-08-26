/// <reference path="../../d3.d.ts" />
/// <reference path="xhr.ts" />

d3.text = d3_xhrType(function(request:XMLHttpRequest) :string{
  return request.responseText;
});
