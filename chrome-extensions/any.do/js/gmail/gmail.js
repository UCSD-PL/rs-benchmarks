(function(a){var V,H,I,z,W,J,X,Y,K,Z,$,aa,t,ba,ca,da,ea,L,fa;function ua(){var b=window.innerHeight,c=document.compatMode;if(c||!a.support.boxModel)b="CSS1Compat"==c?document.documentElement.clientHeight:document.body.clientHeight;return b}function va(b,c){var e=setInterval(function(){var d=ua(),m=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;a(b).each(function(){var b=a(this),f=b.offset().top,i=b.height(),h=b.data("inview")||!1;m>f+i||m+d<f?h&&b.data("inview",
!1):m<f+i&&!h&&(b.data("inview",!0),clearInterval(e),c())})},750)}function ga(b){a(V,f).html(b);a(H,f).css("visibility","visible");setTimeout(wa,5E3)}function wa(){a(H,f).css("visibility","hidden")}function p(){chrome.runtime.sendMessage({action:"track",track:arguments})}function ha(b){chrome.runtime.sendMessage({action:"trackPageview",track:b})}function xa(){var b=a,c='<div data-eid="'+n+'" class="'+I+' anydo-tour"><h2>'+d("gmail_tour_title")+"</h2>",e;e="<p>"+d("gmail_tour").replace(/\n{2,}/g,"</p><p>").replace(/\n/g,
"<br>")+"</p>";u=b(c+e+"<footer></footer></div>");u.insertAfter(o);b=ia()+2;u.css("left",b+"px").show();o.addClass("anydo-tour-on")}function M(b){if(3===b.nodeType)return b.textContent;if("BR"==b.nodeName)return"\n";var c=a.map(b.childNodes,M),b={block:"\n","inline-block":"\n","table-row":"\n","table-cell":"\t"}[getComputedStyle(b).display]||"";return c.join("")+b}function ya(b){return Date.parse(b.replace("at ",""))}function ja(){return Sha1.hash(""+a(J,f).attr("title")+">:<"+q().originalTitle)}
function za(){if(!N.test(location.hash)&&!a(z,f).length)console.log("no open messages in the current page");else{for(var b=a(X,f),c=q().originalTitle,e=a(Y).text(),b=b.map(function(b,d){var f=a(K,d),m=a(Z,d),i=a(J,d),k=a($,d),h=M(k[0]),g=a('img[src="images/cleardot.gif"]',k);if(0<g.length){var h=Sha1.hash(h),j=a('<div style="display:none">'+h+"</div>");g.after(j);k=M(k[0]);h=k.substr(0,k.search(h));j.remove()}m=m.map(function(b,c){var e=a(c);return{email:e.attr("email"),name:e.text()}});j=f.attr("email");
return j.toLowerCase()===e.toLowerCase()?null:{sender:{name:f.text(),email:j},recipients:m,date:ya(i.attr("title")),subject:c,body:h}}),d=ja(),m=JSON.parse(localStorage.getItem(d)||"{}"),i=[],j=0;j<b.length;j++)for(var g=a.task_extractor.extract_tasks(b[j]),h=0;h<g.length;h++)m.hasOwnProperty(g[h][0])?console.log(d+" already seen: "+g[h]):(i.push(g[h]),a.post("http://afternoon-earth-1266.herokuapp.com/raw_email_analytics",{suggestion:g[h][0],original:g[h][1],conversation:d}));i.conversation=d;return i}}
function Aa(b){var c=a(z,f).last(),e='<div class="gA gt ac5 anydo-anybar" data-eid="'+n+'"><div class="gB"><div class="iq"><table class="cf FVrZGe"><tbody>            <tr><td class="amq"><img src="'+v("images/anydo-profile.png")+'" class="ajn bofPge"></td>            <td class="amr"><strong>What\'s Next?</strong><input class="bar-input" type="text" value="<% text %>" data-placeholder="<% followup_example %>" placeholder="<% followup_followUpPlaceholder %>">            <div class="suggestion-controls">                <span class="suggestion-container">                <a href="#" class="suggestion-add suggestion-date-category category-today" data-category="TODAY">'+
d("x_date_today")+'</a>                    <div class="reminder-choices-popup">                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="09:00:00">'+d("x_9am")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="12:00:00">'+d("x_12pm")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="20:00:00">'+d("x_8pm")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder custom">'+
d("date_custom")+'</a>                    </div>                    <div class="reminder-choices-popup customReminderPicker">                    <iframe class="calendarFrame"></iframe>                    <a class="anydo-setCustomReminder suggestion-add" href="#">SET</a>                    </div>                </span>                <span class="suggestion-container">                <a href="#" class="suggestion-add suggestion-date-category" data-category="TOMORROW">'+d("x_date_tomorrow")+'</a>                    <div class="reminder-choices-popup">                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="09:00:00">'+
d("x_9am")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="12:00:00">'+d("x_12pm")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="20:00:00">'+d("x_8pm")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder custom">'+d("x_date_custom")+'</a>                    </div>                </span>                <span class="suggestion-container">                <a href="#" class="suggestion-add suggestion-date-category" data-category="UPCOMING">'+
d("x_later")+'</a>                    <div class="reminder-choices-popup">                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="7">'+d("x_date_1_week")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="14">'+d("x_date_2_weeks")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder" data-reminder="30">'+d("x_date_1_month")+'</a>                    <a href="#" class="suggestion-add suggestion-reminder custom">'+
d("x_date_custom")+"</a>                    </div>                </span>            </div>            </td></tr></tbody></table></div></div></div>",k=!1;if(!b||0==b.length)b=[""],k=!0;var m=0,j=ka(),g=q(),g=g.followUpName?d("x_followup_with",g.followUpName):d("x_followup_on",g.originalTitle),l=d("x_followup_placeholder",g);console.log(b);var h=a(e.replace("<% text %>",b[m][0]||"").replace("<% followup_example %>",g).replace("<% followup_followUpPlaceholder %>",l));c.before(h);a(".bar-input",h).css({"border-style":"solid",
"border-color":"#ABADB3","border-width":"1px"});va(c,function(){setTimeout(function(){k||a(".bar-input",h).animate({"background-color":"rgba(251, 255, 161, 1.0)"},300).animate({"background-color":"rgba(251, 255, 161, 0.0)"},300)},100)});O=a(".customReminderPicker .calendarFrame",f);O.attr("src",A+"#inAnybar=true");P&&xa();h.on("click",".suggestion-add",function(c){c.preventDefault();c=a(c.target);a(this).parents(".reminder-choices-popup").addClass("invisible");var e=h.find(".bar-input").val()||h.find(".bar-input").data("placeholder"),
d={title:e,linkUrl:j,conversation:b.conversation};console.log(b,d);var k="DATE_CATEGORY_TODAY";c.data("category")&&(k="DATE_CATEGORY_"+c.data("category"));c.hasClass("suggestion-reminder")&&(k=c.parents(".suggestion-container").children(".suggestion-date-category").data("category"),i=w[k](),c.data("reminder")&&la(c.data("reminder"),i),k=i,d.alert=r);if(c.hasClass("custom"))console.log(c,c.parent()),O.attr("src",A.replace(/(#.+)?$/,"#"+i+"&inAnybar=true")),a(".customReminderPicker",f).insertAfter(c.parent()).addClass("visible");
else{var g="";console.log("add task: "+e);if(m<b.length){var l=b[m][0];console.log("original suggestion: "+l);d.originalSuggestion=l;var l=ja(),n=JSON.parse(localStorage.getItem(l)||"{}");n[e]=!0;localStorage.setItem(l,JSON.stringify(n));m++;m<b.length&&(g=b[m][0])}h.find(".bar-input").val(g);p("Gmail","Actionbar Task Added");c.hasClass("anydo-setCustomReminder")&&(k=i,d.alert=r);console.log("adding task with details",d,k);ma({type:"gmailAddTask",data:d,dateCategory:k})}});var o=c.parent().children().first();
c.parent().on("click",function(){setTimeout(function(){var b=o.is(":visible");h.toggle(b)},300)})}function ma(b){chrome.runtime.sendMessage(b,function(b){console.log("got response",b);b.success?ga(d("task_added",['<a href="javascript:;" class="anydo-open-popup ad SL7K4c" data-eid="'+n+'" tabindex="0">Any.do</a>'])):"loggedOut"===b.errorReason&&ga(d("error_must_login_first"))})}function x(b,a){ma({type:"gmailAddTask",data:{title:b.inputTitle,linkUrl:b.url,alert:r},dateCategory:a})}function B(b){return"string"!==
typeof b?b:(""+b).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ka(){var b;if(N.test(location.href))b=location.href;else{b=location.href+"/";var c=null,e=a(W,f).first();e.length&&(c=e.extractId());b+=c}return b}function q(){var b={originalTitle:B(a(aa).text()),inputTitle:l?B(l.val()):null,fromName:a(t)?B(a(t).attr("name").split(" ")[0]):null,fromEmail:a(t)?B(a(t).attr("email")):null,url:ka()},c=a(K,f).map(function(b,c){return a(c).attr("name")}).filter(function(b,
c){return c!==a(ba,f).text()}),e=c.length;b.followUpName=e?c[e-1].split(" ")[0]:null;b.taskTitle=b.originalTitle+" (from "+b.fromName+")";return b}function C(b,a){a=a||new Date;a.setSeconds(0);a.setDate(a.getDate()+b);a.setMinutes(5*parseInt(a.getMinutes()/5));return+a+""}function ia(){var b=a.isWindow,c;a.isWindow=function(){return!0};c=o.position().left;a.isWindow=b;return c}function Q(){a(f).find(D+","+g+","+na).remove()}function R(){a(f).find(oa).remove()}function Ba(){var b=a(D,f),c=a(ca,f);
if(!b.length&&c.length){var b=c.find(da),c="<div data-eid='"+n+"' class='"+(ea+" anydo-button")+"' data-tooltip='"+d("add_this_thread")+"' style='padding-left: 16px; padding-right: 16px;'>                                <div aria-haspopup='true' style='-webkit-user-select: none; margin-bottom:0px;margin-top:-2px; outline: none;' role='button' class='J-J5-Ji W6eDmd L3 J-Zh-I J-J5-Ji Bq L3' tabindex='0'>                                     <img class='f tk3N6e-I-J3' src='"+v("icons/anydo-gmail-local.png")+
"' style='vertical-align: -5px; height: 18px; width: 18px; margin-right: 4px;'/> <span class='anydo-button-text'>"+d("remind_me")+"</span> <div class='G-asx T-I-J3 J-J5-Ji'>&nbsp;</div></div>                                </div>                           ",e="<div data-eid='"+n+"' class='"+(I+" anydo-menu")+"' style='display: none; position: absolute; min-width: 300px; -webkit-user-select: none; overflow: hidden;'>                    <div class='menuInnerContainer' style='position: relative; left: 0;'>                    <div class='SK AX' style='-webkit-user-select: none;'>                        <h2>"+
d("add_to_my_anydo")+"</h2>                         <span style='display: inline-block; margin-left: 12px; color: #8e8e8e; font-size: 14px; vertical-align: top; margin-top: 17px; margin-right: 6px; font-weight: bold;'>"+d("gmail_task_title_label")+"</span> <div class='J-M-JJ asg' style='border: none; display: inline-block; padding: 0; margin: 11px 0 17px; width: 80%; max-width: 240px;'>                             <input class='anydo-input-title' style='color: #000; font-style: italic; font-size: 14px; padding: 6px 7px; border: 1px solid #ddd; width: 92%;'>                         </div>                         <div class='J-Kh' style='-webkit-user-select: none; margin: -3px 4px 0; padding-top: 3px; border-top-color: #e1e1e1;'></div>                        <% items %>                    </div>                    <div class='reminderPanel' style='display: none;'><iframe class='calendarFrame'></iframe>                        <a class='anydo-back' href='#'>"+
d("back")+"</a>                        <a class='anydo-setReminder' href='#'>"+d("set")+"</a>                    </div>                    </div>                </div>";o=a(c);var k="";a.each(pa,function(b,a){k+="<div class='J-N anydo-item <% classNames %>' role='menuitem' data-id='<% id %>' style='-webkit-user-select: none; <% css %>'><% text %><span class='remind'><% reminderLinks %></span></div>".replace(/<% text %>/,a.text).replace(/<% id %>/,b).replace(/<% reminderLinks %>/,a.reminderLinks||
"").replace(/<% classNames %>/,a.classNames||"").replace(/<% css %>/,a.css||"")});e=e.replace(/<% items %>/,k);j=a(e);b.filter(":last").append(o.add(j));s=a(g+" .reminderPanel",f);E=a(g+" .menuInnerContainer",f);S=s.find(".calendarFrame");l=a(g+" .anydo-input-title",f);T=l.parent();S.attr("src",A);ha("/gmail-thread")}}function qa(){u&&(u.remove(),P=!1,o.removeClass("anydo-tour-on"))}function y(){j&&(o.removeClass(L),j.removeClass("open").hide(),j.css({width:F,height:G}),E.css("left",0),s.hide(),i=
null,r={type:"NONE"})}function la(b,a){if(-1<b.toString().indexOf(":"))i=new Date(+a),i.setHours.apply(i,b.split(":").map(parseFloat)),i=+i;else{var e=864E5*+b,a=new Date;a.setHours(9);a.setMinutes(0);a.setSeconds(0);i=+a+e}r={customTime:0,offset:0,type:"OFFSET"}}function ra(b){a(b).each(function(b,e){e=a(e);e.data("reminder").split(":")[0]<=(new Date).getHours()?e.addClass("pastTime"):e.removeClass("pastTime")})}var P=!1,v=chrome.extension.getURL,d=chrome.i18n.getMessage,U=chrome.runtime.connect({name:"gmail"}),
f=a(document),sa=a("body",f),o,j,F,G,s,E,u,i,r,l,T,S,A=v("calendar.html"),O,n=d("@@extension_id"),D=".anydo-button[data-eid="+n+"]",g=".anydo-menu[data-eid="+n+"]",na=".anydo-tour[data-eid="+n+"]",oa=".anydo-anybar[data-eid="+n+"]",N=/\/([0-9a-f]{16})$/,Ca=/m([0-9a-f]{16})$/,ta;a('<link rel="stylesheet">').attr("href",v("css/gmail.css?v=")+Math.random()).appendTo(sa);a('<link rel="stylesheet">').attr("href",v("css/pfdindisplaypro-inline.css")).appendTo(sa);chrome.runtime.sendMessage({type:"gmailInit"},
function(a){P=a.tour});ca="[gh=mtb]";aa=".hP:visible";t=".gD";ea="T-I J-J5-Ji ar7 nf T-I-ax7 L3";L="T-I-Kq";I="J-M jQjAxd";H=".b8.UC";V=".b8.UC .vh";da='[class="G-Ni J-J5-Ji"]';X=".h7:visible";K=".gD";Z=".g2";J=".g3";$=".ii.gt.adP.adO";z=".gA.gt";Y="[aria-owns=gbd4]";ba="#gbmpn";fa="#loading";W=".adP.adO";a.fn.extractId=function(){var b=null;a(this).attr("class").replace(/\s+/g," ").trim().split(" ").forEach(function(a){if(Ca.test(a))return b=a.slice(1),!1});return b};var w={TODAY:function(){return C(0)},
TOMORROW:function(){return C(1)},UPCOMING:function(){return C(2)},SOMEDAY:function(){return C(8)}},pa=[{text:d("date_today"),category:"DATE_CATEGORY_TODAY",reminderLinks:'<a href="#" data-reminder="09:00:00">'+d("9am")+'</a> <a href="#" data-reminder="12:00:00">'+d("12pm")+'</a> <a href="#" data-reminder="16:00:00">'+d("4pm")+'</a> <a href="#" data-reminder="20:00:00">'+d("8pm")+'</a> <a href="#" class="custom">'+d("date_custom")+"</a>",getDate:w.TODAY,action:function(){p("Gmail","Today");x(q(),"DATE_CATEGORY_TODAY")}},
{text:d("date_tomorrow"),category:"DATE_CATEGORY_TOMORROW",reminderLinks:'<a href="#" data-reminder="09:00:00">'+d("9am")+'</a> <a href="#" data-reminder="12:00:00">'+d("12pm")+'</a> <a href="#" data-reminder="16:00:00">'+d("4pm")+'</a> <a href="#" data-reminder="20:00:00">'+d("8pm")+'</a> <a href="#" class="custom">'+d("date_custom")+"</a>",getDate:w.TOMORROW,action:function(){p("Gmail","Tomorrow");x(q(),"DATE_CATEGORY_TOMORROW")}},{text:d("date_custom"),classNames:"anydo-custom",category:"DATE_CATEGORY_TODAY",
getDate:w.TODAY,action:function(){p("Gmail","Custom")}},{text:d("date_someday"),category:"DATE_CATEGORY_SOMEDAY",getDate:w.SOMEDAY,action:function(){p("Gmail","Someday");x(q(),"DATE_CATEGORY_SOMEDAY")}}];(function(){function b(){a(fa).is(":visible")||(N.test(location.hash)||a(z,f).length?U.postMessage({type:"isGmailActive"}):(Q(),R()))}var c=a(f);c.on("click",D+","+na,function(a){a.stopPropagation();qa();j.is(".open")?y():j&&(o.addClass(L),a=q(),l.val(a.taskTitle),a=ia(),j.addClass("open").css("left",
a+"px").show(),l[0].selectionStart=l[0].selectionEnd=0,ha("/gmail-menu"))});c.on("click",g+", .customReminderPicker",function(a){a.stopPropagation()});c.on("click",function(b){y();qa();0==a(b.target).parents(".suggestion-controls").length&&a(".customReminderPicker",f).removeClass("visible")});c.on("hover",D,function(){a(this).toggleClass("T-I-JW")});c.on("hover",g+" [role=menuitem]",function(){a(this).toggleClass("J-N-JT")});c.on("mouseenter",g+" [role=menuitem]",function(){0==a(this).data("id")&&
ra(a(this).find("[data-reminder]"))});c.on("mouseenter",".suggestion-date-category",function(){a(this).next(".reminder-choices-popup").removeClass("invisible");a(this).hasClass("category-today")&&ra(a(this).next().find("[data-reminder]"))});c.on("click",".anydo-open-popup[data-eid="+n+"]",function(){chrome.runtime.sendMessage({action:"popupWindow"})});c.on("click",g+" .anydo-item",function(b){b.preventDefault();var c=pa[a(this).data("id")],d=c.action;if(""==a.trim(l.val()))l.focus().parent().addClass("invalid");
else if(a(b.target).is("[data-reminder]"))b.stopPropagation(),d=a(b.target).attr("data-reminder"),la(d,c.getDate()),x(q(),i),p("Gmail",c.text,a(b.target).text()),c.keepMenuOpen||y();else if(a(b.target).hasClass("custom")&&p("Gmail",c.text,"Custom"),a(b.target).hasClass("anydo-custom")&&p("Gmail","Custom"),a(b.target).hasClass("anydo-custom")||a(b.target).hasClass("custom")){s.show();i=c.category;c=c.getDate();S.attr("src",A.replace(/(#.+)?$/,"#"+c));var c=s.width(),d=s.height(),f=-1*c;F=j.width();
G=j.height();j.css({width:F,height:G}).animate({width:c,height:d},100);E.css("left",0).animate({left:f},200);chrome.runtime.sendMessage({action:"trackPageview",track:"/calendarWindow"})}else c.keepMenuOpen||y(),"function"===typeof d&&d.apply(this,arguments)});c.on("keyup",g+" .anydo-input-title",function(){""==a.trim(l.val())?T.addClass("invalid"):T.removeClass("invalid")});chrome.runtime.onMessage.addListener(function(a){a&&"gmailCalendarPick"==a.type&&(r=a.alert,i=a.dateTime)});c.on("click",g+" .anydo-setReminder",
function(a){a.preventDefault();x(q(),i);y()});c.on("click",g+" .anydo-back",function(a){a.preventDefault();E.animate({left:0},200);j.animate({width:F,height:G},200)});U.onMessage.addListener(function(b){"isGmailActive"==b.type&&((b.gmail?Ba():(console.log("removing button"),Q()),b.gmailNext)?a(f).find(oa).length||(b=za()||[],Aa(b),0==b.length?console.log("no tasks detected!"):p("Gmail","Suggested",""+b.length)):(console.log("removing bar"),R()))});U.onDisconnect.addListener(function(){clearInterval(ta);
Q();R()});ta=setInterval(b,250);b()})()})(jQuery);