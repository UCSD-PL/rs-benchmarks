var PLATFORM_NAME="Chrome",IS_FIREFOX=-1<navigator.userAgent.indexOf("Firefox"),IS_CHROME=-1<navigator.userAgent.indexOf("Chrome"),requireBaseUrl="/js";
if(IS_FIREFOX){var requireBaseUrl="chrome://linktargetfinder/content/src/js",ios=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService),ssm=Components.classes["@mozilla.org/scriptsecuritymanager;1"].getService(Components.interfaces.nsIScriptSecurityManager),dsm=Components.classes["@mozilla.org/dom/storagemanager;1"].getService(Components.interfaces.nsIDOMStorageManager),uri=ios.newURI(requireBaseUrl,"",null),principal=ssm.getCodebasePrincipal(uri);window.storage=
dsm.getLocalStorageForPrincipal(principal,"")}IS_CHROME&&(window.storage=localStorage);require.config({baseUrl:requireBaseUrl,paths:{jquery:"libs/jquery/jquery-min",underscore:"libs/underscore/underscore",backbone:"libs/backbone/backbone",text:"libs/require/text",less:"libs/less",base64:"libs/base64",mustache:"libs/mustache/mustache"},catchError:function(a){console.log(a);return a}});define("main",function(){});