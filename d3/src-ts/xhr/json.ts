/// <reference path="../../d3.d.ts" />
/// <reference path="xhr.ts" />

d3.json = function<T>(url: string, callback?: (error: T, data: T) => void ):D3.Xhr
{
  return d3_xhr(url, "application/json", d3_json, callback);
};

function d3_json<T>(request:XMLHttpRequest):T {
  return JSON.parse(request.responseText);
}
