/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

(function(){
	
	/**
	 * Browser Moniter
	 * 
	 * bind browser hashchange event, bind <a> a tag onclick event 、AT-thru attribute and provide web add hashchange event
	 *
	 */	
	ATModel.BrowserMoniter = function() {
		
		// private variables -------------------------------------------------------------------
		
		var events = {};
		
		
		// public variables --------------------------------------------------------------------
		
		this.enableEvent = true;
		
		// public methods ----------------------------------------------------------------------
		
		
		/**
		 * Add browser hashchange event
		 * @param  [string, function]
		 */
		this.addEvent = function(name, fn, scope) {
			events[name] = ( scope )? this.Fn.setScope(fn, scope) : fn;
		}
		
		
		/**
		 * Return tue if event is set
		 * @param  [string]
		 * @return [boolean]
		 */
		this.isSetEvent = function(name) {
			return name in events;
		}
		
		/**
		 * Start to monitor web browser
		 *
		 */
		this.start = function() {
			var This = this;
			
			// default event
			this.addEvent('Ajax-Through', function() {
				//ViewMask.clear();
				AT.Url.href( window.location.href );
			});
			
			// bind browser hashchange event
			$(window).hashchange(function(){
				
				if( This.enableEvent ) {
					for(var e in events) {
						events[e]();	
					}
				}
				
			});
			
			// bind <a> a tag onclick or AT-thru attribute event
			$('a,*[AT-thru]').live('click', function(e) {
				e.preventDefault();
				var href = $(this).attr('AT-thru') || $(this).attr('href');
				
				// exec url
				AT.Url.href(href, null, {
					setUrl: ( window.location.href != href )			
				});
			});
			
			delete this.start;
		}
		
	}
	
})();