var methodMap={create:"POST",update:"PUT","delete":"DELETE",read:"GET"},cachedAttributes={listPositionByCategory:!0,listPositionByDueDate:!0,listPositionByPriority:!0,categoryCollapsed:!0,linkUrl:!0},volatileAttributes={taskExpanded:!0};
define("jquery,underscore,backbone,constants,base64,server/auth".split(","),function(d,m,h,n,i,j){function l(){for(var b="",a=0;a<16;a++)b=b+String.fromCharCode(Math.random()*256);return i.encodeBase64(b).replace(/\//g,"_").replace(/\+/g,"-")}function e(b,a,e){var c=typeof a.url=="string"?a.url:a.url(),k=true,c=m.extend({type:methodMap[b],dataType:"json",url:c+"?responseType=flat&includeDeleted=false&includeDone=false",xhrFields:{withCredentials:true},crossDomain:true},e);if(a&&(b=="create"||b=="update")){c.contentType=
"application/json";if(b=="create"){var g=l();a.set({id:g})}g=a.toJSON();b=="update"&&(k=false);for(var f in g)cachedAttributes[f]?window.storage.setItem(a.get("id")+":"+f,JSON.stringify(a.get(f))):a.get(f)!=a.previous(f)&&b=="update"&&f!="id"&&!volatileAttributes[f]&&(k=true);c.data=b=="create"?JSON.stringify([g]):JSON.stringify(g)}if(k){var h=c.success;c.success=function(a,c,f){var d=function(a){if(a)for(var b in cachedAttributes)typeof a[b]=="undefined"&&(a[b]=JSON.parse(window.storage.getItem(a.id+
":"+b)))};if(a instanceof Array)if(b=="create"){a=a[0];d(a)}else for(var e=0;e<a.length;e++)d(a[e]);else d(a);return h(a,c,f)};var i=c.error;c.error=function(a,b,c){b=="parsererror"?j.logInUsingStoredCredentials(function(){typeof chrome!="undefined"&&chrome.runtime.sendMessage({action:"refresh"})},function(){j.logOut()}):b==409?j.logOut():i(a,b,c)};return d.ajax(c)}e.success()}(function(){d(".server-error .try-again").on("click",function(){location.reload()});d.ajaxSetup({timeout:12E3});d(document).ajaxError(function(b,
a){(a.status>=500||a.statusText=="timeout")&&d(".server-error").addClass("show")})})();h.sync=e;return{sync:e,createGlobalId:l}});