(function(){var e=YAHOO.util.Dom,i=YAHOO.util.Event;Alfresco.WikiList=function(j){this.name="Alfresco.WikiList";this.id=j;this.options={};Alfresco.util.YUILoaderHelper.require(["button","container","connection","editor","tabview"],this.onComponentsLoaded,this);return this};Alfresco.WikiList.prototype={_selectedTag:"",options:{siteId:"",pages:[],error:false,permissions:{}},setOptions:function g(j){this.options=YAHOO.lang.merge(this.options,j);this.$parser=new Alfresco.WikiParser();this.$parser.URL=Alfresco.constants.URL_PAGECONTEXT+"site/"+this.options.siteId+"/wiki-page?title=";return this},onComponentsLoaded:function b(){i.onContentReady(this.id,this.onReady,this,true)},onReady:function h(){if(this.options.error){YAHOO.Bubbling.fire("deactivateAllControls");return}this._initMouseOverListeners();var k=e.getElementsByClassName("pageCopy","div");var l;for(var j=0;j<k.length;j++){l=k[j];l.innerHTML=this.$parser.parse(l.innerHTML,this.options.pages)}e.getElementsByClassName("parseTime","span",this.id,function(){this.innerHTML=Alfresco.util.formatDate(Alfresco.util.fromISO8601(this.innerHTML),Alfresco.util.message("date-format.default"))});YAHOO.Bubbling.addDefaultAction("delete-link",function(o,m){var r=m[1].target;if(r){var s,q;for(var n=0,p=r.attributes.length;n<p;n++){q=r.attributes[n];if(q.nodeName.toLowerCase()==="title"){s=q.nodeValue;break}}if(s){YAHOO.Bubbling.fire("deletePage",{title:s})}}return true});YAHOO.Bubbling.addDefaultAction("wiki-tag-link",function(o,m){var p=m[1].target;if(p){var n=p.firstChild.nodeValue;YAHOO.Bubbling.fire("tagSelected",{tagname:n})}return true});YAHOO.Bubbling.on("tagSelected",this.onTagSelected,this);YAHOO.Bubbling.fire("userAccess",{userAccess:this.options.permissions});YAHOO.Bubbling.fire("filterChanged",{filterId:this.options.filterId,filterOwner:"Alfresco.WikiFilter",filterdata:""})},onTagSelected:function d(p,l){var o=l[1].tagname;if(o===Alfresco.util.message("label.all-tags","Alfresco.TagComponent")){var n=e.getElementsByClassName("wikiPageDeselect","div");for(var m=0;m<n.length;m++){e.removeClass(n[m],"wikiPageDeselect")}this._tagSelected=""}else{if(this._tagSelected!==o){var n=e.getElementsByClassName("wikipage","div");var q,m,k;for(m=0,k=n.length;m<k;m++){q=n[m];if(e.hasClass(q,"wikiPageDeselect")){e.removeClass(q,"wikiPageDeselect")}if(!e.hasClass(q,"wp-"+o)){e.addClass(n[m],"wikiPageDeselect")}}this._tagSelected=o}}},_initMouseOverListeners:function a(){var k=e.getElementsByClassName("wikipage","div");for(var j=0;j<k.length;j++){i.addListener(k[j],"mouseover",this.mouseOverHandler);i.addListener(k[j],"mouseout",this.mouseOutHandler)}},mouseOverHandler:function c(k){var j=k.currentTarget;e.addClass(j,"over")},mouseOutHandler:function f(k){var j=k.currentTarget;e.removeClass(j,"over")}}})();