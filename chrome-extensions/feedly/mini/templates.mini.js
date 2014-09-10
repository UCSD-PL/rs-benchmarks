// declare package:templates.mini
templates=templates || {};
templates.mini=templates.mini || {};
(function(){
var _L=devhd.i18n.L,$L=devhd.i18n.$L,$=[],$E="",$P=templates.mini;
function $A(_){var a=arguments,x;for(x=1;x<a.length;x++)_.push(a[x])}


// local function to each template class (short versions that refer to full package names)
var s3, $1, $2, $3, jsesc, x2;

try
{
	s3 = function (a) {return devhd.s3( "images/" + a ); };       // img resolve
	x2 = function (a) {return devhd.x2( "images/" + a ); };       // img resolve
    $1 = devhd.str.toSafeHTML;                                    // called by $( ... )
    $2 = devhd.str.toSafeAttr;                                    // called by $[ ... ]
	$3 = devhd.str.stripTags;                       			  // called by $< ... >
	jsesc = devhd.str.toJsEsc;                                    // jsesc ... needs to be killed
}
catch( ignore )
{
}


$P.cssMeta=function(ui){var _=[];
$A(_,$[0],x2( 'feedly-mini-add-v3' ),$[1],x2( 'feedly-mini-added-v3' ),$[2],x2( "feedly-mini-save-v3" ),$[3],x2( "feedly-mini-saved-v3" ),$[4],x2( "feedly-mini-facebook-v3" ),$[5],x2( "feedly-mini-twitter-v3" ),$[6],x2( "feedly-mini-email" ),$[7],x2( "feedly-mini-evernote-v3" ),$[8],x2( "feedly-mini-evernoted-v3" ),$[9],x2( "feedly-mini-tag-v3" ),$[10],x2( "feedly-mini-tagged-v3" ),$[11],x2( "feedly-mini-prefs" ),$[12],s3('feedly-mini-box.png'),$[13],s3('feedly-mini-boxed.png'),$[14],s3('feedly-mini-newtag@2x.png'),$[15]);
return _.join($E);
}
$P.layoutMeta=function(feedUrl, subscribed, isTagged, saved){var _=[];
$A(_,$[16]);
if(feedUrl && feedUrl.length > 0 && feedUrl != "undefined" && feedUrl != "null"){
    $A(_,$[17],$2(encodeURIComponent( "subscription/feed/" + feedUrl)),$[18],feedUrl,$[19]);
    if(subscribed){
        $A(_,$[20]);
    }else{
        $A(_,$[21]);
    }
    $A(_,$[22]);
}
$A(_,$[23]);
if( saved == true ){
    $A(_,$[24]);
}else{
    $A(_,$[25]);
}
$A(_,$[26]);
if(isTagged){
    $A(_,$[27]);
}else{
    $A(_,$[25]);
}
$A(_,$[28]);
return _.join($E);
}
$P.addTag=function(userTags, entryTags){var _=[];
if(userTags.length == 0){
    $A(_,$[29]);
}
$A(_,$[30]);
for(var i = 0; i < userTags.length; i++){
    if(userTags[i].id.indexOf('global.') == -1){
        if(hasTag(entry.tags, userTags[i].id)){
            $A(_,$[31],userTags[i].id,$[32]);
        }else{
            $A(_,$[31],userTags[i].id,$[33]);
        }
        $A(_,$[34],userTags[i].label,$[35]);
    }
}
$A(_,$[36]);
return _.join($E);
}
$P.notebooks=function(notebooks){var _=[];
if(notebooks.length == 0){
    $A(_,$[37]);
}
$A(_,$[30]);
for(var i = 0; i < notebooks.length; i++){
    $A(_,$[31],notebooks[i].guid,$[38],notebooks[i].type,$[39],notebooks[i].name,$[35]);
}
$A(_,$[40]);
return _.join($E);
}
$P.error=function(){var _=[];
$A(_,$[41]);
return _.join($E);
}
$=[
" \nhtml, body \n{ \nfont-family: \"Helvetica Neue\", Helvetica, sans-serif; \nfont-size: 13px; \nmargin: 0; \npadding: 0; \n} \np \n{ \nmargin: 0; \npadding: 0; \ntext-align: center; \n} \na \n{ \ntext-decoration: none; \ncolor: inherit; \n} \nul \n{ \nlist-style-type: none; \npadding: 0; \nmargin: 0; \noverflow-y: scroll; \n} \n#mini-popup \n{ \nposition: absolute; \nborder-radius: 4px; \nbackground-color: #FFF; \nborder: 1px solid rgba(188,188,188,0.9); \nwidth: 42px; \nright: 0; \nbottom: 0; \nbackground-color: #FFF; \n} \n.block \n{ \nheight: 20px; \npadding: 10px 5px 10px 5px; \nborder-top: solid 1px #EDEDED; \nopacity: 0.7; \nbackground-position: center center; \nbackground-repeat: no-repeat; \nbackground-size: 40px; \n} \n.block:hover \n{ \ncursor: pointer; \nbackground-color: #EDEDED; \n} \n.block.block-green \n{ \nbackground-color: #21A836; \n} \n.block.block-green:hover \n{ \nbackground-color: #1D9236; \n} \n.btn \n{ \ncolor: #FFF; \nbackground-color: #2BB24C; \ntext-align: center; \npadding: 10px; \nfont-size: 12px; \nline-height: 14px; \n} \n.btn:hover \n{ \ncursor: pointer; \nbackground-color: #1D9236; \n} \n#meta \n{ \nheight: 22px; \nborder: 0; \nborder-top-left-radius: 3px; \nborder-top-right-radius: 3px; \nbackground-image: url(","); \nopacity: 1; \n} \n#meta.subscribed \n{ \nbackground-image: url(","); \nbackground-color: #7F7F7F; \n} \n#meta.subscribed:hover \n{ \nbackground-color: #666; \n} \n#save \n{ \nbackground-image: url( "," ); \n} \n#save:first-child \n{ \nborder-top-left-radius: 3px; \nborder-top-right-radius: 3px; \nborder-top: none; \n} \n#save.saved \n{ \nbackground-image: url( "," ); \nopacity: 1; \n} \n#fb \n{ \nbackground-image: url( "," ); \n} \n#tweet \n{ \nbackground-image: url( "," ); \n} \n#gmail \n{ \nbackground-image: url( "," ); \n} \n#evernote \n{ \nbackground-image: url( ",
" ); \n} \n#evernote.evernoted \n{ \nbackground-image: url( "," ); \nopacity: 1; \n} \n#tags \n{ \nbackground-image: url( "," ); \n} \n#tags.tagged \n{ \nbackground-image: url( "," ); \nopacity: 1; \n} \n#footer \n{ \nborder-bottom-left-radius: 3px; \nborder-bottom-right-radius: 3px; \nheight: 0; \nbackground-image: url( "," ); \nbackground-size: 10px; \n} \n.popup \n{ \nposition: absolute; \nright: 52px; \nbottom: 0; \nwidth: 180px; \nborder-radius: 4px; \nbackground-color: #FFF; \nborder: 1px solid rgba(188,188,188,0.9); \n} \n.popup-arrow \n{ \nposition: absolute; \nright: 46px; \nwidth: 0; \nheight: 0; \nborder-top: 7px solid transparent; \nborder-bottom: 7px solid transparent; \nborder-left: 7px solid #bbb; \n} \n.popup ul \n{ \nmax-height: 200px; \n} \n.popup .tag \n{ \nwidth: 100%; \npadding: 5px 0; \nborder-top: 1px solid #EDEDED; \ncolor: #7F7F7F; \nbackground-image: url( ","); \nbackground-repeat: no-repeat; \nbackground-position:5px center; \n} \n.popup .tag:hover \n{ \ncursor: pointer; \nbackground-color: #EDEDED; \n} \n.popup .tag:first-child \n{ \nborder: none; \nborder-top-left-radius: 3px; \nborder-top-right-radius: 3px; \n} \n.popup .tag.tag-tagged \n{ \ncolor: #333; \nbackground-image: url( ","); \n} \n.popup .tag-label \n{ \nmargin-left: 30px; \nmax-width: 140px; \nfont-size: 12px; \nline-height: 16px; \nwhite-space: nowrap; \ntext-overflow: ellipsis; \noverflow: hidden; \n} \n.popup #no-tag \n{ \nbackground-image: none; \n} \n.popup #tag-new \n{ \nbackground-image: url( ","); \nbackground-size: 24px; \nbackground-position:1px center; \n} \n.popup #tag-new input \n{ \nbackground-color: transparent; \nheight: 16px; \ndisplay: none; \nwidth: 100%; \nborder: none; \noutline: none; \nfont-size: 12px; \n} \n.popup #tag-new.creating input \n{ \ndisplay: block; \n} \n.popup #tag-new.creating span \n{ \ndisplay: none; \n} \n#add-tag-popup-arrow \n{ \nbottom: 35px; \n} \n#evernote-popup-arrow \n{ \nbottom: 75px; \n} \n#evernote-popup .tag.tag-tagged \n{ \ncursor: auto; \npointer-events: none; \n} \n#evernote-popup .tag.tag-tagged:hover \n{ \nbackground-color: transparent; \n} \n#error \n{ \nheight: 100px; \nbackground-color: #EDEDED;; \ntext-shadow: #EDEDED; 0 1px 0; \ncolor: #7F7F7F; \nfont-size: 9px; \nline-height: 11px; \nmargin: 4px 0 0 0; \npadding: 4px; \nbox-sizing: content-box; \n} \n#error span \n{ \nfont-size: 11px; \n} \n} \n",
" \n<div id=\"mini-popup\"> \n"," <a href=\"http://feedly.com/#","\" onclick=\"trackAddFeed();return true;\" target=\"_blank\" title='Add \"","\" to feedly'> \n"," <div class=\"block block-green subscribed\" id=\"meta\" title=\"Add website to your feedly\"> \n"," <div class=\"block block-green\" id=\"meta\"> \n"," </div> \n</a> \n"," <div \nid=\"save\" \n",
" class=\"block saved\" \ntitle=\"Saved for later\" \n"," class=\"block\" \n"," title=\"Save page for later\" \nonclick=\"toggleSaveForLater(event)\" \n></div> \n<div class=\"block\" id=\"gmail\" onclick=\"askGmailPopup()\" title=\"Email page\"></div> \n<div class=\"block\" id=\"tweet\" onclick=\"askTweetPopup()\" title=\"Tweet page\"></div> \n<div class=\"block\" id=\"fb\" onclick=\"askFacebookPopup()\" title=\"Share page on Facebook\"></div> \n<div class=\"block\" id=\"evernote\" onclick=\"toggleEvernotePopup()\" title=\"Save page to Evernote\"></div> \n<div \nid=\"tags\" \n"," class=\"block tagged\" \n"," title=\"Tag page\" \nonclick=\"toggleAddTagPopup()\" \n></div> \n<div id=\"footer\" class=\"block\" title=\"Turn feedly mini off\" onclick=\"openPrefs()\"></div> \n</div> \n"," <div class=\"tag\" id=\"no-tag\"><div class=\"tag-label\">No tag</div></div> \n"," <ul> \n"," <li id=\"",
"\" class=\"tag tag-tagged\" onclick=\"toggleTag(event)\"> \n","\" class=\"tag\" onclick=\"toggleTag(event)\"> \n"," <div class=\"tag-label\">","</div> \n</li> \n"," </ul> \n<div class=\"tag\" id=\"tag-new\" onclick=\"showCreateTag()\"> \n<div class=\"tag-label\"> \n<span>New tag</span> \n<input type=\"text\" name=\"new-tag\" placeholder=\"New tag\" onkeypress=\"createTag(event)\"> \n</div> \n</div> \n"," <div class=\"tag\" id=\"no-tag\"><div class=\"tag-label\">No notebooks</div></div> \n","\" data-type=\"","\" class=\"tag\" onclick=\"clipToEvernote(event)\"> \n<div class=\"tag-label\">",
" </ul> \n"," \n<div id=\"error\"> \n<span>Ooops!</span><br> \nAn error occured. \n</div> \n"]
})();
// strings=42 characters=5611
