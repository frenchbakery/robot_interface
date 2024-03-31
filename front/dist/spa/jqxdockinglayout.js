/*
jQWidgets v19.0.0 (2024-Feb)
Copyright (c) 2011-2024 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxDockingLayout","jqxLayout",{});a.extend(a.jqx._jqxDockingLayout.prototype,{defineInstance:function(){var b={events:["float","dock"]};if(this.base){this.base.dockingLayout=this}if(this===a.jqx._jqxDockingLayout.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){var b=this;if(!b.base.host.jqxWindow){throw new Error("jqxDockingLayout: Missing reference to jqxwindow.js.")}b._oldIE=a.jqx.browser.msie&&a.jqx.browser.version<9;b._addClasses();if(b.base._initiallyHidden!==true){b._createOverlay();b._createEdgeOverlays()}},loadLayout:function(e){if(e!==undefined&&a.isEmptyObject(e)===false){var f=this.base,g=f.element.id;var d=f._find(document.body,"."+g+"FloatGroup");for(var c=0;c<d.length;c++){var b=a(d[c]);b.off();b.jqxWindow("destroy")}f.loadLayout(e)}},destroy:function(){var e=this,f=e.base,g=f.element.id;var d=f._find(document.body,"."+g+"FloatGroup");for(var c=0;c<d.length;c++){var b=a(d[c]);b.off();b.jqxWindow("destroy")}e._removeHandlers();f.destroy()},addFloatGroup:function(c,k,d,j,h,e,g){var b=this.base,i={type:"floatGroup",width:c,height:k,position:d,items:[],programmaticallyAdded:true},f={type:j,title:h,content:e,initContent:g};i.items.push(f);b.layout.push(i);b.render()},_raiseEvent:function(f,c){if(c===undefined){c={owner:null}}var d=this.events[f];c.owner=this;var e=new a.Event(d);e.owner=this;e.args=c;if(e.preventDefault){e.preventDefault()}var b=this.base.host.trigger(e);return b},_addClasses:function(){var b=this.base;b.host.addClass(b.toThemeProperty("jqx-docking-layout"))},_removeHandlers:function(){var b=this,c=b.base,d=c.element.id;b.removeHandler(a(document),"mousemove.jqxDockingLayout"+d);b.removeHandler(c.host,"mouseleave.jqxDockingLayout"+d);if(c._touchDevice){b.removeHandler(a(document),"touchmove.jqxDockingLayout"+d);b.removeHandler(a(document),"touchend.jqxDockingLayout"+d)}},_removeByDragHandler:function(b,k,g,i,f){if(i===undefined){i=b.args.draggedIndex}if(f===undefined){f=true}var h=this,c=h.base,l=k.items,e=l[i],d=c._find(k.widget,".jqx-ribbon-content-section")[i],j=c._detachChildNodes(d);if(!g.hasClass("jqx-ribbon")){g=a(c._find(g,".jqx-ribbon")[0])}h.base._suppressResizeHandler=true;h._createFloatGroup(b,e.title,j,"documentGroup",k,e);h.base._closeDocumentPanel(i,l,k,g,f);h.base._suppressResizeHandler=false},_floatTabbedGroup:function(j,g,b){var h=this,c=h.base,m,e,k=[],d=a(c._find(g,".jqx-ribbon")[0]),o=c._find(d,".jqx-ribbon-content-section");for(var f=0;f<j.items.length;f++){var n=j.items[f],l=c._detachChildNodes(o[f]);if(n.selected){m=n.title;e=f}k.push(l)}h._createFloatGroup(b,m,k,"tabbedGroup",j,null,e);h.base._close(j);if(b){b.target.style.cursor=""}},_addTabbedGroupHandlers:function(h,f){var g=this,c=g.base,b=c.element.id,e=c._find(f,".jqx-layout-window-header")[0],i=false,d,k=c._touchDevice?["touchstart","touchend"]:["mousedown","mouseup"];function j(l){if(i===true&&c._clickedToResize!==true){g._floatTabbedGroup(h,f,l);i=false}}g.addHandler(e,k[0]+".jqxDockingLayout"+b,function(l){if(h.allowDrag!==false){i=true;l.target.style.cursor="move";if(c._touchDevice){var m=l.originalEvent.touches[0];d=document.elementFromPoint(m.pageX,m.pageY)}}});g.addHandler(e,k[1]+".jqxDockingLayout"+b,function(l){i=false;l.target.style.cursor=""});if(!c._touchDevice){g.addHandler(e,"mouseleave.jqxDockingLayout"+b,function(l){j({pageX:l.pageX,pageY:l.pageY,target:l.target})})}else{g.addHandler(a(document),"touchmove.jqxDockingLayout"+b,function(l){if(c._clickedToResize===true){l.preventDefault()}var m=l.originalEvent.touches[0];if(d!==document.elementFromPoint(m.pageX,m.pageY)){j({pageX:m.pageX,pageY:m.pageY,target:d})}})}},_floatAutoHideGroup:function(f,g,b,e){var d=this,c=d.base._detachChildNodes(b);d._createFloatGroup(e,g,c,"autoHideGroup",f,f);d.base._close(f)},_addAutoHideGroupHandlers:function(g,e,i,h){var f=this,c=f.base,b=c.element.id,j=false,d,l=c._touchDevice?["touchstart","touchend"]:["mousedown","mouseup"];function k(m){if(j===true){f._floatAutoHideGroup(g,i,h,m);j=false;m.target.style.cursor=""}}f.addHandler(e,l[0]+".jqxDockingLayout"+b,function(m){if(g.parent.allowDrag!==false){j=true;m.target.style.cursor="move";if(c._touchDevice){var n=m.originalEvent.touches[0];d=document.elementFromPoint(n.pageX,n.pageY)}}});f.addHandler(e,l[1]+".jqxDockingLayout"+b,function(m){j=false;m.target.style.cursor=""});if(!c._touchDevice){f.addHandler(e,"mouseleave.jqxDockingLayout"+b,function(m){k({pageX:m.pageX,pageY:m.pageY,target:m.target})})}else{f.addHandler(a(document),"touchmove.jqxDockingLayout"+b,function(m){if(c._clickedToResize===true){m.preventDefault()}var n=m.originalEvent.touches[0];if(d!==document.elementFromPoint(n.pageX,n.pageY)){k({pageX:n.pageX,pageY:n.pageY,target:d})}})}},_createFloatGroup:function(D,J,B,f,H,q,e){var m=this,g=m.base,p,o,w,v,F,b,d=document.createElement("div");d.className=g.toThemeProperty("jqx-docking-layout-group-floating")+" "+g.element.id+"FloatGroup";d.innerHTML="<div></div><div></div>";document.body.appendChild(d);d=a(d);if(f==="documentGroup"){if(D){p=D.args.x;o=D.args.y}w=H.widget.width();v=H.widget.height();F=B}else{if(f==="tabbedGroup"){if(D){p=D.pageX;o=D.pageY}w=H.widget.width();v=H.widget.height();F="";b=document.createElement("div");var I=document.createElement("div"),G=document.createElement("ul");G.className="jqx-layout-ribbon-header jqx-layout-ribbon-header-"+(m.rtl?"rtl":"ltr");for(var E=0;E<H.items.length;E++){var h=H.items[E],u=document.createElement("div");var s=document.createElement("li");s.innerHTML=h.title;G.appendChild(s);for(var z=0;z<B[E].length;z++){B[E][z].appendTo(u)}I.appendChild(u)}b.appendChild(G);b.appendChild(I);b=a(b);F=b}else{if(f==="autoHideGroup"){if(D){p=D.pageX;o=D.pageY}w=a(g._find(H.parent.widget,".jqx-ribbon-content")[0]).width();v=H.parent.widget.height();F=B}}}if(!p&&!o){var c=g.host.offset();p=(g.host.width()-w)/2+c.left+100;o=(g.host.height()-v)/2+c.top+10}d.on("moved close",function(j){m._hideOverlays();var i=d.current;if(j.type==="moved"){i.position.x=j.args.x;i.position.y=j.args.y;if(i._overlayGroup){m._updateOverlayGroup(i._overlayGroup)}m._clearTextSelection();m._windowCreate=false;m._hideOverlays()}else{g._raiseEvent("4",{element:d,floatGroup:d.current});if(i._overlayGroup){i._overlayGroup.removed=true;m._updateOverlayGroups()}i.removed=true;g._updateLayout(g.layout)}});d.on("resized",function(j){var i=d.current,k=a(this).offset();i.width=j.args.width;i.height=j.args.height;i.position.x=k.left;i.position.y=k.top;if(i._overlayGroup){m._updateOverlayGroup(i._overlayGroup)}});d.jqxWindow({theme:g.theme,title:J,content:F,width:w,maxWidth:null,height:v,maxHeight:null,position:{x:p-100,y:o-10},closeButtonAction:"close",rtl:g.rtl,initContent:function(){var k=this._header,i=g._touchDevice?"touchstart":"mousedown",j;if(f==="autoHideGroup"){j=H.parent}else{j=H}if(D){m._draggedWindow={fromGroup:j,fromPanel:q,title:J,element:d};k.trigger("mousedown",[p,o]);m._windowDragged=true;m._windowCreate=true;m._interval();if(g.resizable){g._overlay[0].style.display="block"}m._showEdgeOverlays()}k.on(i,function(){m._windowDragged=true;if(d.current._overlayGroup){d.current._overlayGroup.self=true}m._interval();if(g.resizable){g._overlay[0].style.display="block"}m._draggedWindow={fromGroup:j,fromPanel:q,title:J,element:d};m._showEdgeOverlays()});k.on("mouseup",function(){m._hideOverlays();m._windowCreate=false});if(f==="tabbedGroup"){b.jqxRibbon({theme:g.theme,width:"100%",height:"100%",position:"bottom",selectedIndex:e,selectionMode:"click",animationType:"none",rtl:g.rtl,reorder:true,_suppressReorder:false,_removeByDrag:true});b.on("select",function(l){if(!(l.owner.widgetName&&l.owner.widgetName!=="jqxRibbon")){var x=d.current.items[0].items[l.args.selectedIndex];d.jqxWindow("setTitle",x.title);x.selected=true}});b.on("unselect",function(l){if(!(l.owner.widgetName&&l.owner.widgetName!=="jqxRibbon")){d.current.items[0].items[l.args.unselectedIndex].selected=false}});b.on("reorder",function(l){g._swapPanelsInLayout(d.current.items[0].items,l.args.newIndex,l.args.oldIndex)});b.on("_removeByDrag",function(l){m._removeByDragHandler(l,d.current.items[0],b);if(d.current.items[0].items.length===1){b.jqxRibbon({_removeByDrag:false})}})}}});var n={type:"floatGroup",parent:{type:"host"},widget:d,position:{x:p-100,y:o-10},index:g.layout.length,width:w,height:v},t,r;d.current=n;if(q){n.items=[];g._copyItem(q,n.items);t=n.items;r=n}else{n.items=[{type:"tabbedGroup",items:[],parent:n,widget:b}];t=n.items[0].items;for(var C=0;C<H.items.length;C++){g._copyItem(H.items[C],t)}r=n.items[0]}for(var A=0;A<t.length;A++){t[A].parent=r}g.layout.push(n);m._raiseEvent("0",{item:n});m._trackFloatGroups()},_interval:function(){var c=this;if(c._oldIE===true){var b=c._overlayWidth,d=c._overlayHeight;c._oldIEInterval=setInterval(function(){c._checkPosition(b,d);if(c._windowCreate){c._draggedWindow.element.jqxWindow("move",c._x-50,c._y-10)}},1000)}},_createOverlay:function(){var d=this,e=d.base,i=e.element.id;d._overlay=document.createElement("div");d._overlay.className=e.toThemeProperty("jqx-docking-layout-overlay");d._overlay.innerHTML='<div class="jqx-docking-layout-overlay-section"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-top")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+e.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-top")+'"></div></div></div></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div></div><div class="jqx-docking-layout-overlay-section"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-left")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+e.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-left")+'"></div></div></div></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-center")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+e.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-inner-square-content jqx-docking-layout-overlay-highlight")+'"></div></div></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-right")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+e.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-right")+'"></div></div></div></div></div><div class="jqx-docking-layout-overlay-section"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-bottom")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+e.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+e.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-bottom")+'"></div></div></div></div><div class="'+e.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div></div>';d._overlay=a(d._overlay);var h=e._find(d._overlay,".jqx-docking-layout-overlay-square-center")[0];d._overlayCenter=a(h.firstChild);d._dropOverlay=document.createElement("div");d._dropOverlay.className=d.toThemeProperty("jqx-docking-layout-drop-overlay");d._dropOverlayHelper=a(d._dropOverlay);if(!e._ie7){e.element.appendChild(d._overlay[0]);e.element.appendChild(d._dropOverlay)}else{a("body").append(d._overlay,d._dropOverlay)}d._overlayWidth=d._overlay[0].offsetWidth;d._overlayHeight=d._overlay[0].offsetHeight;d._overlay[0].style.display="none";d._addOverlayHandlers();d._squares=[e._find(d._overlay,".jqx-docking-layout-overlay-square-top")[0],e._find(d._overlay,".jqx-docking-layout-overlay-square-left")[0],h,e._find(d._overlay,".jqx-docking-layout-overlay-square-right")[0],e._find(d._overlay,".jqx-docking-layout-overlay-square-bottom")[0]];d._sansCenter=[a(e._find(a(d._squares[0]),".jqx-docking-layout-overlay-inner-square")[0]),a(e._find(a(d._squares[1]),".jqx-docking-layout-overlay-inner-square")[0]),a(e._find(a(d._squares[3]),".jqx-docking-layout-overlay-inner-square")[0]),a(e._find(a(d._squares[4]),".jqx-docking-layout-overlay-inner-square")[0])];var c=false;function g(k,j,m,l){d._dropOverlay.style.display="block";d._dropOverlay.style.width=k+"px";d._dropOverlay.style.height=j+"px";a(d._dropOverlay).offset({left:m,top:l})}function f(l){l=d._closest(l,"jqx-docking-layout-overlay-square");c=l;if(a(e._find(l,".jqx-docking-layout-overlay-inner-square")[0]).hasClass("jqx-fill-state-disabled")){return}var m=d._dropToGroup.element.width(),k=d._dropToGroup.element.height(),j=d._dropToGroup.element.offset();if(l.hasClass("jqx-docking-layout-overlay-square-top")){g(m,k/2,j.left,j.top)}else{if(l.hasClass("jqx-docking-layout-overlay-square-left")){g(m/2,k,j.left,j.top)}else{if(l.hasClass("jqx-docking-layout-overlay-square-center")&&!d._overlayCenter.hasClass("jqx-docking-layout-square-disabled")){g(m,k,j.left,j.top)}else{if(l.hasClass("jqx-docking-layout-overlay-square-right")){g(m/2,k,j.left+m/2,j.top)}else{if(l.hasClass("jqx-docking-layout-overlay-square-bottom")){g(m,k/2,j.left,j.top+k/2)}else{if(e._touchDevice){d._dropOverlay.style.display="none";c=false}}}}}}}function b(t){var l=d._dropToGroup.settings;if(a(e._find(t,".jqx-docking-layout-overlay-inner-square")[0]).hasClass("jqx-fill-state-disabled")){d._hideOverlays();return}if(t.hasClass("jqx-docking-layout-overlay-square-top")){d._dropHandler(0,"vertical","height","top")}else{if(t.hasClass("jqx-docking-layout-overlay-square-left")){d._dropHandler(0,"horizontal","width","left")}else{if(t.hasClass("jqx-docking-layout-overlay-square-center")){var p=d._getDraggedWindowInformation(),s=p.title,q=p.content,k,r;if(l.type==="documentGroup"){k=l.widget;r="documentPanel"}else{if(l.type==="tabbedGroup"){if(l.parent.type==="floatGroup"){k=l.widget}else{k=a(e._find(l.widget,".jqx-ribbon")[0])}r="layoutPanel"}}if(l.type==="layoutGroup"){d._dropToEmptyLayoutGroup(p)}else{for(var n=0;n<s.length;n++){k.jqxRibbon({_suppressReorder:true});k.jqxRibbon("addAt",e._find(k,".jqx-ribbon-content-section").length,{title:s[n],content:q[n]},true);var m=l.items.length,o={type:r,title:s[n],parent:l,index:m,detachedContent:p.content[n],docked:true};l.items.push(o);e._addRightClickHandler(a(e._find(k,".jqx-ribbon-item")[m]),{current:o});k.jqxRibbon({_suppressReorder:false})}}if(l.parent.type==="floatGroup"){l.widget.jqxRibbon({_removeByDrag:true})}d._clearTextSelection();d._raiseEvent("1",{position:"center",item:l})}else{if(t.hasClass("jqx-docking-layout-overlay-square-right")){d._dropHandler(1,"horizontal","width","right")}else{if(t.hasClass("jqx-docking-layout-overlay-square-bottom")){d._dropHandler(1,"vertical","height","bottom")}}}}}d._removeFloatGroupObject(d._draggedWindow.element.current);d._draggedWindow.element.remove();d._hideOverlays()}if(!e._touchDevice){a.each(d._squares,function(){d.addHandler(this,"mouseenter.jqxDockingLayout"+i,function(){f(a(this))});d.addHandler(this,"mouseleave.jqxDockingLayout"+i,function(){d._dropOverlay.style.display="none"});d.addHandler(this,"mouseup.jqxDockingLayout"+i,function(){b(a(this))})})}else{d.addHandler(a(document),"touchmove.jqxDockingLayout"+i,function(j){if(d._windowDragged){j.preventDefault();var k=j.originalEvent.touches[0],l=a(document.elementFromPoint(k.pageX,k.pageY));f(l)}});d.addHandler(a(document),"touchend.jqxDockingLayout"+i,function(){if(c!==false){b(c);c=false}})}},_addOverlayHandlers:function(){var c=this,b=c._overlayWidth,d=c._overlayHeight;if(!c.base._touchDevice){c.addHandler(a(document),"mousemove.jqxDockingLayout"+c.base.element.id,function(e){c._x=e.pageX;c._y=e.pageY;if(c._windowDragged&&!c._oldIE){c._checkPosition(b,d);if(c._windowCreate){c._draggedWindow.element.jqxWindow("move",e.pageX-50,e.pageY-10)}}})}else{c.addHandler(a(document),"touchmove.jqxDockingLayout"+c.base.element.id,function(f){var e=f.originalEvent.touches[0];c._x=e.pageX;c._y=e.pageY;if(c._windowDragged&&!c._oldIE){c._checkPosition(b,d);if(c._windowCreate){c._draggedWindow.element.jqxWindow("move",e.pageX-50,e.pageY-10)}}})}},_checkPosition:function(k,p){var h=this,c=h.base,n=h._x,m=h._y;for(var g=0;g<c._overlayGroups.length;g++){var q=c._overlayGroups[g];if(!q.self){var b=q.width,o=q.height,f=q.offset,d=f.left,l=f.top;if(n>=d&&n<=d+b&&m>=l&&m<=l+o){if(((q.settings.type==="documentGroup"&&h._draggedWindow.fromGroup.type==="documentGroup")||(q.settings.type==="tabbedGroup"&&(h._draggedWindow.fromGroup.type==="tabbedGroup"||h._draggedWindow.fromGroup.type==="autoHideGroup"))||(q.settings.type==="layoutGroup"))&&q.settings.allowDrop!==false){h._overlayCenter.removeClass(c.toThemeProperty("jqx-fill-state-disabled"))}else{h._overlayCenter.addClass(c.toThemeProperty("jqx-fill-state-disabled"));if(q.settings.parent.type==="floatGroup"){return}}for(var e=0;e<h._sansCenter.length;e++){if(q.settings.parent.type==="floatGroup"){h._sansCenter[e].addClass(c.toThemeProperty("jqx-fill-state-disabled"))}else{h._sansCenter[e].removeClass(c.toThemeProperty("jqx-fill-state-disabled"))}}h._overlay[0].style.display="block";h._overlay.offset({left:parseInt(d+b/2-k/2,10),top:parseInt(l+o/2-p/2,10)});h._dropToGroup=q;return}}}h._overlay[0].style.display="none"},_dropHandler:function(r,x,z,D){var f=this,d=f.base,h=f._dropToGroup.settings,c=h.parent,n=f._getDraggedWindowInformation(),E=n.title,t=n.content,q=n.groupType,C=n.itemType,m=[],b,y;if(c.orientation===x){b=h.index+r;y={type:q,parent:c};y[z]=f._draggedWindow.element[z]();for(var v=0;v<E.length;v++){m.push({type:C,title:E[v],parent:y,prevent:true,selected:f._getFloatGroupItemSelection(v),detachedContent:t[v],docked:true})}y.items=m;f._setOptimalDimension(z,y,h);c.items.splice(b,0,y)}else{var A,e;if(z==="width"){A="height";e="minHeight"}else{A="width";e="minWidth"}var g={type:"layoutGroup",orientation:x,parent:h.parent,index:h.index};g[A]=h[A];if(h[e]){g[e]=h[e]}h.parent.items.splice(h.index,1);h.parent.items.splice(h.index,0,g);h.parent=g;y={type:q,parent:g};for(var u=0;u<E.length;u++){m.push({type:C,title:E[u],parent:y,prevent:true,selected:f._getFloatGroupItemSelection(u),detachedContent:t[u],docked:true})}y.items=m;delete h[A];h[z]="50%";y[z]="50%";g.items=[h];g.items.splice(0+r,0,y)}d.render();var o=d._find(y.widget,".jqx-ribbon-content-section");for(var s=0;s<o.length;s++){var B=a(o[s]),w=t[s];for(var p=0;p<w.length;p++){t[s][p].appendTo(B)}}f._clearTextSelection();d._raiseEvent("1",{item:h});f._raiseEvent("1",{position:D,item:y})},_setOptimalDimension:function(d,b,c){var f=this,k=d==="width"?"minWidth":"minHeight",h=c[k]||f.base["minGroup"+d.charAt(0).toUpperCase()+d.slice(1)],e=c.parent.widget[d](),g;g=parseFloat(c[d])-h/e*100;var j=b[d]/e*100;if(g<j){b[d]=parseFloat(c[d])/2+"%";b[k]=parseInt(parseFloat(b[d])/100*e,10);c[d]=parseFloat(c[d])-parseFloat(b[d])+"%";var i=parseInt(parseFloat(c[d])/100*e,10);if(i<h){c[k]=i}}else{b[d]=j+"%";c[d]=parseFloat(c[d])-j+"%"}},_dropToEmptyLayoutGroup:function(f){var g=this,e=g._dropToGroup.settings,m=f.groupType,l={type:m,items:[],parent:e},h=f.content;if(e.orientation==="horizontal"){l.width="100%"}else{if(e.orientation==="vertical"){l.height="100%"}}for(var d=0;d<f.title.length;d++){var o={type:f.itemType,title:f.title[d],parent:l,prevent:true,selected:g._getFloatGroupItemSelection(d),detachedContent:h[d],docked:true};l.items.push(o)}e.items.push(l);g.base.render();var n=g.base._find(l.widget,".jqx-ribbon-content-section");for(var c=0;c<n.length;c++){for(var b=0;b<h[c].length;b++){h[c][b].appendTo(n[c])}}},_getFloatGroupItemSelection:function(b){var d=this,c;if(d._draggedWindow.fromPanel){c=true}else{c=d._draggedWindow.element.current.items[0].items[b].selected}return c},_createEdgeOverlays:function(){function b(e){var i,g=e==="left"||e==="right"?"horizontal":"vertical",f='<div class="'+d.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-mini-window-edge-"+g)+'"><div class="'+d.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header jqx-docking-layout-overlay-inner-square-header-"+g)+'"></div><div class="'+d.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-inner-square-content jqx-docking-layout-overlay-inner-square-content-"+g)+'"></div></div>',j='<div class="'+d.toThemeProperty("jqx-docking-layout-overlay-square-edge-arrow-container jqx-docking-layout-overlay-square-edge-arrow-container-"+g)+'"><div class="'+d.toThemeProperty("jqx-fill-state-pressed jqx-docking-layout-overlay-square-edge-arrow jqx-docking-layout-overlay-square-edge-arrow-"+e)+'"></div></div>',h;if(e==="left"||e==="top"){h=f+j}else{h=j+f}i=document.createElement("div");i.className=d.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-edge");i.innerHTML='<div class="'+d.toThemeProperty("jqx-docking-layout-overlay-inner-square-edge")+'">'+h+"</div>";if(!d._ie7){d.element.appendChild(i)}else{document.body.appendChild(i)}c._edgeOverlays.push(i);return a(i)}var c=this,d=c.base;c._edgeOverlays=[];c._leftOverlay=b("left");c._rightOverlay=b("right");c._topOverlay=b("top");c._bottomOverlay=b("bottom");c._addEdgeOverlaysHandlers()},_addEdgeOverlaysHandlers:function(){function g(k,j,m,l){d._dropOverlay.style.display="block";d._dropOverlay.style.width=k;d._dropOverlay.style.height=j;a(d._dropOverlay).offset({left:m,top:l})}var d=this,e=d.base,i=e.element.id,c,f=false;function h(j){c=e.host.offset();j=d._closest(a(j),"jqx-docking-layout-overlay-square-edge")[0];f=j;switch(j){case d._leftOverlay[0]:g("100px",e.host.height()+"px",c.left,c.top);break;case d._rightOverlay[0]:g("100px",e.host.height()+"px",c.left+e.host.width()-100,c.top);break;case d._topOverlay[0]:g(e.host.width()+"px","100px",c.left,c.top);break;case d._bottomOverlay[0]:g(e.host.width()+"px","100px",c.left,c.top+e.host.height()-100);break;default:if(e._touchDevice){f=false}}}function b(j){switch(j){case d._leftOverlay[0]:d._dropToEdge("left",0,"horizontal","width");break;case d._rightOverlay[0]:d._dropToEdge("right",e.layout[0].items.length-1,"horizontal","width");break;case d._topOverlay[0]:d._dropToEdge("top",0,"vertical","height");break;case d._bottomOverlay[0]:d._dropToEdge("bottom",e.layout[0].items.length-1,"vertical","height");break}}if(!e._touchDevice){a.each(d._edgeOverlays,function(){d.addHandler(this,"mouseenter.jqxDockingLayout"+i,function(){h(this)});d.addHandler(this,"mouseleave.jqxDockingLayout"+i,function(){d._dropOverlay.style.display="none"});d.addHandler(this,"mouseup.jqxDockingLayout"+i,function(){b(this)})})}else{d.addHandler(a(document),"touchmove.jqxDockingLayout"+i,function(k){if(d._windowDragged){k.preventDefault();var l=k.originalEvent.touches[0],j=a(document.elementFromPoint(l.pageX,l.pageY));h(j)}});d.addHandler(a(document),"touchend.jqxDockingLayout"+i,function(){if(f!==false){b(f);f=false}})}},_dropToEdge:function(c,d,w,y){var f=this,b=f.base,h=b.layout[0],n=f._getDraggedWindowInformation(),B=n.title,t=n.content,q=n.groupType,A=n.itemType,m=[],x,s;f._removeFloatGroupObject(f._draggedWindow.element.current);if(h.orientation===w){x={type:q,parent:h};x[y]=f._draggedWindow.element[y]();for(var v=0;v<B.length;v++){m.push({type:A,title:B[v],parent:x,prevent:true,selected:f._getFloatGroupItemSelection(v),detachedContent:t[v],docked:true})}x.items=m;s=h.items[d];f._setOptimalDimension(y,x,s);if(c==="left"||c==="top"){h.items.splice(d,0,x)}else{h.items.push(x)}}else{var z,e;if(y==="width"){z="height";e="minHeight"}else{z="width";e="minWidth"}var g={type:"layoutGroup",orientation:w,parent:h.parent,index:h.index};x={type:q,parent:g};for(var u=0;u<B.length;u++){m.push({type:A,title:B[u],parent:x,prevent:true,selected:f._getFloatGroupItemSelection(u),detachedContent:t[u],docked:true})}x.items=m;delete h[z];delete x[z];x[y]="50%";h[y]="50%";h.parent=g;if(c==="left"||c==="top"){g.items=[x,h]}else{g.items=[h,x]}b.layout[0]=g;s=h}b.render();var o=b._find(x.widget,".jqx-ribbon-content-section");for(var r=0;r<o.length;r++){for(var p=0;p<t[r].length;p++){t[r][p].appendTo(o[r])}}f._clearTextSelection();b._raiseEvent("1",{item:s});f._raiseEvent("1",{position:c+"-edge",item:x});f._draggedWindow.element.remove();f._hideOverlays()},_showEdgeOverlays:function(){var g=this,b=g.base,k=b.host.width(),c=b.host.height(),j=b.host.offset(),h=true,i=true,d=true,f=true;function e(n){if(!n.items||n.items.length===0){return}var l=n.orientation,o=n.items[0],m=n.items[n.items.length-1];if(l==="horizontal"){if(o.type==="autoHideGroup"){h=h&&false}else{if(o.type==="layoutGroup"){e(o)}}if(m.type==="autoHideGroup"){i=i&&false}else{if(m.type==="layoutGroup"){e(m)}}}else{if(l==="vertical"){if(o.type==="autoHideGroup"){d=d&&false}else{if(o.type==="layoutGroup"){e(o)}}if(m.type==="autoHideGroup"){f=f&&false}else{if(m.type==="layoutGroup"){e(m)}}}}}e(b.layout[0]);if(h){g._leftOverlay[0].style.display="block"}if(i){g._rightOverlay[0].style.display="block"}if(d){g._topOverlay[0].style.display="block"}if(f){g._bottomOverlay[0].style.display="block"}g._leftOverlay.offset({left:j.left+5,top:j.top+c/2-20});g._rightOverlay.offset({left:j.left+k-40,top:j.top+c/2-20});g._topOverlay.offset({left:j.left+k/2-20,top:j.top+5});g._bottomOverlay.offset({left:j.left+k/2-20,top:j.top+c-40})},_hideOverlays:function(){var c=this,d=c.base;c._windowDragged=false;if(c._oldIE===true){clearInterval(c._oldIEInterval)}if(d.resizable){setTimeout(function(){c.base._overlay[0].style.display="none"},0)}c._overlay[0].style.display="none";for(var b=0;b<c._edgeOverlays.length;b++){c._edgeOverlays[b].style.display="none"}c._dropOverlay.style.display="none"},_getDraggedWindowInformation:function(){var d=this,b=d.base,h=[],g=[],e,f;if(d._draggedWindow.fromPanel){h.push(d._draggedWindow.title);g.push(b._detachChildNodes(b._find(d._draggedWindow.element,".jqx-window-content")[0]))}else{var k=b._find(d._draggedWindow.element,".jqx-ribbon-content-section");for(var c=0;c<d._draggedWindow.element.current.items[0].items.length;c++){var j=d._draggedWindow.element.current.items[0].items[c];h.push(j.title);g.push(b._detachChildNodes(k[c]))}}if(d._draggedWindow.fromGroup.type==="documentGroup"){e="documentGroup";f="documentPanel"}else{e="tabbedGroup";f="layoutPanel"}return{title:h,content:g,groupType:e,itemType:f}},_removeFloatGroupObject:function(c){var b=this.base;c.removed=true;b._updateLayout(b.layout)},_trackFloatGroups:function(){var f=this,g=f.base;for(var d=1;d<g.layout.length;d++){var b=g.layout[d];if(b.items[0].type==="tabbedGroup"){var c=b.items[0].widget,e={element:c,width:c.width(),height:c.height(),offset:c.offset(),settings:b.items[0]};b._overlayGroup=e;g._overlayGroups.push(e)}}},_updateOverlayGroup:function(c){if(c){var b=c.element;c.width=b.width();c.height=b.height();c.offset=b.offset();c.self=false}},_updateOverlayGroups:function(){var d=this.base._overlayGroups;for(var b=d.length-1;b>=0;b--){var c=d[b];if(c.removed===true){d.splice(b,1)}}},_clearTextSelection:function(){try{if(document.selection){document.selection.empty()}else{if(window.getSelection){if(window.getSelection().empty){window.getSelection().empty()}else{if(window.getSelection().removeAllRanges){window.getSelection().removeAllRanges()}}}}}catch(b){}},_closest:function(d,c){if(d.hasClass(c)){return d}var b=a(d[0].parentNode);while(b[0]!==null&&b[0].nodeName!=="#document"){if(b.hasClass(c)){return b}b=a(b[0].parentNode)}}})})(jqxBaseFramework);

