// © Copyright 2023 - Seaside by Designesia 

jQuery(document).ready(function () {
    'use strict';				// use strict mode

    var de_header_style = 1; // 1 - solid, 2 - transparent
    var de_header_layout = 1; // 1 - default, 2 - extended
    var de_header_color = 1; // 1 - default, 2 - light style
    var de_header_sticky = 1; // 1 - sticky, 2 - scroll
    var de_header_mobile_sticky = 2; // 1 - sticky, 2 - scroll
    var de_menu_separator = 0; // 1 - dotted, 2 - border, 3 - circle, 4 - square, 5 - plus, 6 - strip, 0 - none
    var de_color_style = 1; // 1 - default, 2 - light style
    var de_font_style = 1; // 1 - default, 2 - alternate font style
    var de_force_mobile_menu = 0; // 1 - yes, 0 - no
    var show_preloader = 1; // 1 - show, 0 - hide

    var mobile_menu_show = 0;
    var grid_size = 10;
    var col = 4;
    var tmp_col = col;
    var sr = 466 / 700;
	var $container = jQuery('#gallery');
	var v_count = '0';

    if (de_color_style == 2) { $('body').addClass('de_light'); }
    if (de_font_style == 2) { $('head').append('<link rel="stylesheet" href="css/font-style-2.css" type="text/css" />'); }
    if (de_header_style == 2) { $('header').addClass('transparent'); }
    if (de_menu_separator == 1) {
		$('#mainmenu').addClass('dotted-separator');
	} else if (de_menu_separator == 2) {
        $('#mainmenu').addClass('line-separator');
    } else if (de_menu_separator == 3) {
        $('#mainmenu').addClass('circle-separator');
    } else if (de_menu_separator == 4) {
        $('#mainmenu').addClass('square-separator');
    } else if (de_menu_separator == 5) {
        $('#mainmenu').addClass('plus-separator');
    } else if (de_menu_separator == 6) {
        $('#mainmenu').addClass('strip-separator');
    } else if (de_menu_separator == 0) { 
		$('#mainmenu').addClass('no-separator'); 
	}
    if (de_header_layout == 2) { $('header').addClass('de_header_2'); $('header .info').show(); }
    if (de_header_color == 2) { $('header').addClass('header-light'); }
    if (de_header_sticky == 2) { $('header').addClass('header-scroll'); }
    if (de_header_mobile_sticky == 1) { $('header').addClass('header-mobile-sticky'); }
    if (de_force_mobile_menu == 1) { $('header').addClass('force-header-mobile'); }

    // --------------------------------------------------
    // magnificPopup
    // --------------------------------------------------

    var startWindowScroll = 0;
	  jQuery('.simple-ajax-popup-align-top').magnificPopup({
		 type: 'ajax',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		callbacks: {
		  beforeOpen: function() {
			startWindowScroll = $(window).scrollTop();
		  },
		  open: function(){
			if ( $('.mfp-content').height() < $(window).height() ){
			  $('body').on('touchmove', function (e) {
				  e.preventDefault();
			  });
			}
		  },
		  close: function() {
			$(window).scrollTop(startWindowScroll);
			$('body').off('touchmove');
		  }
		}
	  });

    jQuery('.simple-ajax-popup').magnificPopup({
        type: 'ajax'
    });

    // zoom gallery
    jQuery('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title');
                //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }

    });

    // popup youtube, video, gmaps

    jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    // image popup

    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });

    $('.image-popup-fit-width').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        image: {
            verticalFit: false
        }
    });

    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    $('.image-popup-gallery').magnificPopup({
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title');
                //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        }

    });

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title');
            }
        }
    });

    /* SmoothScroll */
    !function(){var s,i,c,a,o={frameRate:150,animationTime:600,stepSize:100,pulseAlgorithm:!0,pulseScale:4,pulseNormalize:1,accelerationDelta:50,accelerationMax:3,keyboardSupport:!0,arrowScroll:50,fixedBackground:!0,excluded:""},p=o,u=!1,d=!1,n={x:0,y:0},f=!1,m=document.documentElement,l=[],h=/^Mac/.test(navigator.platform),w={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},v={37:1,38:1,39:1,40:1};function y(){if(!f&&document.body){f=!0;var e=document.body,t=document.documentElement,o=window.innerHeight,n=e.scrollHeight;if(m=0<=document.compatMode.indexOf("CSS")?t:e,s=e,p.keyboardSupport&&Y("keydown",x),top!=self)d=!0;else if(Q&&o<n&&(e.offsetHeight<=o||t.offsetHeight<=o)){var r,a=document.createElement("div");a.style.cssText="position:absolute; z-index:-10000; top:0; left:0; right:0; height:"+m.scrollHeight+"px",document.body.appendChild(a),c=function(){r=r||setTimeout(function(){u||(a.style.height="0",a.style.height=m.scrollHeight+"px",r=null)},500)},setTimeout(c,10),Y("resize",c);if((i=new R(c)).observe(e,{attributes:!0,childList:!0,characterData:!1}),m.offsetHeight<=o){var l=document.createElement("div");l.style.clear="both",e.appendChild(l)}}p.fixedBackground||u||(e.style.backgroundAttachment="scroll",t.style.backgroundAttachment="scroll")}}var b=[],g=!1,r=Date.now();function S(d,f,m){if(function(e,t){e=0<e?1:-1,t=0<t?1:-1,n.x===e&&n.y===t||(n.x=e,n.y=t,b=[],r=0)}(f,m),1!=p.accelerationMax){var e=Date.now()-r;if(e<p.accelerationDelta){var t=(1+50/e)/2;1<t&&(t=Math.min(t,p.accelerationMax),f*=t,m*=t)}r=Date.now()}if(b.push({x:f,y:m,lastX:f<0?.99:-.99,lastY:m<0?.99:-.99,start:Date.now()}),!g){var o=q(),h=d===o||d===document.body;null==d.$scrollBehavior&&function(e){var t=M(e);if(null==B[t]){var o=getComputedStyle(e,"")["scroll-behavior"];B[t]="smooth"==o}return B[t]}(d)&&(d.$scrollBehavior=d.style.scrollBehavior,d.style.scrollBehavior="auto");var w=function(e){for(var t=Date.now(),o=0,n=0,r=0;r<b.length;r++){var a=b[r],l=t-a.start,i=l>=p.animationTime,c=i?1:l/p.animationTime;p.pulseAlgorithm&&(c=F(c));var s=a.x*c-a.lastX>>0,u=a.y*c-a.lastY>>0;o+=s,n+=u,a.lastX+=s,a.lastY+=u,i&&(b.splice(r,1),r--)}h?window.scrollBy(o,n):(o&&(d.scrollLeft+=o),n&&(d.scrollTop+=n)),f||m||(b=[]),b.length?j(w,d,1e3/p.frameRate+1):(g=!1,null!=d.$scrollBehavior&&(d.style.scrollBehavior=d.$scrollBehavior,d.$scrollBehavior=null))};j(w,d,0),g=!0}}function e(e){f||y();var t=e.target;if(e.defaultPrevented||e.ctrlKey)return!0;if(N(s,"embed")||N(t,"embed")&&/\.pdf/i.test(t.src)||N(s,"object")||t.shadowRoot)return!0;var o=-e.wheelDeltaX||e.deltaX||0,n=-e.wheelDeltaY||e.deltaY||0;h&&(e.wheelDeltaX&&K(e.wheelDeltaX,120)&&(o=e.wheelDeltaX/Math.abs(e.wheelDeltaX)*-120),e.wheelDeltaY&&K(e.wheelDeltaY,120)&&(n=e.wheelDeltaY/Math.abs(e.wheelDeltaY)*-120)),o||n||(n=-e.wheelDelta||0),1===e.deltaMode&&(o*=40,n*=40);var r=z(t);return r?!!function(e){if(!e)return;l.length||(l=[e,e,e]);e=Math.abs(e),l.push(e),l.shift(),clearTimeout(a),a=setTimeout(function(){try{localStorage.SS_deltaBuffer=l.join(",")}catch(e){}},1e3);var t=120<e&&P(e),o=!P(120)&&!P(100)&&!t;return e<50||o}(n)||(1.2<Math.abs(o)&&(o*=p.stepSize/120),1.2<Math.abs(n)&&(n*=p.stepSize/120),S(r,o,n),e.preventDefault(),void C()):!d||!W||(Object.defineProperty(e,"target",{value:window.frameElement}),parent.wheel(e))}function x(e){var t=e.target,o=e.ctrlKey||e.altKey||e.metaKey||e.shiftKey&&e.keyCode!==w.spacebar;document.body.contains(s)||(s=document.activeElement);var n=/^(button|submit|radio|checkbox|file|color|image)$/i;if(e.defaultPrevented||/^(textarea|select|embed|object)$/i.test(t.nodeName)||N(t,"input")&&!n.test(t.type)||N(s,"video")||function(e){var t=e.target,o=!1;if(-1!=document.URL.indexOf("www.youtube.com/watch"))do{if(o=t.classList&&t.classList.contains("html5-video-controls"))break}while(t=t.parentNode);return o}(e)||t.isContentEditable||o)return!0;if((N(t,"button")||N(t,"input")&&n.test(t.type))&&e.keyCode===w.spacebar)return!0;if(N(t,"input")&&"radio"==t.type&&v[e.keyCode])return!0;var r=0,a=0,l=z(s);if(!l)return!d||!W||parent.keydown(e);var i=l.clientHeight;switch(l==document.body&&(i=window.innerHeight),e.keyCode){case w.up:a=-p.arrowScroll;break;case w.down:a=p.arrowScroll;break;case w.spacebar:a=-(e.shiftKey?1:-1)*i*.9;break;case w.pageup:a=.9*-i;break;case w.pagedown:a=.9*i;break;case w.home:l==document.body&&document.scrollingElement&&(l=document.scrollingElement),a=-l.scrollTop;break;case w.end:var c=l.scrollHeight-l.scrollTop-i;a=0<c?10+c:0;break;case w.left:r=-p.arrowScroll;break;case w.right:r=p.arrowScroll;break;default:return!0}S(l,r,a),e.preventDefault(),C()}function t(e){s=e.target}var k,D,M=(k=0,function(e){return e.uniqueID||(e.uniqueID=k++)}),E={},T={},B={};function C(){clearTimeout(D),D=setInterval(function(){E=T=B={}},1e3)}function H(e,t,o){for(var n=o?E:T,r=e.length;r--;)n[M(e[r])]=t;return t}function z(e){var t=[],o=document.body,n=m.scrollHeight;do{var r=(!1?E:T)[M(e)];if(r)return H(t,r);if(t.push(e),n===e.scrollHeight){var a=O(m)&&O(o)||X(m);if(d&&L(m)||!d&&a)return H(t,q())}else if(L(e)&&X(e))return H(t,e)}while(e=e.parentElement)}function L(e){return e.clientHeight+10<e.scrollHeight}function O(e){return"hidden"!==getComputedStyle(e,"").getPropertyValue("overflow-y")}function X(e){var t=getComputedStyle(e,"").getPropertyValue("overflow-y");return"scroll"===t||"auto"===t}function Y(e,t,o){window.addEventListener(e,t,o||!1)}function A(e,t,o){window.removeEventListener(e,t,o||!1)}function N(e,t){return e&&(e.nodeName||"").toLowerCase()===t.toLowerCase()}if(window.localStorage&&localStorage.SS_deltaBuffer)try{l=localStorage.SS_deltaBuffer.split(",")}catch(e){}function K(e,t){return Math.floor(e/t)==e/t}function P(e){return K(l[0],e)&&K(l[1],e)&&K(l[2],e)}var $,j=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e,t,o){window.setTimeout(e,o||1e3/60)},R=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,q=($=document.scrollingElement,function(){if(!$){var e=document.createElement("div");e.style.cssText="height:10000px;width:1px;",document.body.appendChild(e);var t=document.body.scrollTop;document.documentElement.scrollTop,window.scrollBy(0,3),$=document.body.scrollTop!=t?document.body:document.documentElement,window.scrollBy(0,-3),document.body.removeChild(e)}return $});function V(e){var t;return((e*=p.pulseScale)<1?e-(1-Math.exp(-e)):(e-=1,(t=Math.exp(-1))+(1-Math.exp(-e))*(1-t)))*p.pulseNormalize}function F(e){return 1<=e?1:e<=0?0:(1==p.pulseNormalize&&(p.pulseNormalize/=V(1)),V(e))}var I=window.navigator.userAgent,_=/Edge/.test(I),W=/chrome/i.test(I)&&!_,U=/safari/i.test(I)&&!_,G=/mobile/i.test(I),J=/Windows NT 6.1/i.test(I)&&/rv:11/i.test(I),Q=U&&(/Version\/8/i.test(I)||/Version\/9/i.test(I)),Z=(W||U||J)&&!G,ee=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){ee=!0}}))}catch(e){}var te=!!ee&&{passive:!1},oe="onwheel"in document.createElement("div")?"wheel":"mousewheel";function ne(e){for(var t in e)o.hasOwnProperty(t)&&(p[t]=e[t])}oe&&Z&&(Y(oe,e,te),Y("mousedown",t),Y("load",y)),ne.destroy=function(){i&&i.disconnect(),A(oe,e),A("mousedown",t),A("keydown",x),A("resize",c),A("load",y)},window.SmoothScrollOptions&&ne(window.SmoothScrollOptions),"function"==typeof define&&define.amd?define(function(){return ne}):"object"==typeof exports?module.exports=ne:window.SmoothScroll=ne}();

    /* jarallax */
    $(".jarallax").jarallax();
	
	/* --------------------------------------------------
	* custom background
	* --------------------------------------------------*/
	function custom_bg() {
		$("*").css('background-color', function() {
			return jQuery(this).data('bgcolor');
		});
		$("body,div,section").css('background', function() {
			return jQuery(this).data('bgimage');
		});
		$("div,section").css('background-size', function() {
			return 'cover';
		});
	}
	
	// progress bar //
			function de_progress() {
			 jQuery('.de-progress').each(function() {
				 var pos_y = jQuery(this).offset().top;
				 var value = jQuery(this).find(".progress-bar").attr('data-value');
				 var topOfWindow = jQuery(window).scrollTop();
				 if (pos_y < topOfWindow + 550) {
					 jQuery(this).find(".progress-bar").animate({
						 'width': value
					 }, "slow");
				 }

				 jQuery(this).find('.value').text(jQuery(this).find('.progress-bar').attr('data-value'));
			 });
			}

    // wow jquery

    new WOW().init();

    // --------------------------------------------------
    // init
    // --------------------------------------------------
    function init_de() {

        enquire.register("screen and (max-width: 993px)", {
            match: function () {
                $('header').addClass("header-mobile");
            },
            unmatch: function () {
                $('header').removeClass("header-mobile");
            }
        });

        var $window = jQuery(window);
        jQuery('section[data-type="background"]').each(function () {
            var $bgobj = jQuery(this); // assigning the object

            jQuery(window).scroll(function () {

                enquire.register("screen and (min-width: 993px)", {
                    match: function () {
                        var yPos = -($window.scrollTop() / $bgobj.data('speed'));
                        var coords = '50% ' + yPos + 'px';
                        $bgobj.css({ backgroundPosition: coords });
                    }
                });
            });
            document.createElement("article");
            document.createElement("section");
        });        

        jQuery('.grid.border').css('padding-top', grid_size);
        jQuery('.grid.border').css('padding-left', grid_size);
    }
	
	function grid_gallery() {
            jQuery('.grid-item').each(function () {
                var this_col = Number(jQuery(this).parent().attr('data-col'));
                var this_gridspace = Number(jQuery(this).parent().attr('data-gridspace'));
                var this_ratio = eval($(this).parent().attr('data-ratio'));
                jQuery(this).parent().css('padding-left', this_gridspace);
                var w = (($(document).width() - (this_gridspace * this_col + 1)) / this_col) - (this_gridspace / this_col);
                var gi = $(this);
                var h = w * this_ratio;
                gi.css('width', w);
                gi.css('height', h);
                gi.find(".pf_title").css('margin-top', (h / 2) - 10);
                gi.css('margin-right', this_gridspace);
                gi.css('margin-bottom', this_gridspace);
                if (gi.hasClass('large')) {
                    $(this).css('width', (w * 2) + this_gridspace);
                    $(this).css('height', (h * 2) + this_gridspace);
                }
                if (gi.hasClass('large-width')) {
                    $(this).css('width', (w * 2) + this_gridspace);
                    $(this).css('height', h);
                }
                if (gi.hasClass('large-height')) {
                    $(this).css('height', (h * 2) + this_gridspace);
                    gi.find(".pf_title").css('margin-top', (h) - 20);
                }
            });
        }


        $('#mo-menu li:has(ul)').addClass('mo-parent');

		
		init_de();
		de_progress();
        grid_gallery();
        centery();
   
    // --------------------------------------------------
    // preloader
    // --------------------------------------------------
    
    // begin prelaoder script

    if(show_preloader==1){
        jQuery('header,.v-text,#controls,#nextslide,#prevslide,#subheader h1,#subheader h4,#slidecaption,#section-main,.float-text').addClass("wow");
        jQuery('body').jpreLoader({
            splashID: "#jSplash",
            splashFunction: function () {  //passing Splash Screen script to jPreLoader
                jQuery('#jSplash').children('section').not('.selected').hide();
                jQuery('#jSplash').hide().fadeIn(500);
                jQuery('body').css('opacity','1');
                jQuery('header').addClass("fadeInDown");
                jQuery('header').attr("data-wow-delay",".5s");
                jQuery('.v-text').addClass("fadeIn");
                jQuery('.v-text').attr("data-wow-delay","1s");
                jQuery('#controls,#nextslide,#prevslide').addClass("fadeInUp");
                jQuery('#controls,#nextslide,#prevslide').attr("data-wow-delay",".5s");
                jQuery('#subheader h4').addClass("zoomIn");
                jQuery('#subheader h4').attr("data-wow-delay",".8s");
                jQuery('#slidecaption').addClass("fadeIn");
                jQuery('#slidecaption').attr("data-wow-delay",".5s");
                jQuery('#subheader h1').addClass("zoomIn");
                jQuery('#subheader h1').attr("data-wow-delay",".9s");
                jQuery('#section-main').addClass("fadeInUp");
                jQuery('#section-main').attr("data-wow-delay","1.5s");
                jQuery('.float-text').addClass("fadeIn");
                jQuery('.float-text').attr("data-wow-delay",".5s");

                init_de();
                var timer = setInterval(function () {
                    splashRotator();
                }, 1500);
            }
        }, function () {    //jPreLoader callback function
            clearInterval();

            jQuery(function () {
                var v_url = document.URL;

                if (v_url.indexOf('#') != -1) {
                    var v_hash = v_url.substring(v_url.indexOf("#") + 1);


                    jQuery('html, body').animate({
                        scrollTop: jQuery('#' + v_hash).offset().top - 70
                    }, 200);
                    return false;
                }
            });


        });
    }else{
        $('body').css('display','block');
        $('#jpreOverlay').css('display','none');
        $('#jpreLoader').css('display','none');
    }

    // End of jPreLoader script

    function splashRotator() {
        var cur = jQuery('#jSplash').children('.selected');
        var next = jQuery(cur).next();

        if (jQuery(next).length != 0) {
            jQuery(next).addClass('selected');
        } else {
            jQuery('#jSplash').children('section:first-child').addClass('selected');
            next = jQuery('#jSplash').children('section:first-child');
        }

        jQuery(cur).removeClass('selected').fadeOut(100, function () {
            jQuery(next).fadeIn(100);
        });
    }


    // --------------------------------------------------
    // function
    // --------------------------------------------------

    function video_autosize() {
        jQuery('.de-video-container').each(function () {
            var height_1 = jQuery(this).css("height");
            var height_2 = jQuery(this).find(".de-video-content").css("height");
            var newheight = (height_1.substring(0, height_1.length - 2) - height_2.substring(0, height_2.length - 2)) / 2;
            jQuery(this).find('.de-video-overlay').css("height", height_1);
            jQuery(this).find(".de-video-content").animate({ 'margin-top': newheight }, 'fast');
        });
    }

    window.onresize = function (event) {
		
        enquire.register("screen and (min-width: 993px)", {
            match: function () {
                jQuery('#mainmenu').show();
                jQuery('header').removeClass('height-auto');
                mobile_menu_show = 1;
                col = tmp_col;			
            },
            unmatch: function () {
                jQuery('#mainmenu').hide();
                mobile_menu_show = 0;
                jQuery("#menu-btn").show();
                col = 2;
            }
        });

        // header bottom setting begin
        var mq = window.matchMedia("(max-width: 993px)");
        if (mq.matches) {
            jQuery('.header-bottom,.header-center').css("display", "block");
            jQuery('.header-bottom,.header-center').css("top", "0");
        }
        // header bottom setting close

        init();
        video_autosize();
        centery();

        $('header').removeClass('smaller');
        $('header').removeClass('logo-smaller');
        $('header').removeClass('clone');
		jQuery('#menu-btn').removeClass("clicked");
		jQuery('#menu-btn').addClass("unclick");

        grid_gallery();
		owlnavcenter();

    };


    function init() {

        var sh = jQuery('#de-sidebar').css("height");
        var dh = jQuery(window).innerHeight();
        var h = parseInt(sh) - parseInt(dh);
        var header_height = parseInt(jQuery('header').height(), 10);
        var screen_height = parseInt(jQuery(window).height(), 10);
        var header_mt = screen_height - header_height;
        var mq = window.matchMedia("(min-width: 993px)");
        var ms = window.matchMedia("(min-width: 768px)");

        window.addEventListener('scroll', function (e) {

            if (mq.matches) {
                var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                    shrinkOn = 100,
                    header = document.querySelector("header");
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");
                    }

                }
            }

            if (mq.matches) {
                jQuery("header").addClass("clone", 1000, "easeOutBounce");

                // header autoshow on scroll begin
                var $document = $(document);
                var vscroll = 0;

                if ($document.scrollTop() >= 50 && vscroll == 0) {
                    jQuery("header.autoshow").removeClass("scrollOff");
                    jQuery("header.autoshow").addClass("scrollOn");
                    vscroll = 1;
                } else {
                    jQuery("header.autoshow").removeClass("scrollOn");
                    jQuery("header.autoshow").addClass("scrollOff");
                    vscroll = 0;
                }
                // header autoshow on scroll close


                // header bottom on scroll begin
                var header_height = parseInt(jQuery('header').height(), 10);
                var screen_height = parseInt(jQuery(window).height(), 10);
                var header_mt = screen_height - header_height;
                var header_mt_half = header_mt / 2;

                if ($document.scrollTop() >= header_mt) {
                    jQuery('.header-bottom').css("position", "fixed");
                    jQuery('.header-bottom').css("top", "0");
                } else if ($document.scrollTop() <= header_mt) {
                    jQuery('.header-bottom').css("position", "absolute");
                    jQuery('.header-bottom').css("top", header_mt);
                }

                if ($document.scrollTop() >= header_mt_half) {
                    jQuery('.header-center').css("position", "fixed");
                    jQuery('.header-center').css("top", "0");
                } else if ($document.scrollTop() <= header_mt_half) {
                    jQuery('.header-center').css("position", "absolute");
                    jQuery('.header-center').css("top", header_mt_half);
                }
                // header bottom on scroll close


                // side header on scroll begin
                if (jQuery("header").hasClass("side-header")) {
                    if (jQuery(document).scrollTop() >= h) {
                        jQuery('#de-sidebar').css("position", "fixed");
                        if (parseInt(sh) > parseInt(dh)) {
                            jQuery('#de-sidebar').css("top", -h);
                        }
                        jQuery('#main').addClass("col-md-offset-3");
                    } else {
                        jQuery('#de-sidebar').css("position", "absolute ");
                        if (parseInt(sh) > parseInt(dh)) {
                            jQuery('#de-sidebar').css("top", 0);
                        }
                        jQuery('#main').removeClass("col-md-offset-3");
                    }
                }
                // side header on scroll close
            }
        });


        if (mq.matches) {
            jQuery('.header-bottom,.header-center').css('position', 'absolute');
            jQuery('.header-bottom,.header-center').css('top', header_mt);
        }


    }
    window.onload = init();


    // --------------------------------------------------
    // owlCarousel
    // --------------------------------------------------
    
    jQuery("#carousel-products").owlCarousel({
        center: false,
            items:1,
            loop:true,
            dots: true,
            margin:0,
            responsive:{
                1000:{
                    items:1
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
    });
	
	jQuery("#gallery-carousel-2").owlCarousel({
        center: false,
			items:2,
			loop:true,
			dots: false,
			margin:0,
			responsive:{
				1000:{
					items:2
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
    });

    var bigimage = $(".p-carousel");
          var thumbs = $(".p-carousel-thumb");
          //var totalslides = 10;
          var syncedSecondary = true;

          bigimage
            .owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: false,
            // autoplay: true,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: [
              '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
              '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
            ]
          })
            .on("changed.owl.carousel", syncPosition);

          thumbs
            .on("initialized.owl.carousel", function() {
            thumbs
              .find(".owl-item")
              .eq(0)
              .addClass("current");
          })
            .owlCarousel({
            items: 4,
            dots: false,
            nav: false,
            navText: [
              '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
              '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
            ],
            margin:15,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 4,
            responsiveRefreshRate: 100
          })
            .on("changed.owl.carousel", syncPosition2);

          function syncPosition(el) {
            //if loop is set to false, then you have to uncomment the next line
            //var current = el.item.index;

            //to disable loop, comment this block
            console.log(el);
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

            if (current < 0) {
              current = count;
            }
            if (current > count) {
              current = 0;
            }
            //to this
            thumbs
              .find(".owl-item")
              .removeClass("current")
              .eq(current)
              .addClass("current");
            var onscreen = thumbs.find(".owl-item.active").length - 1;
            console.log(onscreen)
            var start = thumbs
            .find(".owl-item.active")
            .first()
            .index();
            var end = thumbs
            .find(".owl-item.active")
            .last()
            .index();
            console.log(end);
            if (current > end) {
              thumbs.data("owl.carousel").to(current, 100, true);
            }
            if (current < start) {
              thumbs.data("owl.carousel").to(current - onscreen, 100, true);
            }
          }

          function syncPosition2(el) {
            if (syncedSecondary) {
              var number = el.item.index;
              bigimage.data("owl.carousel").to(number, 100, true);
            }
          }

          thumbs.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).index();
            bigimage.data("owl.carousel").to(number, 300, true);
          });

         jQuery("#owl-logo").owlCarousel({
            center: false,
            items:4,
            loop:true,
            dots: false,
            margin:0,
            autoplay:true,
            autoplayTimeout:2000,
            responsive:{
                1000:{
                    items:6
                },
                600:{
                    items:4
                },
                0:{
                    items:3
                }
            }
         });

    jQuery("#gallery-carousel-3").owlCarousel({
        center: false,
			items:3,
			loop:true,
			dots: false,
			margin:0,
			responsive:{
				1000:{
					items:3
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
    });

    jQuery("#gallery-carousel-4").owlCarousel({
        center: false,
			items:4,
			loop:true,
			dots: false,
			margin:0,
			responsive:{
				1000:{
					items:4
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
    });


    jQuery(".carousel-gallery").owlCarousel({
        items: 4,
        navigation: false,
        pagination: false
    });

    jQuery("#blog-carousel").owlCarousel({
            center: false,
			items:2,
			loop:true,
			dots: true,
			margin:30,
			responsive:{
				1000:{
					items:2
				},
				600:{
					items:1
				},
				0:{
					items:1
				}
			}
         });
	
	jQuery(".carousel-4-center-dots").owlCarousel({
            center: true,
			items:4,
			loop:true,
			dots: true,
			margin:30,
			responsive:{
				1000:{
					items:4
				},
				600:{
					items:2
				},
				0:{
					items:1
				}
			}
         });
	
	jQuery("#testimonial-carousel").owlCarousel({
            center: false,
			items:2,
			loop:true,
			dots: true,
			margin:30,
			responsive:{
				1000:{
					items:2
				},
				600:{
					items:1
				},
				0:{
					items:1
				}
			}
         });
	jQuery("#testimonial-carousel-3-cols").owlCarousel({
            center: false,
            items:3,
            loop:true,
            dots: true,
            margin:30,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
         });
    
	jQuery("#testimonial-carousel-single").owlCarousel({
			items:1,
			autoplay:true,
			autoplayTimeout:6000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			loop:true,
			dots:true,
			mouseDrag:false,
			touchDrag:false,
			margin:0,
         });

    jQuery("#logo-carousel").owlCarousel({
        items: 6,
        loop:true,
		dots: false,
        autoPlay: true,
        responsive:{
            1000:{
                items:6
            },
            600:{
                items:4
            },
            0:{
                items:1
            }
        }
    });

    jQuery("#contact-carousel").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        autoPlay: true
    });


    jQuery("#text-carousel").owlCarousel({
			items:1,
			autoplay:true,
			autoplayTimeout:4000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			loop:true,
			dots:false,
			mouseDrag:false,
			touchDrag:false,
			margin:0,
         });
	
	
	jQuery("#single-carousel").owlCarousel({
			items:1,
			autoplay:true,
			autoplayTimeout:4000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			loop:true,
			dots:false,
			mouseDrag:false,
			touchDrag:false,
			margin:0,
         });
	
	
	 jQuery(".carousel-single-navi").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: true,
        pagination: false,
        mouseDrag: false,
        touchDrag: false,
        transitionStyle: "fade"
    });

    jQuery(".blog-slide").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        autoPlay: false
    });

    jQuery("#photo-carousel").owlCarousel({
            center: false,
            items:4,
            loop:true,
            margin:0,
            nav: false,
            dots: true,
            autoHeight: true,
            responsive:{
                1000:{
                    items:4
                },
                992:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });


    // Custom Navigation owlCarousel
    $(".next").on("click", function () {
        $(this).parent().parent().find('.blog-slide').trigger('owl.next');
    });
    $(".prev").on("click", function () {
        $(this).parent().parent().find('.blog-slide').trigger('owl.prev');
    });

	function owlnavcenter(){
    jQuery('.owl-custom-nav').each(function () {
        var owl = $('.owl-custom-nav').next();
        var ow = parseInt(owl.css("height"), 10);
        $(this).css("margin-top", (ow / 2) - 10);

        owl.owlCarousel();

        // Custom Navigation Events
        $(".btn-next").on("click", function () {
            owl.trigger('next.owl.carousel');
        });
        $(".btn-prev").on("click", function () {
            owl.trigger('prev.owl.carousel');
        });
    });
	}
	
	owlnavcenter();


    // --------------------------------------------------
    // custom positiion
    // --------------------------------------------------

    function centery() {
        var mi = window.matchMedia("(min-width: 768px)");
		var ma = window.matchMedia("(max-width: 768px)");


            if (mi.matches) {
				var $doc_height = jQuery(window).innerHeight();
				jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
				jQuery('.full-height').css("height", $doc_height);
				var picheight = jQuery('.center-y').css("height");
				picheight = parseInt(picheight, 10);
				jQuery('.center-y').css('margin-top', (($doc_height - picheight) / 2) - 90);
				jQuery('.full-height .de-video-container').css("height", $doc_height);
			}
			
			if (ma.matches) {
				jQuery('.full-height').css("max-height", '100%');
			}
    }
    


    // --------------------------------------------------
    // blog list hover
    // --------------------------------------------------
    jQuery(".blog-list").on("mouseenter", function () {
		var v_height;
		var v_width;
		
		if (typeof v_height !== 'undefined') {
        v_height = jQuery(this).find(".blog-slide").css("height");
        v_width = jQuery(this).find(".blog-slide").css("width");
        var newheight = (v_height.substring(0, v_height.length - 2) / 2) - 40;
        jQuery(this).find(".owl-arrow").css("margin-top", newheight);
        jQuery(this).find(".owl-arrow").css("width", v_width);
        jQuery(this).find(".owl-arrow").fadeTo(150, 1);
		}
        //alert(v_height);
    }).on("mouseleave", function () {
        jQuery(this).find(".owl-arrow").fadeTo(150, 0);

    });

    //  logo carousel hover
    jQuery("#logo-carousel img").on("mouseenter", function () {
        jQuery(this).fadeTo(150, 0.5);
    }).on("mouseleave", function () {
        jQuery(this).fadeTo(150, 1);
    });

	/* --------------------------------------------------
	 * show gallery item sequence
	 * --------------------------------------------------*/
	function sequence(){
		var sq = jQuery(".sequence .sq-item .picframe");
		var count = sq.length;
		sq.addClass("zoomIn");
		for (var i = 0; i <= count; i++) {
		  var sqx = jQuery(".sequence > .sq-item:eq("+i+") .picframe");
		  sqx.attr('data-wow-delay',(i/15)+'s');
		}		
	}
	
	function demo(){
		$('#switcher').css('display','block');
		jQuery(".bg1").click(function(){
			jQuery("#colors").attr("href", "css/colors/aqua.css");
		});
		
		jQuery(".bg2").click(function(){
			jQuery("#colors").attr("href", "css/colors/blue.css");
		});
		
		jQuery(".bg3").click(function(){
			jQuery("#colors").attr("href", "css/colors/green.css");
		});
		
		jQuery(".bg4").click(function(){
			jQuery("#colors").attr("href", "css/colors/grey.css");
		});
		
		jQuery(".bg5").click(function(){
			jQuery("#colors").attr("href", "css/colors/orange.css");
		});
		
		jQuery(".bg6").click(function(){
			jQuery("#colors").attr("href", "css/colors/pink.css");
		});
		
		jQuery(".bg7").click(function(){
			jQuery("#colors").attr("href", "css/colors/purple.css");
		});
		
		jQuery(".bg8").click(function(){
			jQuery("#colors").attr("href", "css/colors/red.css");
		});
		
		jQuery(".bg9").click(function(){
			jQuery("#colors").attr("href", "css/colors/yellow.css");
		});
		
		jQuery(".bg10").click(function(){
			jQuery("#colors").attr("href", "css/colors/lime.css");
		});
		
		
		
		jQuery(".custom-show").hide();
		
		jQuery(".custom-close").click(function(){
			jQuery(this).hide();
			jQuery(".custom-show").show();
			jQuery('#switcher').animate({'left': '+=120px'},'medium');
		});
		

		jQuery(".custom-show").click(function(){
			jQuery(this).hide();
			jQuery(".custom-close").show();
			jQuery(this).parent().animate({'left': '-=120px'},'medium');
		});
		
		
		jQuery('#de-header-style').on('change', function() {
			var v = this.value;
			if(v=='opt-1'){
				$('header').removeClass('transparent');
			}else if(v=='opt-2'){
				$('header').addClass('transparent');
			}
		});
		
		jQuery('#de-header-color').on('change', function() {
			var v = this.value;
			if(v=='opt-1'){
				$('header').removeClass('header-light');
			}else if(v=='opt-2'){
				$('header').addClass('header-light');
			}
		});
		
		jQuery('#de-header-layout').on('change', function() {
			var v = this.value;
			if(v=='opt-1'){
				$('header').removeClass('de_header_2');
				$('header .info').hide();
			}else if(v=='opt-2'){
				$('header').addClass('de_header_2');
				$('header .info').show();
			}
		});
		
		jQuery('#de-menu').on('change', function() {
			$('#mainmenu').removeClass('no-separator');
			$('#mainmenu').removeClass('line-separator');
			$('#mainmenu').removeClass('circle-separator');
			$('#mainmenu').removeClass('square-separator');
			$('#mainmenu').removeClass('plus-separator');
			$('#mainmenu').removeClass('strip-separator');
			var v = this.value
			if(v=='opt-1'){
				$('#mainmenu').removeClass('no-separator');
				$('#mainmenu').removeClass('line-separator');
			}else if(v=='opt-2'){
				$('#mainmenu').addClass('line-separator');
			}else if(v=='opt-3'){
				$('#mainmenu').addClass('circle-separator');
			}else if(v=='opt-4'){
				$('#mainmenu').addClass('square-separator');
			}else if(v=='opt-5'){
				$('#mainmenu').addClass('plus-separator');
			}else if(v=='opt-6'){
				$('#mainmenu').addClass('strip-separator');
			}else if(v=='opt-0'){
				$('#mainmenu').addClass('no-separator');
			}
		});
	}
	
	sequence();
	
	// document on load
    jQuery(window).on("load", function() {

        video_autosize();		
        grid_gallery();
		custom_bg();
		de_count();
        centery();
		demo();

        var $masonry = jQuery('.masonry');
            $masonry.isotope({
                itemSelector: '.item',
                filter: '*'
        });

        // owl
        jQuery("#carousel-rooms").owlCarousel({
                center: false,
                items:3,
                margin:20,
                loop:false,
                dots: true,
                autoWidth:true,
                responsive:{
                    1000:{
                        items:3
                    },
                    600:{
                        items:2
                    },
                    0:{
                        items:1
                    }
                }
        });


        // --------------------------------------------------
        // filtering gallery
        // --------------------------------------------------
       
        $container.isotope({
            itemSelector: '.item',
            filter: '*'
        });
        jQuery('#filters a').on("click", function () {
            var $this = jQuery(this);
            if ($this.hasClass('selected')) {
                return false;
            }
            var $optionSet = $this.parents();
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');

            var selector = jQuery(this).attr('data-filter');
            $container.isotope({
                filter: selector
            });
            return false;
        });

        $('.grid').isotope({
            itemSelector: '.grid-item'
        });

        /* de-number begin */

        $('.d-minus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 0 ? 0 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.d-plus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) + 1;
            count = count > 10 ? 10 : count;
             $input.val(count);
            $input.change();
            return false;
        });
        /* de-number close */

        /* copy elements */

        var e = $('.select-room');
        var room_count = 10;
        var d_copy;
           for (var i = room_count; i > 1; i--) {
             e.clone().attr('id', 'room-'+ i).insertAfter(e);
           }
		

        for (var n = 0; n <= room_count; n++) {
          $("#room-" + n).hide();
          $("#room-" + n).find("select").attr('id', 'room-type'+ n);
          $("#room-" + n).find("select").attr('name', 'Room Type '+ n);
          $("#room-" + n).find("select").attr('disabled',true);
          $("#room-" + n).find("h4").text("Select Room #" + n);
        }

        $('#d-room-count .d-minus').click(function () {
           var $value = parseInt($('#room-count').val())+1;
            $("#room-" + $value).hide();
            $("#room-" + n).find("select").attr('disabled',true);
        });

        $('#d-room-count .d-plus').click(function () {
            var $value = parseInt($('#room-count').val());
            for (var n = 1; n <= $value; n++) {
              $("#room-" + n).show();
              $("#room-" + n).find("select").attr('disabled',false);
            }
        });


        /* detepicker */
        
        $('#date-picker').daterangepicker({
                "showISOWeekNumbers": true,
                "timePicker": false,
                "autoUpdateInput": true,
                "locale": {
                    "format": "MMMM DD, YYYY",
                    "separator": " - ",
                    "applyLabel": "Apply",
                    "cancelLabel": "Cancel",
                    "fromLabel": "From",
                    "toLabel": "To",
                    "customRangeLabel": "Custom",
                    "weekLabel": "W",
                    "daysOfWeek": [
                        "Su",
                        "Mo",
                        "Tu",
                        "We",
                        "Th",
                        "Fr",
                        "Sa"
                    ],
                    "monthNames": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ],
                    "firstDay": 1
                },
                "linkedCalendars": true,
                "showCustomRangeLabel": false,
                "startDate": 1,
                "endDate": moment().startOf('hour').add(24, 'hour'),
                "opens": "right"
            });

		/* mo-menu begin */
            
            
             jQuery('#mo-menu li').on("click", function() {
                 
                var iteration = $(this).data('iteration') || 1;
                
                switch (iteration) {
                    case 1:
                        $(this).children('ul').addClass('full');
                        $(this).children('ul').animate({ 'margin-top': '20px' }, "slow");
                        break;
                    case 2:
                        $(this).children('ul').removeClass('full');
                        $(this).children('ul').animate({ 'margin-top': '0' }, "slow");
                         break;
                 }
                 iteration++;
                 if (iteration > 2) iteration = 1;
                 $(this).data('iteration', iteration);
             
             });
             
            jQuery('#mo-button-open').on("click", function() {
                $('html,body').addClass("no-scroll");

                jQuery('#menu-overlay').fadeIn();
                jQuery('#menu-overlay').css("top","0");
                
                /*$("#mo-menu  > li").each(function(i) {
                    $(this).animate({
                        'opacity': '1',
                    }, 10*i);
                });*/
                
                 /* $("#mo-menu li").finish().delay(500).each(function(i) {
                    $(this).finish().delay(200+(100 * i)).queue(function() {
                      $(this).addClass("show");
                    })
                  })*/

             });
             
             jQuery('#mo-button-close').on("click", function() {
                jQuery('#menu-overlay').fadeOut();
                /*$("#mo-menu li").finish().delay(500).each(function(i) {
                    $(this).finish().delay(100 * i).queue(function() {
                      $(this).removeClass("show");
                    })
                  })*/
                if(jQuery('#menu-overlay').hasClass("slideDown")){
                    jQuery('#menu-overlay').css("top","-100%");
                }

                $('html,body').delay(500).removeClass("no-scroll");
             });
             
             jQuery('#mo-menu a').on("click", function() {
            
                if (this.href.indexOf('#') != -1) {
                    jQuery('#menu-overlay').fadeOut();
                    $("#mo-menu  > li").each(function(i) {
                        $(this).animate({
                            'opacity': '0',
                        }, 150*i);
                    });
                    if(jQuery('#menu-overlay').hasClass("slideDown")){
                        jQuery('#menu-overlay').css("top","-100%");
                    }
                }
                    
            });
         /* mo-menu close */

         jQuery('#pauseplay').on("click", function() {
                 
                var iteration = $(this).data('iteration') || 1;
                
                switch (iteration) {
                    case 1:
                        $(this).addClass('pause');
                        $(this).removeClass('play');
                        break;
                    case 2:
                        $(this).removeClass('pause');
                        $(this).addClass('play');
                        break;
                 }
                 iteration++;
                 if (iteration > 2) iteration = 1;
                 $(this).data('iteration', iteration);
             
             });

        // --------------------------------------------------
        // tabs
        // --------------------------------------------------
        jQuery('.de_tab').find('.de_tab_content > div').hide();
        jQuery('.de_tab').find('.de_tab_content > div:first').show();
        jQuery('li').find('.v-border').fadeTo(150, 0);
        jQuery('li.active').find('.v-border').fadeTo(150, 1);

        jQuery('.de_nav li').click(function () {
            jQuery(this).parent().find('li').removeClass("active");
            jQuery(this).addClass("active");
            jQuery(this).parent().parent().find('.v-border').fadeTo(150, 0);
            jQuery(this).parent().parent().find('.de_tab_content > div').hide();

            var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
            jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
            jQuery(this).find('.v-border').fadeTo(150, 1);
        });

        $('.de-simple-tab').find('.de-simple-tab-content > div').hide();
        $('.de-simple-tab').find('.de-simple-tab-content > div:first').show();

        $('.de-simple-tab li').click(function() {
            $(this).parent().find('li span').removeClass("active");
            $(this).find('span').addClass("active");
            $(this).parent().parent().find('.de-simple-tab-content > div').hide();

            var indexer = $(this).index(); //gets the current index of (this) which is #nav li
            $(this).parent().parent().find('.de-simple-tab-content > div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
        });


        // request quote function

        var rq_step = 1;

        jQuery('#request_form .btn-right').click(function () {

            var rq_name = $('#rq_name').val();
            var rq_email = $('#rq_email').val();
            var rq_phone = $('#rq_phone').val();

            if (rq_step == 1) {
                if (rq_name.length == 0) { $('#rq_name').addClass("error_input"); } else { $('#rq_name').removeClass("error_input"); }
                if (rq_email.length == 0) { $('#rq_email').addClass("error_input"); } else { $('#rq_email').removeClass("error_input"); }
                if (rq_phone.length == 0) { $('#rq_phone').addClass("error_input"); } else { $('#rq_phone').removeClass("error_input"); }
            }

            if (rq_name.length != 0 && rq_email.length != 0 && rq_phone.length != 0) {
                jQuery("#rq_step_1").hide();
                jQuery("#rq_step_2").fadeIn();
            }

        });

        // --------------------------------------------------
        // tabs
        // --------------------------------------------------
        jQuery('.de_review').find('.de_tab_content > div').hide();
        jQuery('.de_review').find('.de_tab_content > div:first').show();
        //jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
        jQuery('.de_review').find('.de_nav li:first').fadeTo(150, 1);

        jQuery('.de_nav li').click(function () {
            jQuery(this).parent().find('li').removeClass("active");
            //jQuery(this).parent().find('li').fadeTo(150,.5);
            jQuery(this).addClass("active");
            jQuery(this).fadeTo(150, 1);
            jQuery(this).parent().parent().find('.de_tab_content > div').hide();

            var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
            jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').show(); //uses whatever index the link has to open the corresponding box 
        });
		
		
		function de_count(){
			jQuery('.timer').each(function () {
				var imagePos = jQuery(this).offset().top;

				var topOfWindow = jQuery(window).scrollTop();
				if (imagePos < topOfWindow + 500 && v_count == '0') {

					jQuery(function ($) {

						// start all the timers
						jQuery('.timer').each(count);
						
						function count(options) {
							v_count = '1';
							var $this = jQuery(this);
							options = $.extend({}, options || {}, $this.data('countToOptions') || {});
							$this.countTo(options);
						}
					});

				}
			});			
		}


        // --------------------------------------------------
        // toggle
        // --------------------------------------------------
        jQuery(".toggle-list h2").addClass("acc_active");
        jQuery(".toggle-list h2").toggle(
            function () {
                jQuery(this).addClass("acc_noactive");
                jQuery(this).next(".ac-content").slideToggle(200);
            },
            function () {
                jQuery(this).removeClass("acc_noactive").addClass("acc_active");
                jQuery(this).next(".ac-content").slideToggle(200);
            });

        var mb;


        // carousel navigation

         //
         var owl = $('#carousel-rooms');
         owl.owlCarousel();
         $('.d-carousel .d-arrow-right').click(function() {
             owl.trigger('next.owl.carousel');
         })
         $('.d-carousel .d-arrow-left').click(function() {
             owl.trigger('prev.owl.carousel');
         });


        // --------------------------------------------------
        // navigation for mobile
        // --------------------------------------------------



        jQuery('#menu-btn').on("click", function () {
            if (mobile_menu_show == 0) {
                jQuery('#mainmenu').slideDown();
                jQuery('header').addClass('height-auto');
                jQuery('.force-header-mobile').css('max-height','100%');
                mobile_menu_show = 1;
				jQuery(this).removeClass("unclick");
				jQuery(this).addClass("clicked");	
            } else {
                $('#mainmenu').slideUp('fast', function () {
                    jQuery('header').removeClass('height-auto');
                    jQuery('.force-header-mobile').css('max-height','80px');
                    mobile_menu_show = 0;
                });
				jQuery(this).removeClass("clicked");
				jQuery(this).addClass("unclick");	
            }
        });

        // one page navigation
        /**
       * This part causes smooth scrolling using scrollto.js
       * We target all a tags inside the nav, and apply the scrollto.js to it.
       */

        jQuery("#homepage nav a, .scroll-to, #mo-menu a").click(function (evn) {

            if (this.href.indexOf('#') != -1) {
                evn.preventDefault();
                jQuery('html,body').scrollTo(this.hash, this.hash);
            }
        });

        jQuery("a.btn").click(function (evn) {

            if (this.href.indexOf('#') != -1) {
                evn.preventDefault();
                jQuery('html,body').scrollTo(this.hash, this.hash);
            }
        });
		
		jQuery(".pop-search-click").on("click", function() {
			var iteration = $(this).data('iteration') || 1;
			switch (iteration) {
				case 1:
					jQuery(this).addClass("click");
					jQuery('.pop-search .form-default').fadeTo(300,1);
					jQuery('.pop-search .form-default input').focus();
					break;
				case 2:
					jQuery(this).removeClass("click");
					jQuery('.pop-search .form-default').hide();
					break;
			}
			iteration++;
			if (iteration > 2) iteration = 1;
			$(this).data('iteration', iteration);
		});

        jQuery('.de-gallery .item .icon-info').on("click", function () {
            jQuery('.page-overlay').show();
            url = jQuery(this).attr("data-value");

            jQuery("#loader-area .project-load").load(url, function () {
                jQuery("#loader-area").slideDown(500, function () {
                    jQuery('.page-overlay').hide();
                    jQuery('html, body').animate({
                        scrollTop: jQuery('#loader-area').offset().top - 70
                    }, 500, 'easeOutCubic');

                    //

                    jQuery(".image-slider").owlCarousel({
                        items: 1,
                        singleItem: true,
                        navigation: false,
                        pagination: true,
                        autoPlay: false
                    });

                    jQuery(".container").fitVids();

                    jQuery('#btn-close-x').on("click", function () {
                        jQuery("#loader-area").slideUp(500, function () {
                            jQuery('html, body').animate({
                                scrollTop: jQuery('#section-portfolio').offset().top - 70
                            }, 500, 'easeOutCirc');
                        });

                        return false;

                    });

                });
            });
        });

        jQuery('.de-gallery .item').on("click", function () {
            $('#navigation').show();
        });


        // --------------------------------------------------
        // custom page with background on side
        // --------------------------------------------------
        jQuery('.side-bg').each(function () {
            jQuery(this).find(".image-container").css("height", jQuery(this).find(".image-container").parent().css("height"));
        });

        var target = $('.center-y');
        var targetHeight = target.outerHeight();
		
		jQuery('.animated').fadeTo(0, 0);
        jQuery('.animated').each(function () {
            var imagePos = jQuery(this).offset().top;
            var timedelay = jQuery(this).attr('data-delay');

            var topOfWindow = jQuery(window).scrollTop();
            if (imagePos < topOfWindow + 300) {
                jQuery(this).fadeTo(1, 500);
                var $anim = jQuery(this).attr('data-animation');
            }
        });


        // btn arrow up
        jQuery(".arrow-up").on("click", function () {
            jQuery(".coming-soon .coming-soon-content").fadeOut("medium", function () {
                jQuery("#hide-content").fadeIn(600, function () {
                    jQuery('.arrow-up').animate({ 'bottom': '-40px' }, "slow");
                    jQuery('.arrow-down').animate({ 'top': '0' }, "slow");
                });
            });
        });

        // btn arrow down
        jQuery(".arrow-down").on("click", function () {
            jQuery("#hide-content").fadeOut("slow", function () {
                jQuery(".coming-soon .coming-soon-content").fadeIn(800, function () {
                    jQuery('.arrow-up').animate({ 'bottom': '0px' }, "slow");
                    jQuery('.arrow-down').animate({ 'top': '-40' }, "slow");
                });
            });
        });

        // document scroll //
		jQuery(document).scroll(function () {
			var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
            if (scrollPercent >= 0) {
                target.css('opacity', scrollPercent);
            }
			
			 if (location.hash!=="") {
				jQuery('#homepage nav li a').each(function () {
					if (this.href.indexOf('#') != -1) {
						var href = jQuery(this).attr('href');
						if (jQuery(window).scrollTop() > jQuery(href).offset().top - 140) {
							jQuery('nav li a').removeClass('active');
							jQuery(this).addClass('active');
						}
					}
				});
			}
			
			de_count();

			jQuery('.animated').each(function () {
				var imagePos = jQuery(this).offset().top;
				var timedelay = jQuery(this).attr('data-delay');

				var topOfWindow = jQuery(window).scrollTop();
				if (imagePos < topOfWindow + 500) {
					jQuery(this).delay(timedelay).queue(function () {
						jQuery(this).fadeTo(1, 500);
						var $anim = jQuery(this).attr('data-animation');
						jQuery(this).addClass($anim).clearQueue();
					});

				}
			});

			jQuery(".nav-exit").on("click", function () {
				$.magnificPopup.close();
			});
			
        }); // document scroll end //
		
    
	}); // document load end //
	

    // mainmenu create span
    jQuery('#mainmenu li a').each(function () {
        if ($(this).next("ul").length > 0) {
            $("<span></span>").insertAfter($(this));
        }
    });

    // mainmenu arrow click
    jQuery("#mainmenu > li > span").on("click", function () {
        var iteration = $(this).data('iteration') || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this).parent().find("ul:first").animate({ 'height': curHeight }, 400, 'easeInOutQuint');

                break;

            case 2:
                $(this).removeClass("active");
                $(this).parent().find("ul:first").animate({ 'height': "0" }, 400, 'easeInOutQuint');
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);
    });

    jQuery("#mainmenu > li > ul > li > span").on("click", function () {
        var iteration = $(this).data('iteration') || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                $(this).parent().parent().parent().find("ul:first").css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this).parent().find("ul:first").animate({ 'height': curHeight }, 400, 'easeInOutQuint');

                break;

            case 2:
                $(this).removeClass("active");
                $(this).parent().find("ul:first").animate({ 'height': "0" }, 400, 'easeInOutQuint');
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);
    });

    jQuery("#mainmenu > li > ul > li > ul > li span").on("click", function () {
        var iteration = $(this).data('iteration') || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                $(this).parent().parent().parent().find("ul:first").css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this).parent().find("ul:first").animate({ 'height': curHeight }, 400, 'easeInOutQuint');

                break;

            case 2:
                $(this).removeClass("active");
                $(this).parent().find("ul:first").animate({ 'height': "0" }, 400, 'easeInOutQuint');
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);
    });



    //jQUery('footer').append('<a href="#" id="back-to-top"></a>');

    if ($('#back-to-top').length) {
        var scrollTrigger = 500, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });

        $("section,div").css('background-color', function () {
            return jQuery(this).data('bgcolor');
        });

        $("div").css('background-image', function () {
            return jQuery(this).data('bgimage');
        });


    }


    var incrementPlus;
    var incrementMinus;

    var buttonPlus  = $(".f-input-number-increment");
    var buttonMinus = $(".f-input-number-decrement");

    var incrementPlus = buttonPlus.click(function() {
        var $n = $(this)
            .parent()
            .find(".f-input-number");
        $n.val(Number($n.val())+1 );
    });

    var incrementMinus = buttonMinus.click(function() {
        var $n = $(this)
            .parent()
            .find(".f-input-number");
        var amount = Number($n.val());
        if (amount > 0) {
            $n.val(amount-1);
        }
    });
    

    // --------------------------------------------------
    // looping background
    // --------------------------------------------------
    $(function () {
        var x = 0;
        setInterval(function () {
            x -= 1;
            $('.bg-loop').css('background-position', x + 'px 0');
        }, 50);
    });

    // new added

    jQuery('.expand').each(function () {
        $(this).find('h4').on("click", function () {
            var iteration = $(this).data('iteration') || 1;
            switch (iteration) {
                case 1:
                    $(this).next('.hidden-content').slideDown(300);
                    $(this).addClass('active');
                    break;

                case 2:
                    $(this).next('.hidden-content').slideUp(300);
                    $(this).removeClass('active');
                    break;
            }
            iteration++;
            if (iteration > 2) iteration = 1;
            $(this).data('iteration', iteration);
        });
    });

});

