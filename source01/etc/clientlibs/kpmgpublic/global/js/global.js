/* global s */
define([
        'jquery',
        'clamp',
        'handlebars',
        'config',
        'modernizr',
        'lazyload',
        'respond',
        'bootstrap',
        'jquerytap',
		'bootstrap4',
        'placeholder',
        'cookiemgr',
        'privacy',
        'renditionimage',
        'jqueryh5validate',
        'customScrollbar',
        'tooltip'
    ],
    function(
        $,
        $clamp
    ) {
        'use strict';

		checkAndInitializaeNavigationV2();
		//
		function checkAndInitializaeNavigationV2(){
            //initializes the revised navigation and revised footer component
			var navigationV2Elem, NavigationV2ElementExists;
			//
			navigationV2Elem = '#navigation-v2';
			NavigationV2ElementExists = $(navigationV2Elem).length;
			//
			if (NavigationV2ElementExists) {
                if(window.kpmgPersonalize && window.kpmgPersonalize.isBlog) {
                    require(['navigation-v2'], function(NAV_2){
    					NAV_2.initializeVue();
    				})
                } else {
                    require(['navigation-v2','footer-v2'], function(NAV_2,footer_v2){
    					NAV_2.initializeVue();
                        var revfooterinit = new footer_v2();
    				});
                }

			}
		}

		//
		$.noConflict();
        /**
         [satya] adding a wrapper to avoid console log errors on IE 9 while developer tool is not available.
         */

        if (window.console === undefined) {
            window.console = {};
            window.console.log = function() {};
        }
        /*
            added below condition to prevent displaying blank personalized cells if tracking
            protection is enabled.
        */
        if(navigator.doNotTrack==="1"){
            $('[personalize="true"]').each(function () {
                $(this).prop('hidden', false);
            });
        }

        $('[data-toggle="tooltip"]').tooltip();
        var bp = window.matchMedia("all and (max-width: 641px)"),
            isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
            isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        window.kpmg = {};
        var Global = function() {
            // Used for dispatching event for JS breakpoints
            bp.addListener(handleMediaQuery);
            //Executed on page load with URL containing an anchor tag.
            if ($(location.href.split("#")[1])) {
                var target = $('#' + location.href.split("#")[1]);
                if (target.length) {
                    var thisOffset;
                    if (window.kpmg.isMobile) {
                        thisOffset = target.offset().top;
                    } else {
                        thisOffset = target.offset().top - 131;
                    }
                    $('html,body').animate({
                        scrollTop: thisOffset //offset height of header here too.
                    }, 250);
                    return false;
                }
            }

            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };

            $(window).on('load',function() {
                // read parameters from URL
                var open = getUrlParameter('form');
                var name = getUrlParameter('name');

                switch (open) {
                    case "rfp":
                        $("#rfp-process-modal").trigger("click");
                        break;
                    case "contact":
                        $("#contact-form-modal").trigger("click");
                        break;
                    case "peoplecontact":
                        $("#" + name).trigger("click");
                        break;
                    default:
                        break;
                }
            });


            $(document).on('mobilereflowedFinished', function() {
                var kpmgModal = $("#kpmgModal"),
                    eventCollection = $._data(kpmgModal[0], 'events');
                if (!eventCollection) {
                    $('.btn-modal', '.module-contactpromo').on('click', handleModalLoaded);
                }
            });

            // this is temporary and should be removed when integrated
            $(document).on('template.loaded', function() {
                handleMediaQuery(bp);
                $('body').append($('.modal'));
                var kpmgModal = $("#kpmgModal"),
                    eventCollection = $._data(kpmgModal[0], 'events');
                if (!eventCollection) {

                    $('.btn-modal').on('click', handleModalLoaded);

                    kpmgModal.on('show.bs3.modal', handleModalOpened).on("shown.bs3.modal", handleModalShown).on("loaded.bs3.modal", handleRemoteModalLoaded).on('hide.bs3.modal', handleModalClosed);
                }
                /*$(document).on('mobileBreakpoint', function() {
                    setTimeout(function() {
                        clampPromos();
                    }, 200);
                });*/
          /*      $(document).on('desktopBreakpoint', function() {
                    setTimeout(function() {
                        clampNav();
                    }, 200);
                });*/
                /**
                 * Initalize place holder library for non supported browser
                 */
                if (!Modernizr.input.placeholder) {
                    $('input, textarea').placeholder({
                        customClass: 'custom-placeholder-color'
                    });
                }

            });            


            $('#language-locale .collapse-cancel-trigger-component').on('click', function(){
                var mobileGlobeParent = $('.collapse-cancel-trigger-component').closest('.mobile-nav-menu-tabs-component');

                var mainNav = mobileGlobeParent.parent();
                if(mainNav.hasClass("open")){
                    mainNav.find('li.mobile-primary-nav-list-component').slideUp();
                    mainNav.find('li.siteSelectorli').slideUp();
                }else{
                    mainNav.find('li.mobile-primary-nav-list-component').slideDown(); 
                    mainNav.find('li.siteSelectorli').slideDown();
                }	

            });
            $('a[href*="#"]:not([href="#"])').on('click', function() {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name="' + this.hash.slice(1) + '"]');
                    if (target.length) {
                        var thisOffset;
                        if (window.kpmg.isMobile) {
                            thisOffset = target.offset().top;
                        } else {
                            thisOffset = target.offset().top - 131;
                        }
                        $('html,body').animate({
                            scrollTop: thisOffset //offsets for fixed header
                        }, 250);
                        return false;
                    }
                }
            });

            $('a', '.socialchannel-links').on('click', function(evt) {
                var network = $(evt.currentTarget).find('.sr-only').html();
                try {
                    s.trackEvent({
                        "socialAction1": "follow",
                        "socialNetwork1": network,
                        "socialAction2": "follow",
                        "socialNetwork2": network,
                        "events": "event22"
                    }, "Social Link");
                } catch (err) {
                    //console.log('Tracking disabled hence "S" object is undefined...');
                }
            });
        };

 /*       function clampNav() {

            var $elementsToClamp = {
                ".module-navflyoutb .navflyoutb-list": 14 * 3,
                ".module-navflyouta .navflyouta-list": 14 * 3,
                ".module-navflyoutc .navflyoutc-list": 14 * 3
            };

            $.each($elementsToClamp, function(elem, clampLines) {
                $(elem).each(function(index, element) {
                    $(this).attr('style', '');
                    if ($(this).is(':visible')) {
                        $(this).dotdotdot ({
                            ellipsis    : '...',
                            height      : clampLines,
                            wrap        : 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    }
                });
            });
        }*/

        function handleModalShown() {
            $("body").addClass("modal-active");
        }

        function handleModalLoaded(evt) {
            var target = $(evt.currentTarget),
                modalWraper = $('#kpmgModal'),
                isiPad = (/iPad/i).test(navigator.userAgent),
                isiPhone = (/iPhone/i).test(navigator.userAgent);

            window.kpmg.modalOpenerUrl = target.data('modal-url');
            if (target.data('view-type') === "mobile") {
                evt.preventDefault();
                $("#kpmgModal").bs3modal({
                    remote: target.attr('href')
                });
            }

            /*
             * To solve popu scrolling issue after close virtual keyword with iOS device
             * Change overlay position to absolute if device is ipad and form input inside ipad
             *
             *
             */
            if (isiPad) {
                modalWraper.on('loaded.bs3.modal', function(event) {
                    if ($('form', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'left': '25%',
                            'width': '600px'
                        });
                    }

                    if ($('.modal-rfpdialog', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'left': '1%',
                            'right': '1%',
                            'width': '100%'
                        });
                    }
                    if ($('.modal-contactdialog', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'left': '1%',
                            'right': '1%',
                            'bottom':'1%',
                            'top':'1%',
                            'width': '100%'
                        });
                    }
                    if ($('.modal-peoplecontactdialog', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'left': '1%',
                            'right': '1%',
                            'bottom':'1%',
                            'top':'1%',
                            'width': '100%'
                        });
                    }
                    window.scrollTo(0, 0);
                });
            }

            if (isiPhone) {
                modalWraper.on('loaded.bs3.modal', function(event) {
                    if ($('form', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'width': '98%'
                        });
                    }
                    if ($('.modal-rfpdialog', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'width': '100%'
                        });
                    }
                    if ($('.modal-contactdialog', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'width': '100%'
                        });
                    }
                    if ($('.modal-peoplecontactdialog', modalWraper).length) {
                        modalWraper.css({
                            'position': 'absolute',
                            'width': '100%'
                        });
                    }
                    window.scrollTo(0, 0);
                });
            }
        }
        if (window.kpmg.isMobile){

            $('body.modal-open').css({
                "overflow":"hidden",
                "width":"100%"
            });
        }
        /**
         * Handle open the modal object
         * @param {type} evt
         */
        function handleModalOpened(evt) {
            if (typeof window.kpmg.modalOpenerUrl === "undefined" || window.kpmg.modalOpenerUrl === null && $('.btn-modal', '.module-contactpromo').find($(evt.target))) {
                window.kpmg.modalOpenerUrl = $(evt.relatedTarget).data('modal-url');
            }
            var $invoker = $(evt.relatedTarget),
                mod = window.kpmg.modalOpenerUrl.substring(window.kpmg.modalOpenerUrl.lastIndexOf('/') + 1, window.kpmg.modalOpenerUrl.indexOf('.')),
                styleId = mod + '-styleSheet';

            /*
             * Injucting CSS related to component before component HTML loads into page
             * to avoid styling issue while rendering
             */

            if ($invoker.attr('id') === "rfp-process-modal") {
                evt.preventDefault();
                var lastvisitedURL = window.location.href,
                redirectURL,rfpPageUrl = $(evt.relatedTarget).data('remote');
                localStorage.setItem("lastvisitedURL", lastvisitedURL);
                redirectURL = window.location.origin + rfpPageUrl;
                window.location.href=encodeURI(redirectURL);
                //$('.modal-dialog', evt.target).addClass('modal-rfpdialog').removeClass('modal-contactdialog modal-peoplecontactdialog');
            }

            if ($invoker.attr('id') === "contact-form-modal") {
                $('.modal-dialog', evt.target).addClass('modal-contactdialog').removeClass('modal-rfpdialog modal-peoplecontactdialog');
            }
            /*The below code was added to add dynamic classes using class attr as the people contact form doesnt have a specific ID*/
            if ($invoker.hasClass("people-connect") === true) {
                $('.modal-dialog', evt.target).addClass('modal-peoplecontactdialog').removeClass('modal-rfpdialog modal-contactdialog');

            }

            if (!$('#' + styleId).length) {
                $('head').append('<link  id="' + styleId + '"  href="/etc/clientlibs/kpmgpublic/' + mod + '/css/' + mod + '.css' + ' "rel="stylesheet" media="all" type="text/css" />');
            }

        }



        /**
         * Handle reset the modal object
         * @param {type} evt
         */
        function handleModalClosed(evt) {
            var modalBox = $(evt.target);
            modalBox.removeData('bs3.modal').find(".modal-content").empty();
            window.kpmg.modalOpenerUrl = null;
            $('.modal-dialog', modalBox).removeClass('modal-rfpdialog');
            $("body").removeClass("modal-active");
        }
        /**
         * Handles loading all the javascript and CSS
         * for the component within the modal
         **/
        function handleRemoteModalLoaded() {
            if (window.kpmg.modalOpenerUrl) {
                var mod = window.kpmg.modalOpenerUrl.substring(window.kpmg.modalOpenerUrl.lastIndexOf('/') + 1, window.kpmg.modalOpenerUrl.indexOf('.')),
                    path = '/etc/clientlibs/kpmgpublic/' + mod;

                var comp = $('.module-'+ mod);

                require([path + '/js/' + mod + ".js"], function(module) {
                    module(comp, mod);
                }, function() {});
            }
        }

        function handleMediaQuery(mediaQuery) {
            if (window.matchMedia('print').matches !== true) {
                if (mediaQuery.matches) {
                    if (!$('body').hasClass('contents-reflowed')) {
                        //Unbind and remove promotional-cell-hover to handle elements reflow
                        $('.promotional-cell-hover').off('click');
                        $('.promotional-cell-hover').removeClass('promotional-cell-hover');
                    }
                    $(document).trigger('mobileBreakpoint');
                } else {
                    if ($('body').hasClass('contents-reflowed')) {
                        //Unbind and remove promotional-cell-hover to handle elements reflow
                        $('.promotional-cell-hover').off('click');
                        $('.promotional-cell-hover').removeClass('promotional-cell-hover');
                    }
                    $(document).trigger('desktopBreakpoint');
                }
                loadBreakpointImages(mediaQuery.matches);
                window.kpmg.isMobile = mediaQuery.matches;
                window.kpmg.isPhone = (/iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent) || (navigator.userAgent.indexOf('Android') > -1 && navigator.userAgent.indexOf('Mobile') > -1);
            }
        }

        function loadBreakpointImages(isMobile) {
            var timeout = (!isMobile) ? 100 : 300;
            setTimeout(function() {
                $('img.lazy').unveil();
            }, timeout);
        }
        $(function() {
            var kpmg = new Global();
            require(['global/js/vendor/plugins/gigya']);
            // the below line shold not be in master-cq branch
            // require(['global/js/utils']);
        });
        //Accessibility
        $("a, button, select, input[type=submit], input[type=text]").on("keyup", function(e) {
            var _this = $(this);
            if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                if (_this.hasClass("navigation-logo")) {
                    _this.removeAttr("tabindex").addClass("focusOutline-secondary");
                } else if (_this.is("a") && _this.find("img").length > 0 && !($(".module-alumnilinks").find(_this).length > 0)) {
                    _this.removeAttr("tabindex").find("img").addClass("focusOutline");
                } else if ($(this).parent("li").length > 0 && !($(".module-listing").find(_this).length > 0 || $(".module-trendinglist").find(_this).length > 0 || $(".module-publicationserieslist").find(_this).length > 0 || $(".module-inlinelist").find(_this).length > 0 || $(".module-subnavigation").find(_this).length > 0 /*||$(".nav-primary-menu-item").find(_this).length > 0*/ || $(".nav-secondary").find(_this).length > 0 || $(".sidr").find(_this).length > 0 || $(".socialchannel-links").find(_this).length > 0 || $(".module-navflyouta").find(_this).length > 0 || $(".module-navflyoutb").find(_this).length > 0 || $(".module-navflyoutc").find(_this).length > 0 || $(".module-anchorlinks").find(_this).length > 0)) {
                    _this.parent("li").removeAttr("tabindex").addClass("focusOutline");
                } else {
                    _this.removeAttr("tabindex").addClass("focusOutline");
                }
            }
        });
        $("a, button, select, input[type=submit], input[type=text]").on("blur", function() {
            var _this = $(this);
            if (_this.hasClass("navigation-logo")) {
                _this.removeClass("focusOutline-secondary");
            } else if (_this.is("a") && _this.find("img").length > 0 && !($(".module-alumnilinks").find(_this).length > 0)) {
                _this.find("img").removeClass("focusOutline");
            } else if (_this.parent("li").length > 0 && !($(".module-listing").find(_this).length > 0 || $(".module-trendinglist").find(_this).length > 0 || $(".module-publicationserieslist").find(_this).length > 0 || $(".module-inlinelist").find(_this).length > 0 || $(".module-subnavigation").find(_this).length > 0 /*||$(".nav-primary-menu-item").find(_this).length > 0*/ || $(".nav-secondary").find(_this).length > 0 || $(".sidr").find(_this).length > 0 || $(".socialchannel-links").find(_this).length > 0 || $(".module-navflyouta").find(_this).length > 0 || $(".module-navflyoutb").find(_this).length > 0 || $(".module-navflyoutc").find(_this).length > 0 || $(".module-anchorlinks").find(_this).length > 0)) {
                _this.parent("li").removeClass("focusOutline");
            } else {
                _this.removeClass("focusOutline");
            }
        });

        // Keep track of the previous URL
        window.addEventListener("beforeunload", function (event) {
            var currentUrl = encodeURIComponent(document.URL);
            if (!sessionStorage.getItem("prevUrl")) {
                sessionStorage.setItem("prevUrl", currentUrl);
            } else {
                var previousUrl = decodeURIComponent(sessionStorage.getItem("prevUrl"));
                if (decodeURIComponent(currentUrl) !== previousUrl) {
                    sessionStorage.setItem("prevUrl", currentUrl);
                }
            }
        });

    }

);
/*Responsivefix START*/
function bindEvent(ele, event, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(event, callback, false);
    } else {
        ele.attachEvent(event, callback);
    }
}

var setViewport = function() {
    // screen.width is necessary for meta tag initial scale
    var viewportWidth = screen.width,
        viewportElement = document.getElementById("kpmgViewport");

    if (viewportWidth > 640 && viewportWidth < 980) {
        if (viewportElement) {
            viewportElement.parentNode.removeChild(viewportElement);
        }
    } else {
        if (!viewportElement) {
            var meta = document.createElement('meta');
            meta.name = "viewport";
            meta.id = 'kpmgViewport';
            meta.content = "width=device-width, initial-scale=1.0, user-scalable=1.0";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    }
};
//
setViewport();
//
bindEvent(window, "orientationchange", function() {
    setViewport();
});

bindEvent(window, "resize", function() {
    setViewport();
});
/*Responsivefix js Ends*/

define('config', {
    clientlibs: '/etc/clientlibs/kpmgpublic/',
    partials: '/etc/partials/kpmgpublic/'
});