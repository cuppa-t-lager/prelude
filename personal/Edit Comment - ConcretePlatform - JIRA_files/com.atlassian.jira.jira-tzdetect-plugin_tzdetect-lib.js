/* module-key = 'com.atlassian.jira.jira-tzdetect-plugin:tzdetect-lib', location = 'banner/tzdetect-banner.js' */
(function(F){function D(G){return(+G||0)*60*1000}function B(G){return Math.floor((+G||0)/1000/60)}function C(G){return function H(I){if(I.which===1&&!I.shiftKey&&!I.ctrlKey&&!I.metaKey){G.apply(this,arguments)}}}var E=AJS.contextPath()+"/rest/tzdetect/1";var A={elemId:"timezone-diff-banner",$elem:null,$link:null,$dropdown:null,prefs:{},detected:{}};A.init=function(){A.$elem=F("#"+A.elemId);if(!A.$elem.length){A.detectTimezoneOffsets()}};if(!window.__tzTesting){F(A.init)}A.track=function(I,G){var H={name:"tzdetect.banner."+I};if(G){H.data=G}AJS.trigger("analyticsEvent",H)};A.profileLink=function(){return AJS.contextPath()+"/secure/ViewProfile.jspa"};A.redirect=function(G){window.location=G};A.create=function(){var H=A.profileLink();A.getPotentialZones();var I=AJS.format("Your computer\'\'s time zone does not appear to match your JIRA time zone preference of {0}. You can {1}update your JIRA preference{2} or {3}hide this message{4}.",A.prefs.tzname,'<a class="tz-yes" href="'+H+'#zone-set">',"</a>",'<a class="tz-no" href="'+H+'#zone-ignore">',"</a>");var G=A.$elem=AJS.$(JIRA.plugins.tzdetect.soy.banner({htmlContent:I}));G.find(".tz-no").click(C(function(J){J.preventDefault();A.ignoreCurrentOffsets()}));A.$link=G.find(".tz-yes");A.$link.click(C(function(J){J.preventDefault();A.getPotentialZones().then(A.handleZoneData)}));G.prependTo("#header");A.track("shown")};A.remove=function(){A.$elem.slideUp("fast",function(){A.$elem.remove();F(document).trigger("aui-message-close",[A.$elem[0]])})};A.handleZoneData=function(J){var H=A.filterZoneData(J.zones);var G=H.length;H.regions={};var I=J.regions.length,K;while(I--){K=J.regions[I];H.regions[K.key]=K.displayName}H.sort(function(N,M){var P=N.regionKey;var O=M.regionKey;if(P==O){return N.city<M.city?-1:1}return P<O?-1:1});A.track("clicked.update",{matchingZoneCount:G});if(!G){A.redirect(A.$link.attr("href"));return }if(G===1){A.setUserTimeZone(H[0].timeZoneId,"banner");return }if(!A.$dropdown){var L="timezone-selection-list";A.$link.addClass("aui-dropdown2-trigger").attr("aria-owns",L).attr("aria-haspopup","true");A.$dropdown=AJS.$(JIRA.plugins.tzdetect.soy.dropdown({id:L,sections:A.getListSections(H),baseHref:A.profileLink()})).css("z-index",150).on("click","a",C(function(O){var N=AJS.$(this);var P=N.attr("data-tzid");if(P){O.preventDefault();A.setUserTimeZone(P,"menu")}else{if(N.attr("data-tzother")){var M={offsets:[A.detected.janOffset,A.detected.julyOffset].join(",")};A.track("menu.other",M)}}})).appendTo("body")}A.$dropdown.trigger("aui-button-invoke")};A.filterZoneData=function(G){var H=["Antarctica","Etc"];return _.filter(G,function(I){return !_.contains(H,I.regionKey)})};A.getListSections=function(G){var M=[];var K,J,L;for(var H=0,I=G.length;H<I;H++){K=G[H].regionKey;if(K!==J){L={region:G.regions[K]||K,zones:[]};M.push(L);J=K}L.zones.push(G[H])}M.push({other:"Other\u2026"});return M};A.getTzOffset=function(I){var H=new Date().getFullYear();var G=new Date(H,I,1,12,0,0);return -G.getTimezoneOffset()};A.getPreferences=function(){var K="tzdetect.pref.";var J=["tzid","tzname","janOffset","julyOffset","nothanks"];var G={};var I=J.length;var H,L;while(I--){H=J[I];L=AJS.params[K+H];if(H.indexOf("Offset")>-1){L=B(L)}if(H==="nothanks"&&L!==undefined){L=L.split(",");if(L[0]){L[0]=B(L[0])}if(L[1]){L[1]=B(L[1])}}G[H]=L}return G};A.detectTimezoneOffsets=function(){A.prefs=A.getPreferences();if(!A.prefs.tzid){return }var G=A.detected.janOffset=A.getTzOffset(0);var I=A.detected.julyOffset=A.getTzOffset(6);var H=G!=A.prefs.janOffset||I!=A.prefs.julyOffset;var J=A.prefs.nothanks.length>1&&G==A.prefs.nothanks[0]&&I==A.prefs.nothanks[1];if(H&&!J){A.create()}};A.getPotentialZones=function(){var G=F.Deferred();if(A.zoneList){G.resolve(A.zoneList)}else{var H={janOffset:D(A.detected.janOffset),julyOffset:D(A.detected.julyOffset)};JIRA.SmartAjax.makeRequest({url:E+"/zones",type:"GET",data:H,contentType:"application/json",complete:function(K,I,J){if(I!="abort"&&J.successful){A.zoneList=J.data;G.resolve(A.zoneList)}else{G.reject(J)}}})}return G.promise()};A.setUserTimeZone=function(H,G){A.track("setzone",{zoneId:H,source:G});JIRA.SmartAjax.makeRequest({url:E+"/update",type:"POST",data:H,contentType:"application/json",complete:function(M,I,J){if(I!="abort"&&J.successful){A.remove();if(JIRA.Messages){var L=J.data;var K=AJS.format("Your default time zone has been set to {0}.",L.gmtOffset+" "+L.city);JIRA.Messages.showSuccessMsg(K,{closeable:true})}}}})};A.ignoreCurrentOffsets=function(){A.track("clicked.nothanks");var G=[D(A.detected.janOffset),D(A.detected.julyOffset)].join(",");JIRA.SmartAjax.makeRequest({url:E+"/nothanks",type:"POST",data:G,contentType:"application/json",complete:function(J,H,I){if(H!="abort"&&I.successful){A.remove()}}})};(JIRA.plugins||(JIRA.plugins={})).tzBanner=A})(AJS.$);
/* module-key = 'com.atlassian.jira.jira-tzdetect-plugin:tzdetect-lib', location = 'banner/tzdetect-banner.soy' */
// This file was automatically generated from tzdetect-banner.soy.
// Please don't edit this file by hand.

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.plugins == 'undefined') { JIRA.plugins = {}; }
if (typeof JIRA.plugins.tzdetect == 'undefined') { JIRA.plugins.tzdetect = {}; }
if (typeof JIRA.plugins.tzdetect.soy == 'undefined') { JIRA.plugins.tzdetect.soy = {}; }


