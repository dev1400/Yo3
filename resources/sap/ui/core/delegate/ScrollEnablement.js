/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object'],function(q,B){"use strict";var $=q;var S=B.extend("sap.ui.core.delegate.ScrollEnablement",{constructor:function(c,s,C){B.apply(this);this._oControl=c;this._oControl.addDelegate(this);this._sContentId=s;this._bHorizontal=!!C.horizontal;this._bVertical=!!C.vertical;this._scrollX=0;this._scrollY=0;this._scroller=null;this._scrollbarClass=C.scrollbarClass||false;this._bounce=C.bounce;a(this,C);if(this._init){this._init.apply(this,arguments)}},setHorizontal:function(h){this._bHorizontal=!!h;if(this._scroller){if(this._zynga){this._scroller.options.scrollingX=this._bHorizontal}else{this._scroller.hScroll=this._scroller.hScrollbar=this._bHorizontal;this._scroller._scrollbar('h')}}else if(this._setOverflow){this._setOverflow()}},setVertical:function(v){this._bVertical=!!v;if(this._scroller){if(this._zynga){this._scroller.options.scrollingY=this._bVertical}else{this._scroller.vScroll=this._scroller.vScrollbar=this._bVertical;this._scroller._scrollbar('v')}}else if(this._setOverflow){this._setOverflow()}},getHorizontal:function(){return this._bHorizontal},getVertical:function(){return this._bVertical},setBounce:function(b){this._bounce=!!b},setPullDown:function(c){this._oPullDown=c;return this},setGrowingList:function(g,s){this._oGrowingList=g;this._fnScrollLoadCallback=q.proxy(s,g);return this},setIconTabBar:function(I,s,f){this._oIconTabBar=I;this._fnScrollEndCallback=q.proxy(s,I);this._fnScrollStartCallback=q.proxy(f,I);return this},scrollTo:function(x,y,t){this._scrollX=x;this._scrollY=y;this._scrollTo(x,y,t);return this},destroy:function(){if(this._exit){this._exit()}if(this._oControl){this._oControl.removeDelegate(this);this._oControl=undefined}},refresh:function(){if(this._refresh){this._refresh()}}});var i={getScrollTop:function(){return this._scrollY},getScrollLeft:function(){return this._scrollX},getMaxScrollTop:function(){return this._scroller?-this._scroller.maxScrollY:0},_scrollTo:function(x,y,t){this._scroller&&this._scroller.scrollTo(-x,-y,t,false)},_refresh:function(){if(this._scroller&&this._sScrollerId){var s=$.sap.domById(this._sScrollerId);if(s&&(s.offsetHeight>0)){this._bIgnoreScrollEnd=true;this._scroller.refresh();this._bIgnoreScrollEnd=false;if(-this._scrollX!=this._scroller.x||-this._scrollY!=this._scroller.y){this._scroller.scrollTo(-this._scrollX,-this._scrollY,0)}if(this._scroller.wrapper&&this._scroller.wrapper.scrollTop){this._scroller.wrapper.scrollTop=0}}}},_cleanup:function(){this._toggleResizeListeners(false);if(this._scroller){this._scroller.stop();this._scrollX=-this._scroller.x;var s=$.sap.domById(this._sScrollerId);if(s&&(s.offsetHeight>0)){this._scrollY=-this._scroller.y}this._scroller.destroy();this._scroller=null}},_toggleResizeListeners:function(t){if(this._sScrollerResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sScrollerResizeListenerId);this._sScrollerResizeListenerId=null}if(this._sContentResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null}if(t&&this._sContentId&&$.sap.domById(this._sContentId)){var b=$.proxy(this._refresh,this);this._sScrollerResizeListenerId=sap.ui.core.ResizeHandler.register($.sap.domById(this._sScrollerId),b);this._sContentResizeListenerId=sap.ui.core.ResizeHandler.register($.sap.domById(this._sContentId),b)}},onBeforeRendering:function(){this._cleanup()},onfocusin:function(e){if(S._bScrollToInput&&sap.ui.Device.os.android){var b=e.srcElement;this._sTimerId&&q.sap.clearDelayedCall(this._sTimerId);if(b&&b.nodeName&&(b.nodeName.toUpperCase()==="INPUT"||b.nodeName.toUpperCase()==="TEXTAREA")){this._sTimerId=q.sap.delayedCall(400,this,function(){var o=this._scroller._offset(b);o.top+=48;this._scroller.scrollTo(o.left,o.top)})}}},onAfterRendering:function(){var t=this,b=(this._bounce!==undefined)?this._bounce:sap.ui.Device.os.ios;var c=$.sap.byId(this._sContentId);this._sScrollerId=c.parent().attr("id");var d=(!!sap.ui.Device.os.android&&!sap.ui.Device.browser.chrome&&(sap.ui.Device.os.version==4||!sap.ui.Device.os.versionStr.indexOf("2.3.4"))&&c.find("input,textarea").length);this._iTopOffset=this._oPullDown&&this._oPullDown.getDomRef&&this._oPullDown.getDomRef().offsetHeight||0;var x=this._scrollX||0,y=this._scrollY||0;if(sap.ui.getCore().getConfiguration().getRTL()){c.attr("dir","rtl");var p=c.parent();p.attr("dir","ltr");if(!this._bScrollPosInitialized){x=this._scrollX=c.width()-p.width();this._bScrollPosInitialized=true}}this._scroller=new window.iScroll(this._sScrollerId,{useTransition:true,useTransform:!d,hideScrollbar:true,fadeScrollbar:true,bounce:!!b,momentum:true,handleClick:false,hScroll:this._bHorizontal,vScroll:this._bVertical,x:-x,y:-y,topOffset:this._iTopOffset,scrollbarClass:this._scrollbarClass,onBeforeScrollStart:function(e){if(t._isScrolling){e.stopPropagation();e.preventDefault()}},onScrollEnd:function(){if(!t._bIgnoreScrollEnd&&t._scroller){t._scrollX=-t._scroller.x;t._scrollY=-t._scroller.y}if(t._oPullDown){t._oPullDown.doScrollEnd()}if(t._oGrowingList&&t._fnScrollLoadCallback){var e=Math.floor(this.wrapperH/4);var I=-this.maxScrollY+this.y<e;if(this.dirY>0&&I){t._fnScrollLoadCallback()}}if(t._oIconTabBar&&t._fnScrollEndCallback){t._fnScrollEndCallback()}t._isScrolling=false},onRefresh:function(){if(t._oPullDown){t._oPullDown.doRefresh()}t._toggleResizeListeners(true)},onScrollMove:function(e){if(!t._isScrolling){var r=/(INPUT|TEXTAREA)/i,A=document.activeElement;if(r.test(A.tagName)&&e.target!==A){A.blur()}}t._isScrolling=true;if(t._oPullDown){t._oPullDown.doScrollMove()}if(t._oIconTabBar&&t._fnScrollStartCallback){t._fnScrollStartCallback()}}});for(var P=this._oControl;P=P.oParent;){var s=P.getScrollDelegate?P.getScrollDelegate():null;if(s&&(s.getVertical()&&this.getVertical()||s.getHorizontal()&&this.getHorizontal())){this._scroller._sapui_isNested=true;break}}this._scroller._move=function(e){if(e._sapui_handledByControl&&!e._sapui_scroll){return}if(this._sapui_isNested){e._sapui_handledByControl=!(this.dirY<0&&this.y>=0)&&!(this.dirY>0&&this.y<=this.maxScrollY)&&!(this.dirX<0&&this.x>=0)&&!(this.dirX>0&&this.x<=this.maxScrollX)}window.iScroll.prototype._move.call(this,e)};var o=c.parent()[0];if(o&&(o.offsetHeight>0)){if(this._scrollX!=-this._scroller.x||this._scrollY!=-this._scroller.y){this._scroller.scrollTo(-this._scrollX,-this._scrollY,0)}}this._toggleResizeListeners(true)},ontouchmove:function(e){if(this._preventTouchMoveDefault){e.preventDefault()}}};var z={_refresh:function(){if(this._scroller&&this._sContentId&&$.sap.domById(this._sContentId)){var c=$.sap.byId(this._sContentId);var C=c.parent();this._scroller.setDimensions(C.width(),C.height(),c.width(),c.height())}},_cleanup:function(){if(this._sScrollerResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sScrollerResizeListenerId);this._sScrollerResizeListenerId=null}if(this._sContentResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null}if(this._scroller){var v=this._scroller.getValues();this._scrollX=v.left;this._scrollY=v.top}},_scrollTo:function(x,y,t){if(this._scroller){if(!isNaN(t)){this._scroller.options.animationDuration=t}this._scroller.scrollTo(x,y,!!t)}},onBeforeRendering:function(){this._cleanup()},onAfterRendering:function(){this._refresh();this._scroller.scrollTo(this._scrollX,this._scrollY,false);this._sContentResizeListenerId=sap.ui.core.ResizeHandler.register($.sap.domById(this._sContentId),$.proxy(function(){if((!this._sContentId||!$.sap.domById(this._sContentId))&&this._sContentResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null}else{this._refresh()}},this))},ontouchstart:function(e){if(e.target.tagName.match(/input|textarea|select/i)){return}this._scroller.doTouchStart(e.touches,e.timeStamp)},ontouchend:function(e){this._scroller.doTouchEnd(e.timeStamp)},ontouchmove:function(e){this._scroller.doTouchMove(e.touches,e.timeStamp);if(this._preventTouchMoveDefault){e.preventDefault()}else{e.stopPropagation()}}};var n={getScrollTop:function(){return this._scrollY||0},getScrollLeft:function(){return this._scrollX||0},getMaxScrollTop:function(){return(this._$Container&&this._$Container.length)?this._$Container[0].scrollHeight-this._$Container.height():-1},_setOverflow:function(){var c=this._$Container;if(!c||!c[0])return;c.css("z-index","0");if(sap.ui.Device.os.ios){c.css("overflow-x",this._bHorizontal?"scroll":"hidden").css("overflow-y",this._bVertical?"scroll":"hidden").css("-webkit-overflow-scrolling","touch")}else{c.css("overflow-x",this._bHorizontal&&!this._bDragScroll?"auto":"hidden").css("overflow-y",this._bVertical&&!this._bDragScroll?"auto":"hidden")}},_refresh:function(){var c=this._$Container;if(!c||!c.height())return;var C=$.sap.byId(this._sContentId);if(this._oPullDown&&this._oPullDown._bTouchMode){var d=this._oPullDown.getDomRef();if(d){d.style.marginTop=this._oPullDown._iState==2?"":"-"+d.offsetHeight+"px"}}if(c.scrollTop()!=this._scrollY){c.scrollTop(this._scrollY)}if(!(this._oPullDown&&this._oPullDown._bTouchMode)&&!this._fnScrollLoadCallback&&!!!sap.ui.Device.browser.internet_explorer){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}},_onScroll:function(e){var c=this._$Container;if(this._oIOSScroll&&this._oIOSScroll.bMomentum){var y=Math.abs(this._scrollY-c.scrollTop());if(y>0&&y<10||e.timeStamp-this._oIOSScroll.iTimeStamp>120){q.sap.log.debug("IOS Momentum Scrolling is OFF");this._oIOSScroll.bMomentum=false}}this._scrollX=c.scrollLeft();this._scrollY=c.scrollTop();if(this._fnScrollLoadCallback&&c[0].scrollHeight-c.scrollTop()-c.height()<100){this._fnScrollLoadCallback()}if(this._oIconTabBar&&this._fnScrollEndCallback){this._fnScrollEndCallback()}},_onStart:function(e){var c=this._$Container[0];if(!c)return;this._bAllowScroll=!sap.ui.Device.os.ios||this._bVertical&&(c.scrollHeight>c.clientHeight+1);if(this._bAllowScroll&&sap.ui.Device.os.ios){if(c.scrollTop==0){c.scrollTop=1}var d=c.scrollHeight-c.clientHeight;if(c.scrollTop===d){c.scrollTop=d-1}}if(this._oIOSScroll&&this._oIOSScroll.bMomentum){q.sap.log.debug("IOS Momentum Scrolling: prevent tap event");e.stopPropagation();this._oIOSScroll.bMomentum=false}var p=e.touches?e.touches[0]:e;this._iX=p.pageX;this._iY=p.pageY;this._bPullDown=false;this._iDirection=""},_onTouchMove:function(e){var c=this._$Container[0];var p=e.touches[0];if(this._iDirection==""){var d=p.pageX-this._iX;var b=p.pageY-this._iY;if(d!=0||b!=0){this._iDirection=Math.abs(b)>Math.abs(d)?"v":"h"}if(this._oPullDown&&this._oPullDown._bTouchMode&&this._iDirection=="v"&&c.scrollTop<=1){if(b>Math.abs(d)){this._bPullDown=true}}}if(this._bPullDown===true){var f=this._oPullDown.getDomRef();var t=e.touches[0].pageY-this._iY-f.offsetHeight;if(t>20)t=20;f.style.marginTop=t+"px";this._oPullDown.doPull(t);e.preventDefault()}if(this._bDragScroll){if(this._iDirection=="v"&&this._bVertical||this._iDirection=="h"&&this._bHorizontal){c.scrollLeft=c.scrollLeft+this._iX-p.pageX;c.scrollTop=c.scrollTop+this._iY-p.pageY;this._iX=p.pageX;this._iY=p.pageY;e.stopPropagation();e.preventDefault()}return}if(this._oIOSScroll&&this._bAllowScroll&&this._iDirection=="v"&&Math.abs(e.touches[0].pageY-this._iY)>=10){this._oIOSScroll.bMomentum=true;this._oIOSScroll.iTimeStamp=e.timeStamp}if(this._bAllowScroll||this._bHorizontal&&this._iDirection=="h"){e.setMarked();if(window.iScroll){e.setMarked("scroll")}}},_onEnd:function(e){if(this._oIOSScroll&&this._oIOSScroll.bMomentum){this._oIOSScroll.iTimeStamp=e.timeStamp}if(this._oPullDown&&this._oPullDown._bTouchMode){this._oPullDown.doScrollEnd();this._refresh()}if(this._bDragScroll&&this._iDirection){e.setMarked()}},_onMouseDown:function(e){if(e.button==0){this._bScrolling=true;this._onStart(e)}},_onMouseMove:function(E){if(this._bScrolling){var e=E.originalEvent;var b=e.buttons||e.which;if(b==1){var c=this._$Container[0];c.scrollLeft=c.scrollLeft+this._iX-E.pageX;c.scrollTop=c.scrollTop+this._iY-E.pageY;this._iX=E.pageX;this._iY=E.pageY}}},_onMouseUp:function(e){this._bScrolling=false;this._onEnd()},onBeforeRendering:function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}var c=this._$Container;if(c){if(c.height()>0){this._scrollX=c.scrollLeft();this._scrollY=c.scrollTop()}c.off()}},onAfterRendering:function(){var c=this._$Container=$.sap.byId(this._sContentId).parent();var _=q.proxy(this._refresh,this);this._setOverflow();this._scrollTo(this._scrollX,this._scrollY);this._refresh();if(!c.is(":visible")||!!sap.ui.Device.browser.internet_explorer||this._oPullDown||this._fnScrollLoadCallback){this._sResizeListenerId=sap.ui.core.ResizeHandler.register(c[0],_)}c.scroll(q.proxy(this._onScroll,this));if(sap.ui.Device.support.touch){c.on("touchcancel touchend",q.proxy(this._onEnd,this)).on("touchstart",q.proxy(this._onStart,this)).on("touchmove",q.proxy(this._onTouchMove,this))}else if(this._bDragScroll){c.on("mouseup mouseleave",q.proxy(this._onMouseUp,this)).mousedown(q.proxy(this._onMouseDown,this)).mousemove(q.proxy(this._onMouseMove,this))}},_readActualScrollPosition:function(){if(this._$Container.width()>0){this._scrollX=this._$Container.scrollLeft()}if(this._$Container.height()>0){this._scrollY=this._$Container.scrollTop()}},_scrollTo:function(x,y,t){if(this._$Container.length>0){if(t>0){this._$Container.animate({scrollTop:y,scrollLeft:x},t,q.proxy(this._readActualScrollPosition,this))}else{this._$Container.scrollTop(y);this._$Container.scrollLeft(x);this._readActualScrollPosition()}}}};function a(s,c){var d;if(!sap.ui.Device.support.touch&&!$.sap.simulateMobileOnDesktop&&!c.nonTouchScrolling){return}if(sap.ui.Device.support.touch||$.sap.simulateMobileOnDesktop){$.sap.require("jquery.sap.mobile")}d={_init:function(C,b,c){function e(f,h,v){var o=new window.Scroller(function(j,t,k){var m=$.sap.byId(f).parent();m.scrollLeft(j);m.scrollTop(t)},{scrollingX:h,scrollingY:v,bouncing:false});return o}function g(){if(c.zynga){return"z"}if(sap.ui.Device.os.android&&sap.ui.Device.os.version<4.1||sap.ui.Device.os.blackberry||sap.ui.Device.os.ios&&sap.ui.Device.os.version<6){return"i"}if(!sap.ui.Device.support.touch&&$.sap.simulateMobileOnDesktop){return"i"}if(c.iscroll=="force"||(sap.ui.Device.support.touch&&(c.iscroll||sap.ui.getCore().getConfiguration().getNoNativeScroll()))){return"i"}return"n"}var l=g();this._preventTouchMoveDefault=!!c.preventDefault;this._scroller=null;switch(l){case"z":$.sap.require("sap.ui.thirdparty.zyngascroll");$.extend(this,z);this._zynga=true;this._scroller=e(this._sContentId,this._bHorizontal,this._bVertical);break;case"i":$.sap.require("sap.ui.thirdparty.iscroll");$.extend(this,i);this._bIScroll=true;break;default:if($.mobile&&$.event.special.swipe&&$.event.special.swipe.scrollSupressionThreshold<120){$.event.special.swipe.scrollSupressionThreshold=120}$.extend(this,n);if(c.nonTouchScrolling===true){this._bDragScroll=true}if(sap.ui.getCore().getConfiguration().getRTL()){this._scrollX=9999}if(sap.ui.Device.os.ios){this._oIOSScroll={iTimeStamp:0,bMomentum:false}}break}},_exit:function(){if(this._cleanup){this._cleanup()}this._scroller=null}};$.extend(s,d)}return S},true);
