/* global s */
/* global isChrome*/
define(['jquery', 'clamp', 'modernizr', 'tracking', 'personalizationUtils', 'helpers', 'bootstrap'],
    function ($, $clamp, Modernizr, Tracking, personalizationUtils, Helpers) {
        'use strict';
        var Navigation = function (elem) {

            function iOSversion() {
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                    return parseInt(v[1], 10);
                }
            }
            // if (iOSversion() < 8) {
            //     $("input.search").on("focusin", function() {
            //         $(".global-navigation").css({
            //             "position": "absolute",
            //             "top": "0px",
            //             "left": "0px",
            //             "overflow": "hidden"
            //         });
            //         $(".module-herocarousel").hide();
            //         setTimeout(function() {
            //             $(".module-herocarousel").show();
            //         }, 2);
            //     });
            //     $("input.search").on("focusout", function() {
            //         $(".global-navigation").css({
            //             "position": "fixed",
            //             "top": "0px",
            //             "left": "0px"
            //         });
            //         $(".module-herocarousel").show();
            //     });
            // }

            function bindEvent(ele, event, callback) {
                if (ele.addEventListener) {
                    ele.addEventListener(event, callback, false);
                } else {
                    ele.attachEvent(event, callback);
                }
            }

            if ($(window).width() > 641) {
                $(".nav-primary-menu-item", elem).each(function () {
                    var _this = $(this);
                    _this.css('width', _this.width() + 12);
                });
            }

            resetNavigation();

            function setNavVisible(mainContainer) {
                var primaryMenu = $(".nav-primary-menu"),
                    navHeight = $('.global-nav').outerHeight();
                if (primaryMenu.height() > 35) {
                    primaryMenu.addClass("full-width");
                    if ($(".module-tmpl-home").length === 0 && !window.kpmgPersonalize.misc.isAuthor) {
                        mainContainer.css("padding-top", navHeight);
                    }
                }
                if ($(".nav-primary-menu").height() <= 35) {
                    if (!((window.matchMedia("all and (max-width: 641px)")).matches)) {
                        if ($(".module-tmpl-home").length === 0 && !window.kpmgPersonalize.misc.isAuthor) {
                            mainContainer.css("padding-top", navHeight);
                        }
                        primaryMenu.removeClass("full-width").addClass("full-width-center");
                    }
                } else {
                    primaryMenu.removeClass("full-width-center").addClass("full-width");
                }
                var getLang = $('html').attr('lang');
                if (getLang === 'ko-KR' || getLang === 'ja-JP' || getLang === 'zh-CN' || getLang === 'zh-TW') {
                    if (primaryMenu.height() > 37) {
                        primaryMenu.addClass("full-width");
                        if ($(".module-tmpl-home").length === 0 && !window.kpmgPersonalize.misc.isAuthor) {
                            mainContainer.css("padding-top", navHeight);
                        }
                    }
                    if ($(".nav-primary-menu").height() <= 37) {
                        if (!((window.matchMedia("all and (max-width: 641px)")).matches)) {
                            if ($(".module-tmpl-home").length === 0 && !window.kpmgPersonalize.misc.isAuthor) {
                                mainContainer.css("padding-top", navHeight);
                            }
                            primaryMenu.removeClass("full-width").addClass("full-width-center");
                        }
                    } else {
                        primaryMenu.removeClass("full-width-center").addClass("full-width");
                    }
                }
            }

            function resetNavigation() {
                var globalNav = $(".global-navigation"),
                    mainContainer = globalNav.next(),
                    primaryMenu = $(".nav-primary-menu"),
                    isiPad = navigator.userAgent.match(/iPad/i) !== null,
                    isiPhone = navigator.userAgent.match(/iPhone/i) !== null,
                    isAndriod = navigator.userAgent.match(/Android/i) !== null,
                    viewportWidth = $(window).width();

                if (!isiPad && !isiPhone && !isAndriod) {
                    if (viewportWidth > 641 && viewportWidth < 979) {
                        globalNav.css('position', 'absolute');
                    } else {
                        globalNav.css('position', 'fixed');
                    }
                }

                if (!isiPad || !isiPhone) {
                    bindEvent(window, "resize", function () {
                        primaryMenu.removeClass("full-width");
                        if ((window.matchMedia("all and (max-width: 641px)")).matches) {
                            mainContainer.css("padding-top", 0);
                        } else {
                            setNavVisible(mainContainer);
                        }
                    });
                }
                if ($(window).width() > 980 && !isiPad) {
                    $(".global-nav").css("box-shadow", "0 0 16px #dedede");
                }
                setNavVisible(mainContainer);
            }

            var bp = window.matchMedia("all and (max-width: 641px)"),
                isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
                isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
            var $quickLangOverlay = $('.module-quickselectoroverlay', elem),
                $kpmgmenuOverlay = $('.module-mykpmgflyout', elem),
                $toggleNav = $('#toggle-nav', elem),
                $nav = $('.global-nav', elem),
                $flyout = $('.sidr', elem),
                $animateSpeed = 300,
                $body = $('body'),
                $navPrimaryLinks = $('.nav-primary > ul > li', elem),
                $isTouch = Modernizr.touch,
                $wrapper = $(".wrapper", elem);

            $(document).on('focus', '.nav-primary-menu-item.kpmg-menu', function (evt) {
                $kpmgmenuOverlay.show();
            });

            function clampNav() {
                var sampleFontSize = 16;

                var $clampHead = $('.module-navflyoutb .navflyoutb-list,.module-navflyouta .navflyouta-list,.module-navflyoutc .navflyoutc-list,.module-navflyoutb .navflyoutb-uppercase,.module-navflyouta .navflyouta-uppercase,.module-navflyoutc .navflyoutc-uppercase');
                $clampHead.each(function (elem, element) {

                    if (!$(this).hasClass("is-truncated")) {
                        $(this).attr('style', '');
                        $(this).dotdotdot({
                            ellipsis: '...',
                            height: sampleFontSize * 4,
                            wrap: 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    }
                });

            }
            //$(".mobile-nav-toggle").addClass("kpmg-blue");
            //Opens desktop flyout - Desktop Hover
            $navPrimaryLinks.on('mouseenter', function () {
                var _this = $(this);
                if (!$isTouch) {
                    _this.removeClass("navigation-normal");
                    _this.addClass("navigation-bold");
                    /*$wrapper.css("min-height", "700px");*/

                    $('.flyout', _this).slideDown(100, function () {
                        $('.flyout img').trigger('unveil');
                    });
                    clampNav();
                    /*$(".global-nav").css("box-shadow", "none");*/
                    _this.find('.flyout').css({
                        "visibility": "visible",
                        "transition": "0s"
                    });
                }

            }).on('mouseleave', function () {
                var _this = $(this);
                _this.removeClass("navigation-bold");
                _this.addClass("navigation-normal");
                _this.find('.flyout').css({
                    "visibility": "hidden",
                    "transition": "0.2s 0.3s"
                });

                /*$wrapper.css("min-height", "117px");*/
                /*$(".global-nav").css("box-shadow", "0 0 16px #dedede");*/
            });

            $navPrimaryLinks.on('focusin', function () {
                var _this = $(this);
                if (!$isTouch) {
                    _this.removeClass("navigation-normal");
                    _this.addClass("navigation-bold");
                    /*$wrapper.css("min-height", "700px");*/
                    $('.flyout', _this).slideDown(100, function () {
                        $('.flyout img').trigger('unveil');
                    });
                    clampNav();
                    $(this).prev(".nav-primary-menu-item").find(".flyout").hide();
                    $(this).next(".nav-primary-menu-item").find(".flyout").hide();
                }
                /*$(".global-nav").css("box-shadow", "none");*/
            }).on('focusout',function () {
                var _this = $(this);
                if (!$isTouch) {
                    _this.removeClass("navigation-bold");
                    _this.addClass("navigation-normal");
                    $wrapper.css("min-height", "117px");
                }
                /*$(".global-nav").css("box-shadow", "0 0 16px #dedede");*/
            });

            $navPrimaryLinks.on('click', function (e) {
                var _this = $(this);
                if ($isTouch && $('.flyout').has($(e.target)).length === 0 && $('.flyout', _this).length > 0 && !_this.hasClass('navigation-bold')) {
                    e.preventDefault();
                    if (!_this.hasClass("navigation-bold")) {
                        _this.removeClass("navigation-normal");
                        _this.addClass("navigation-bold");
                        $('.flyout', _this).slideDown(100, function () {
                            $('.flyout img').trigger('unveil');
                        });
                        $('.module-mykpmgflyout', _this).slideDown(100, function () {
                            $('.module-mykpmgflyout img').trigger('unveil');
                        });
                        clampNav();
                        $navPrimaryLinks.each(function () {
                            var _this = $(this);
                            if (!(_this.is($(e.target)) || _this.has($(e.target)).length !== 0)) {
                                _this.removeClass("navigation-bold");
                                _this.addClass("navigation-normal");
                                $('.flyout', _this).hide();
                                $('.module-mykpmgflyout', _this).hide();
                            }
                        });
                    }
                } else {
                    return true;
                }
            });

            // Cliking on the language selector option will toggle the overlay
            // Clicking elsewhere on the page will hide the overlay
            $(document).on('click', function (e) {
                var utilitylang = $('.utility-lang');
                utilitylang.find("span a").removeClass("icon-chevron-up").addClass("icon-chevron-down");
                if ((utilitylang.is(e.target) || utilitylang.has(e.target).length !== 0) || ($('.mobile-utility-toggle').is(e.target) || utilitylang.has(e.target).length !== 0)) {
                    if (!utilitylang.hasClass('quickLangOverlayActive')) {
                        $quickLangOverlay.show();
                        //$(".mobile-utility-toggle").removeClass("kpmg-blue").addClass("light-blue");
                        utilitylang.find("span a").removeClass("icon-chevron-down").addClass("icon-chevron-up");
                        $wrapper.css("min-height", "950px");
                        utilitylang.addClass('quickLangOverlayActive');
                    } else {
                        $quickLangOverlay.hide();
                        //$(".mobile-utility-toggle").removeClass("light-blue").addClass("kpmg-blue");
                        utilitylang.find("span a").removeClass("icon-chevron-up").addClass("icon-chevron-down");
                        $wrapper.css("min-height", "117px");
                        utilitylang.removeClass('quickLangOverlayActive');
                    }
                    if (!$navPrimaryLinks.is(e.target) && $navPrimaryLinks.has(e.target).length === 0) {
                        $navPrimaryLinks.removeClass("navigation-bold");
                        $navPrimaryLinks.addClass("navigation-normal");
                        $navPrimaryLinks.find('.flyout').hide();
                    }

                }
            });
            // Cliking on the KPMG selector option will toggle the MENU
            // Clicking elsewhere on the page will hide the MENU
            function dialogActions(e) {
                var kpmgmenu = $('.kpmg-menu'),
                    closeDialog = $('.module-mykpmgflyout .close-dialog');

                kpmgmenu.find("span a.icon-chevron-up").removeClass("icon-chevron-up").addClass("icon-chevron-down");
                if ((kpmgmenu.is(e.target) || kpmgmenu.has(e.target).length !== 0)) {
                    $('.module-mykpmgflyout').slideDown(100, function () {
                        $('.module-mykpmgflyout img').trigger('unveil');
                    });
                    if (!kpmgmenu.hasClass('kpmgmenuOverlayActive')) {
                        $('.module-mykpmgflyout').show();
                        $(".mobile-mykpmgflyout-toggle").removeClass("kpmg-blue").addClass("light-blue");
                        kpmgmenu.find(".icon-chevron-down").removeClass("icon-chevron-down").addClass("icon-chevron-up");
                        kpmgmenu.addClass('kpmgmenuOverlayActive');
                        kpmgmenu.removeClass("navigation-normal").addClass('navigation-bold');
                        $wrapper.css("min-height", "950px");
                        $(".mobile-mykpmgflyout-toggle").addClass('kpmgmenuOverlayActive');
                    } else {
                        $('.module-mykpmgflyout').hide();
                        $(".mobile-mykpmgflyout-toggle").removeClass("light-blue").addClass("kpmg-blue");
                        kpmgmenu.find(".icon-chevron-up").removeClass("icon-chevron-up").addClass("icon-chevron-down");
                        kpmgmenu.removeClass('kpmgmenuOverlayActive');
                        kpmgmenu.removeClass("navigation-bold").addClass('navigation-normal');
                        $wrapper.css("min-height", "117px");
                        $(".mobile-mykpmgflyout-toggle").removeClass('kpmgmenuOverlayActive');
                    }
                    $(closeDialog).on('blur', function () {
                        $('.module-mykpmgflyout').hide();
                        kpmgmenu.find(".icon-chevron-up").removeClass("icon-chevron-up").addClass("icon-chevron-down");
                    });
                }
            }
            $(document).on('click', function (e) {
                dialogActions(e);
            });
            $(document).on('keydown', function (e) {
                if (e.which === 13) {
                    dialogActions(e);
                }
            });
            $(document).on('click focus', function (e) {
                var windowWidth = $(window).width();
                var utilitylang = $('.utility-lang'),
                    utilitylangmobile = $('.mobile-utility-toggle');
                var linkoo = $('.utility-lang a');
                var target = $(e.target);
                var kpmgmenu = $('.kpmg-menu');
                var flyoutmobile = $('.mobile-mykpmgflyout-toggle');
                if (windowWidth > 641) {
                    if (!target.is(linkoo)) {
                        $quickLangOverlay.hide();
                        $(".mobile-utility-toggle").removeClass("light-blue").addClass("kpmg-blue");
                        //utilitylang.find("span a").removeClass("icon-chevron-up").addClass("icon-chevron-down");

                        //$wrapper.css("min-height", "117px");
                        $('.utility-lang').removeClass('quickLangOverlayActive');
                    }
                    if (!(kpmgmenu.is(e.target) || kpmgmenu.has(e.target).length !== 0)) {
                        $kpmgmenuOverlay.hide();
                        $wrapper.css("min-height", "117px");
                        $(".mobile-utility-toggle").removeClass("kpmg-blue").addClass("light-blue");
                        $('.kpmg-menu').removeClass('kpmgmenuOverlayActive');
                        kpmgmenu.find(".icon-chevron-up").removeClass("icon-chevron-up").addClass("icon-chevron-down");
                    }

                    if ($navPrimaryLinks.hasClass('navigation-bold')) {
                        $wrapper.css('min-height', '950px');
                    }
                } else {
                    if (utilitylang.hasClass('quickLangOverlayActive')) {
                        if (!(target.is(utilitylangmobile))) {
                            $quickLangOverlay.hide();
                            $(".mobile-utility-toggle").removeClass("light-blue").addClass("kpmg-blue");
                            $('.utility-lang').removeClass('quickLangOverlayActive');
                        }
                    }

                    if ($('.mobile-mykpmgflyout-toggle').hasClass('kpmgmenuOverlayActive')) {
                        if ($(".mobile-mykpmgflyout").has(e.target).length !== 0) {
                            $kpmgmenuOverlay.show();
                            $(".mobile-mykpmgflyout-toggle").removeClass("kpmg-blue").addClass("light-blue");
                            $('.mobile-mykpmgflyout-toggle').addClass('kpmgmenuOverlayActive');
                        } else if (!(target.is(flyoutmobile))) {
                            $kpmgmenuOverlay.hide();
                            $(".mobile-mykpmgflyout-toggle").removeClass("light-blue").addClass("kpmg-blue");
                            $('.mobile-mykpmgflyout-toggle').removeClass('kpmgmenuOverlayActive');
                        }
                    }
                    $wrapper.removeAttr('style');
                }
            });

            $wrapper.on('click', function (e) {
                if ($navPrimaryLinks.hasClass('navigation-bold') && (!($navPrimaryLinks.is(e.target) || $navPrimaryLinks.has(e.target).length !== 0))) {
                    $navPrimaryLinks.find('.flyout').hide();
                }
            });

            $('.utility-contact a', elem).on('focusin', function () {
                $quickLangOverlay.hide();
                $wrapper.css("min-height", "117px");
                $(this).removeClass('quickLangOverlayActive');
            });
            
            $('.nav-secondary a', elem).on('focusin', function () {
                $quickLangOverlay.hide();
                $wrapper.css("min-height", "117px");
                $(this).removeClass('quickLangOverlayActive');
            });
            
            setupAccessibilityForMyKpmgNav();
            
            function setupAccessibilityForMyKpmgNav() {
                var $myKpmgFlyout = $('.module-mykpmgflyout.component');
                var $kpmgMenuTrigger = $('li.nav-primary-menu-item.kpmg-menu');
                $kpmgMenuTrigger.on('focus' ,function(){
                    $myKpmgFlyout.show();
                    $myKpmgFlyout.find('img').unveil();
                    $(this)
                        .find('.icon-chevron-up, .icon-chevron-down')               
                        .removeClass('icon-chevron-down')
                        .addClass('icon-chevron-up');
                });

                $kpmgMenuTrigger.on('click', function(){
                    $(this).trigger('blur');
                });

                $kpmgMenuTrigger.on('focusout' ,function(evt){
                    var isRelatedTargetInCurrentTarget;
                    //
                    isRelatedTargetInCurrentTarget = $(evt.currentTarget).find(evt.relatedTarget).length;
                    //
                    if (!isRelatedTargetInCurrentTarget) {
                        $myKpmgFlyout.hide();
                        $(this)
                            .find('.icon-chevron-up, .icon-chevron-down')
                            .removeClass('icon-chevron-up')
                            .addClass('icon-chevron-down');
                    }
                });
            }
            
            
            $toggleNav.on("click", function (d) {
                d.preventDefault();
                if (!$body.hasClass('nav-open')) {
                    $(".template > .container").removeClass("nav-body-slide-out");
                    $(".global-footer").removeClass("nav-body-slide-out");
                    $(".template > .container").addClass("nav-body-slide-in");
                    $(".template > .container").css("display", "none");
                    $(".global-footer").addClass("nav-body-slide-in");
                    $(".global-footer").css("display", "none");
                    $(".global-nav").removeClass("nav-body-slide-out").addClass("nav-body-slide-in");
                    $nav.animate({
                        width: '100vw'
                    }, $animateSpeed, function () {
                        $body.addClass('nav-open');
                        $(".global-nav .mobile-nav-toggle").removeClass("icon-list-view").addClass("icon-close");
                        $(".global-nav .mobile-nav-toggle").removeClass("light-blue").removeClass("kpmg-blue").addClass("light-purple");
                    });
                    $flyout.animate({
                        left: '0px'
                    }, $animateSpeed);
                }
            });
            //Navigation Slider Hide
            $(document).on('click', function (e) {
                var $currentEle = $(e.target);
                if ($body.hasClass('nav-open') && !$currentEle.hasClass('ui-menu-item')) {
                    hideSlider();
                }
            });
            bindEvent(window, "touchstart", function (evt) {
                var $currentEle = $(evt.target);
                if ($body.hasClass('nav-open') && $('#sidr').has(evt.target).length === 0 && !$currentEle.hasClass('ui-menu-item')) {
                    hideSlider();
                }
            });

            function hideSlider() {
                $(".template > .container").removeClass("nav-body-slide-in");
                $(".global-footer").removeClass("nav-body-slide-in");
                $(".template > .container").addClass("nav-body-slide-out");
                $(".template > .container").css("display", "block");
                $(".global-footer").addClass("nav-body-slide-out");
                $(".global-footer").css("display", "block");
                $(".global-nav").removeClass("nav-body-slide-in").addClass("nav-body-slide-out");
                //$(".mobile-nav-toggle").removeClass("light-blue").addClass("kpmg-blue");
                $(".global-nav .mobile-nav-toggle").removeClass("icon-close").addClass("icon-list-view");
                $(".global-nav .mobile-nav-toggle").removeClass("light-purple").addClass("kpmg-blue");

                $nav.animate({
                    left: '0px'
                }, $animateSpeed, function () {
                    $body.removeClass('nav-open');
                });
                $flyout.animate({
                    left: '-999px'
                }, $animateSpeed);
            }

            $flyout.on('click', function (e) {
                e.stopPropagation();
            });
            $(".mobile-utility-toggle-search", elem).on('click', function () {
                $(".mobile-search-form").show();
                $(".mobile-lang, .mobile-search, .icon-list-view, .navigation-logo").hide();
            });
            $(".mobile-search-form a", elem).on('click', function () {
                $(".mobile-search-form").hide();
                $(".mobile-lang, .mobile-search, .icon-list-view, .navigation-logo").show();
                $(".navigation-logo").css("background-image", 'url(' + $(".navigation-logo").data("logo") + ')');
            });

            function handleMobileBreakpoint() {
                var windowWidth = $(window).width();
                if (windowWidth > 641) {

                    if (!$nav.hasClass('desktopNav')) {
                        $nav.addClass('desktopNav');
                        $(".template > .container, .global-footer").addClass('desktopNav');
                    }
                    if ($('#sidr').css("left") === "0px") {
                        $(".template > .container, .global-footer").removeClass("nav-body-slide-in");
                        $(".template > .container, .global-footer").addClass("nav-body-slide-out");
                        $(".template > .container, .global-footer").css("display", "block");
                    }
                } else {
                    $('.desktopNav').removeClass('desktopNav');
                    if ($('#sidr').css("left") === "0px") {
                        $(".template > .container, .global-footer").removeClass("nav-body-slide-out");
                        $(".template > .container, .global-footer").addClass("nav-body-slide-in");
                        $(".template > .container, .global-footer").css("display", "none");
                    }
                    if ($('#sidr').css("left") === "-999px") {
                        $(".template > .container, .global-footer").removeClass("nav-body-slide-in");
                        $(".template > .container, .global-footer").addClass("nav-body-slide-out");
                        $(".template > .container, .global-footer").css("display", "block");
                    }
                }

                var globalNav = $(".global-navigation"),
                    isiPad = navigator.userAgent.match(/iPad/i) !== null,
                    isiPhone = navigator.userAgent.match(/iPhone/i) !== null,
                    isAndriod = navigator.userAgent.match(/Android/i) !== null;

                if (!isiPad && !isiPhone && !isAndriod) {
                    if (windowWidth > 641 && windowWidth < 979) {
                        globalNav.css('position', 'absolute');
                    } else {
                        globalNav.css('position', 'fixed');
                    }
                }
            }
            handleMobileBreakpoint();
            bindEvent(window, "orientationchange", function () {
                handleMobileBreakpoint();
            });

            bindEvent(window, "resize", function () {
                handleMobileBreakpoint();
            });


            //Mobile menu quick header Tab set for Personalization
            if (window.kpmgPersonalize.isSitePersonalize === true) {
                $('#sidr').find('ul.list-quick-selctor .quickselector-second-section').remove();
                $('#sidr').find('ul.list-quick-selctor .quickselector-first-section').css('display', 'block');
            } else {
                $('#sidr').find('ul.list-quick-selctor .quickselector-first-section').remove();
                $('#sidr').find('ul.list-quick-selctor .quickselector-second-section').css('display', 'block');
            }

            //Mobile quick header personlization Icon check for user loggedin
            if (personalizationUtils.accountUtils.isLoggedIn() === true) {
                $('#sidr').find('.list-quick-selctor .mob-menu-mykpmg p').removeClass('icon-user').addClass('icon-person1');
                $('#sidr').find('.list-quick-selctor .mob-menu-mykpmg p').css('color', '#00338d');
                $("#sidr").find('.mob-menu-mykpmg .icon-person1').css({
                    "color": "#00338d",
                    "font-size": "40px",
                    "text-align": "center"
                });

            } else {
                $('#sidr').find('.list-quick-selctor .mob-menu-mykpmg p').removeClass('icon-person1').addClass('icon-user');
            }
            //Mobile Menu Drop Down
            $(".mob-menu-list .menu-dropdown").on("click", function () {
                if ($(this).find('.chevron-dropdown').hasClass('icon-chevron-down')) {
                    $(this).find('.chevron-dropdown').removeClass("icon-chevron-down").addClass("icon-chevron-up");
                    $(this).parent().parent().find('.dropdown-secodary-menu').removeClass('dropdown-hidden').slideDown();
                    //.parent("li.mob-menu-list")
                } else {
                    $(this).find('.chevron-dropdown').removeClass("icon-chevron-up").addClass("icon-chevron-down");
                    $(this).parent().parent().find('.dropdown-secodary-menu').slideUp();
                }
            });
            //Mobile drop down for Location
            $("#mob-slid-location").on("click", function () {
                if ($(this).parent().parent().parent().find('.mob-list-location').hasClass('location-list-down')) {
                    $(this).css("color", "#dfdfdf");
                    $(this).parent().css("border-bottom", "6px solid #dfdfdf");
                    $(this).parent().parent().parent().find('.mob-list-location').removeClass('location-list-down').addClass('location-list-up').slideUp();
                    $("#sidr ul.list-quick-selctor").removeClass("quick-nav-open");
                    closeOpacity();
                } else {
                    $("#sidr .mob-list-location").css("z-index", "950");
                    closeSearchFlyout();
                    closeMykpmgNavFlyout();
                    $(this).css("color", "#00338d");
                    $(this).parent().css("border-bottom", "0px");
                    $('#sidr').find('.mob-list-location ul').css("border-top", "1px solid #ffffff");
                    $(this).parent().parent().parent().find('.mob-list-location').removeClass('location-list-up').addClass('location-list-down').slideDown();
                    $("#sidr ul.list-quick-selctor").addClass("quick-nav-open");

                    openOpacity();
                }
            });

            function closeLocationFlyout() {
                $("#sidr .mob-list-location").css("z-index", "902");
                $("#mob-slid-location").css("color", "#dfdfdf");
                $("#sidr .list-quick-selctor").find('.mob-menu-location ').css("border-bottom", "6px solid #dfdfdf");
                $("#sidr .list-quick-selctor").find('.mob-list-location').removeClass('location-list-down').addClass('location-list-up').slideUp();
                $("#sidr ul.list-quick-selctor").removeClass("quick-nav-open");
                closeOpacity();
            }

            function closeSearchFlyout() {
                $("#sidr .mob-list-search").css("z-index", "901");
                $("#mob-slid-search").css("color", "#dfdfdf");
                $("#sidr .list-quick-selctor").find('.mob-menu-search ').css("border-bottom", "6px solid #dfdfdf");
                $("#sidr .list-quick-selctor").find('.mob-list-search').removeClass('search-list-down').addClass('search-list-up').slideUp();
                $("#sidr .list-quick-selctor").find('.mob-list-search hr').css("display", "none");
                $("#sidr ul.list-quick-selctor").removeClass("quick-nav-open");
                closeOpacity();
            }

            function closeMykpmgNavFlyout() {
                $("#sidr .mob-list-mykpmg").css("z-index", "903");
                $("#sidr").find('.mob-menu-mykpmg .icon-user').css("color", "#dfdfdf");
                $("#sidr .list-quick-selctor").find('.mob-menu-mykpmg ').css("border-bottom", "6px solid #dfdfdf");
                $("#sidr .list-quick-selctor").find('.mob-list-mykpmg').removeClass('mykpmg-list-down').addClass('mykpmg-list-up').slideUp();
                $("#sidr .list-quick-selctor").find('.mob-list-mykpmg hr').css("display", "none");
                $("#sidr ul.list-quick-selctor").removeClass("quick-nav-open");
                closeOpacity();
            }


            //Mobile drop down mobile location close
            $("#close-quickselector-btn", $flyout).on("click", closeLocationFlyout);
            //Mobile drop down mobile search close
            $("#close-searchinput-btn", $flyout).on("click", closeSearchFlyout);
            //Mobile drop down mobile mykpmg close
            $("#close-mykpmg-btn", $flyout).on("click", closeMykpmgNavFlyout);


            //Mobile Drop Down for search
            $("#mob-slid-search").on("click", function () {
                if ($(this).parent().parent().parent().find('.mob-list-search').hasClass('search-list-down')) {
                    $(this).css("color", "#dfdfdf");
                    $(this).parent().css("border-bottom", "6px solid #dfdfdf");
                    $('#sidr').find('.mob-list-search').removeClass('search-list-down').addClass('search-list-up').slideUp();
                    $("#sidr .list-quick-selctor").find('.mob-list-search hr').css("display", "none");
                    $("#sidr ul.list-quick-selctor").removeClass("quick-nav-open");
                    closeOpacity();
                } else {
                    $("#sidr .mob-list-search").css("z-index", "951");
                    closeLocationFlyout();
                    closeMykpmgNavFlyout();
                    $(this).css("color", "#00338d");
                    $(this).parent().css("border-bottom", "0px");
                    $('#sidr').find('.mob-list-search ul').css("border-top", "1px solid #ffffff");
                    $(this).parent().parent().parent().find('.mob-list-search').removeClass('search-list-up').addClass('search-list-down').slideDown();
                    $("#sidr .list-quick-selctor").find('.mob-list-search hr').css("display", "block");
                    $("#sidr ul.list-quick-selctor").addClass("quick-nav-open");
                    openOpacity();
                }
            });
            //Mobile drop down for myKpmg
            $("#mob-slid-mykpmg").on("click", function () {
                if ($(this).parent().parent().parent().find('.mob-list-mykpmg').hasClass('mykpmg-list-down')) {
                    $("#sidr").find('.mob-menu-mykpmg .icon-user').css("color", "#dfdfdf");
                    $(this).parent().css("border-bottom", "6px solid #dfdfdf");
                    $(this).parent().parent().parent().find('.mob-list-mykpmg').removeClass('mykpmg-list-down').addClass('mykpmg-list-up').slideUp();
                    $("#sidr .list-quick-selctor").find('.mob-list-mykpmg hr').css("display", "none");
                    $("#sidr ul.list-quick-selctor").removeClass("quick-nav-open");
                    closeOpacity();
                } else {
                    $("#sidr .mob-list-mykpmg").css("z-index", "952");
                    closeLocationFlyout();
                    closeSearchFlyout();
                    $(this).css("color", "#00338d");
                    $(this).parent().css("border-bottom", "0px");
                    $('#sidr').find('.mob-list-mykpmg ul').css("border-top", "1px solid #ffffff");
                    $(this).parent().parent().parent().find('.mob-list-mykpmg').removeClass('mykpmg-list-up').addClass('mykpmg-list-down').slideDown();
                    $("#sidr .list-quick-selctor").find('.mob-list-mykpmg hr').css("display", "block");
                    $("#sidr ul.list-quick-selctor").addClass("quick-nav-open");
                    openOpacity();
                }
            });

            //Highlight the current Tab
            var pageURL = window.location.pathname,
                urlArrayValue = pageURL.split("/");
            // Highlight Second level menu in the Mobile
            $('#sidr ul.menu-selector li ul.mob-secondary-menu li').each(function () {
                var tempUrl = $(this).find('a').attr('href') || "",
                    tempUrlArray = tempUrl.split("/");
                if (urlArrayValue[urlArrayValue.length - 1] === tempUrlArray[tempUrlArray.length - 1] && !$(this).find('a').hasClass("highlight-all") && urlArrayValue[urlArrayValue.length - 1] !== "") {
                    $(this).addClass('tab-highlight');
                    $("#sidr .menu-selector").addClass('menuHighlighted');
                }
            });

            // Highlight First level menu in the Mobile
            if (!$("#sidr .menu-selector").hasClass("menuHighlighted")) {
                $('#sidr ul.menu-selector li').each(function () {
                    var tempUrl = $(this).find('a.mobPrimaryMenu').attr('href') || "",
                        tempUrlArray = tempUrl.split("/");
                    if (urlArrayValue[urlArrayValue.length - 1] === tempUrlArray[tempUrlArray.length - 1] && urlArrayValue[urlArrayValue.length - 1] !== "") {
                        if ($(this).hasClass("mob-menu-list")) {
                            $(this).find('.menu-heading').addClass('tab-highlight');
                        } else {
                            $(this).addClass('tab-highlight');
                        }
                        $("#sidr .menu-selector").addClass('menuHighlighted');
                    }
                });
            }

            // Highlight for the BreadCrum
            if (!$("#sidr .menu-selector").hasClass("menuHighlighted")) {
                var breadcrumbURL = $('ul#breadCrumbNav').find('li').eq(1).find('a').attr('href') || "";
                if (breadcrumbURL !== "") {
                    var breadcrumbUrlArrayValue = breadcrumbURL.split("/");
                    $('#sidr ul.menu-selector li').each(function () {
                        var tempUrl = $(this).find('a.mobPrimaryMenu').attr('href') || "",
                            tempUrlArray = tempUrl.split("/");
                        if (breadcrumbUrlArrayValue[breadcrumbUrlArrayValue.length - 1] === tempUrlArray[tempUrlArray.length - 1] && urlArrayValue[urlArrayValue.length - 1] !== "") {
                            if ($(this).hasClass("mob-menu-list")) {
                                $(this).find('.menu-heading').addClass('tab-highlight');
                            } else {
                                $(this).addClass('tab-highlight');
                            }
                            $("#sidr .menu-selector").addClass('menuHighlighted');
                        }
                    });
                }
            }

            //Background Menu disabled
            function openOpacity() {
                $("#sidr ul.menu-selector").addClass("menu-shaded");
                $('.menu-selector').css('opacity', '0.5');
            }

            function closeOpacity() {
                $("#sidr ul.menu-selector").removeClass("menu-shaded");
                $('.menu-selector').removeAttr('style');
            }
            //On Click Anchor link disaple if Quick Header Opened
            $("#sidr .menu-selector a").on("click", function (e) {
                if ($('#sidr .list-quick-selctor').hasClass('quick-nav-open')) {
                    e.preventDefault();
                    return;
                }
            });
            //Auto Menu Expand for the Tab if it is selectedValue
            function autoExpandMenutTab() {
                $(".mob-secondary-menu .navflyoutb-group-item").each(function () {
                    if ($(this).hasClass('tab-highlight')) {
                        $(this).parent().parent().parent().parent().find('.dropdown-secodary-menu').css({
                            "display": "block"
                        });
                        $(this).parent().parent().parent().parent().find('.chevron-dropdown').removeClass("icon-chevron-down").addClass("icon-chevron-up");
                    }
                });
                $(".mob-secondary-menu .navflyouta-group-item").each(function () {
                    if ($(this).hasClass('tab-highlight')) {
                        $(this).parent().parent().parent().parent().find('.dropdown-secodary-menu').css({
                            "display": "block"
                        });
                        $(this).parent().parent().parent().parent().find('.chevron-dropdown').removeClass("icon-chevron-down").addClass("icon-chevron-up");
                    }
                });
                $(".mob-secondary-menu .navflyoutc-group-item").each(function () {
                    if ($(this).hasClass('tab-highlight')) {
                        $(this).parent().parent().parent().parent().find('.dropdown-secodary-menu').css({
                            "display": "block"
                        });
                        $(this).parent().parent().parent().parent().find('.chevron-dropdown').removeClass("icon-chevron-down").addClass("icon-chevron-up");
                    }
                });
            }
            autoExpandMenutTab();
            //Accessibility
            $(".skip-nav", elem).on("click", function () {
                $("#page-content").attr("tabindex", "-1").trigger('focus');
            }).on("focus", function () {
                $(".module-footer .desktop-only li, .socialchannel-links > li").last().removeAttr("tabindex").removeClass("focusOutline");
            });
            $(".nav-utility .contact-modal", elem).on('keydown', function (e) {
                if (e.which === 13) {
                    $(this).trigger("click");
                }
            });

            /*var lastSecNavItem = $(".nav-secondary li").not(".utility-contact").last().find("a"),
                contactLink = $(".utility-contact", elem);
            //if (contactLink.find("a").length === 0) {
            lastSecNavItem.on('keydown', function(e) {
                e.preventDefault();
                $(this).parent("li").removeClass("focusOutline").find("a").removeAttr("tabindex");
                if (e.shiftKey && e.which === 9) {
                    $(this).parent("li").prev("li").addClass("focusOutline").find("a").trigger('focus');
                } else if (e.which === 9) {
                    contactLink.addClass("focusOutline").attr("tabindex", "-1").trigger('focus');
                }
            });
            contactLink.on('keydown', function(e) {
                e.preventDefault();
                $(this).removeAttr("tabindex");
                if (e.which === 13) {
                    $(this).trigger("click");
                } else if (e.which === 9) {
                    $(this).removeClass("focusOutline");
                    $(".search", elem).first().addClass("focusOutline").trigger('focus');
                } else if (e.shiftKey && e.which === 9) {
                    $(this).removeClass("focusOutline");
                    lastSecNavItem.parent("li").addClass("focusOutline").trigger('focus');
                }
            });


            //} */

            $(".nav-utility .contact-modal", elem).on('focus', function (e) {
                $(this).addClass('focusOutline');
            });

            $(".nav-utility .contact-modal", elem).on('blur', function (e) {
                $(this).removeClass('focusOutline');
            });
            $(".nav-primary-menu>li:last").on('keydown', function (e) {
                if (e.shiftKey && e.which === 9) {
                    $(this).removeClass("focusOutline");
                }
            });
            $(".nav-primary").find("a:first").on('keydown', function (e) {
                if (e.shiftKey && e.which === 9) {
                    $(".flyout").hide();
                }
            });
            $("#sidr").find("a").on("click", function (evt) {
                var regex = /(<([^>]+)>)/ig,
                    analyticsLog = "navigation" + '_' + $(evt.currentTarget).html().toLowerCase().replace(regex, "");
                Helpers.triggerTracking({
                    'linkLocationID1': analyticsLog,
                    'linkLocationID2': analyticsLog,
                    'linkLocation1': "navigation",
                    'linkLocation2': "navigation",
                    'events': 'event11'
                }, 'Internal Link');
            });

            var trck = new Tracking($('.global-nav'), 'Navigation');
            $(document).trigger('template.loaded');
        };
        return Navigation;
    });