JIRA.plugins.tzdetect.soy.banner = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message info" id="timezone-diff-banner"><p><span class="aui-icon icon-info"></span>', opt_data.htmlContent, '</p></div>');
  return opt_sb ? '' : output.toString();
};


JIRA.plugins.tzdetect.soy.dropdown = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-dropdown2 aui-style-default"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', '>');
  var sectionList15 = opt_data.sections;
  var sectionListLen15 = sectionList15.length;
  for (var sectionIndex15 = 0; sectionIndex15 < sectionListLen15; sectionIndex15++) {
    var sectionData15 = sectionList15[sectionIndex15];
    output.append('<div class="aui-dropdown2-section">');
    if (sectionData15.region) {
      output.append('<strong>', soy.$$escapeHtml(sectionData15.region), '</strong><ul class="aui-list-truncate">');
      var zoneList22 = sectionData15.zones;
      var zoneListLen22 = zoneList22.length;
      for (var zoneIndex22 = 0; zoneIndex22 < zoneListLen22; zoneIndex22++) {
        var zoneData22 = zoneList22[zoneIndex22];
        output.append('<li><a href="', soy.$$escapeHtml(opt_data.baseHref), '#zone-', soy.$$escapeHtml(zoneData22.timeZoneId), '" data-tzid="', soy.$$escapeHtml(zoneData22.timeZoneId), '">', soy.$$escapeHtml(zoneData22.gmtOffset), ' ', soy.$$escapeHtml(zoneData22.city), '</a></li>');
      }
      output.append('</ul>');
    } else if (sectionData15.other) {
      output.append('<ul class="aui-list-truncate"><li><a href="', soy.$$escapeHtml(opt_data.baseHref), '#zone-other" data-tzother="true">', soy.$$escapeHtml(sectionData15.other), '</a></li></ul>');
    }
    output.append('</div>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};

