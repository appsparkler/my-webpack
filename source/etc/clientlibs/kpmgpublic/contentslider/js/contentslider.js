/* global s */
define(['jquery', 'tracking', 'helpers', 'jquerysly', 'jqueryeasing'],
        function ($, Tracking, Helpers) {
            'use strict';
            var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
            var is_safari = navigator.userAgent.indexOf("Safari") > -1;
            if ((is_chrome)&&(is_safari)) {is_safari=false;}
            var isiPad = (/iPad/i).test(navigator.userAgent);
            var carouselWidth, totalSlideWidth;
            var hideScroll = function () {
                var $leftControl = $('.controls .prevPage'),
                    $rightControl = $('.controls .nextPage'),
                    $scrollBar = $('.scrollbar');
                if ($leftControl.hasClass('disabled') && $rightControl.hasClass('disabled')) {
                    $scrollBar.hide();
                } else {
                    $scrollBar.show();
                }
                if (carouselWidth > totalSlideWidth) {
                    $leftControl.hide();
                    $rightControl.hide();
                    $scrollBar.hide();
                    $(".each-slide").css("margin-bottom", "20px");
                }
            };
            var ContentSlider = function (elem) {
                var $frame = $('.module-contentslider .carousel-container .frame'),
                    $wrap = $frame.parent(),
                    options = {
                        horizontal: true,
                        itemNav: 'basic',
                        smart: true,
                        activateOn: 'click',
                        mouseDragging: true,
                        touchDragging: true,
                        releaseSwing: true,
                        startAt: 0,
                        scrollBar: $wrap.find('.scrollbar'),
                        scrollBy: 1,
                        pagesBar: $wrap.find('.pages'),
                        activatePageOn: 'click',
                        speed: 300,
                        elasticBounds: true,
                        easing: 'easeOutExpo',
                        dragHandle: true,
                        dynamicHandle: true,
                        clickBar: true,
                        // Buttons
                        forward: $wrap.find('.forward'),
                        backward: $wrap.find('.backward'),
                        prev: $wrap.find('.prev'),
                        next: $wrap.find('.next'),
                        prevPage: $wrap.find('.prevPage'),
                        nextPage: $wrap.find('.nextPage')
                    }, optionsNoDrag = {
                        horizontal: true,
                        itemNav: 'basic',
                        smart: true,
                        activateOn: 'click',
                        //mouseDragging: true,
                        //touchDragging: true,
                        releaseSwing: true,
                        startAt: 0,
                        scrollBar: $wrap.find('.scrollbar'),
                        scrollBy: 1,
                        pagesBar: $wrap.find('.pages'),
                        activatePageOn: 'click',
                        speed: 300,
                        elasticBounds: true,
                        easing: 'easeOutExpo',
                        dragHandle: true,
                        dynamicHandle: true,
                        clickBar: true,
                        // Buttons
                        forward: $wrap.find('.forward'),
                        backward: $wrap.find('.backward'),
                        prev: $wrap.find('.prev'),
                        next: $wrap.find('.next'),
                        prevPage: $wrap.find('.prevPage'),
                        nextPage: $wrap.find('.nextPage')
                    };
                function slyActive() {
                    var hideScrollbars = new hideScroll();
                }
                function slyMoveEnd() {
                    Helpers.triggerTracking({"slideImpression": "ContentSlider_slide"}, "Slideshow Impression");
                }
                function slyLoaded() {
                    $('.module-contentslider .carousel-container').addClass('sly-loaded');
                }
                // Call Sly on frame
                if ($.fn.sly) { // Temp Fix
                    if (is_safari || isiPad) {
                        var _totalSlideWidth =  $(".frame > ul", elem).width();
                        var _carouselWidth = $(".carousel-container", elem).width();
                        $(elem).hide();
                        setTimeout(function () {
                            $(elem).show();
                            activeSly(_totalSlideWidth, _carouselWidth);
                        }, 200);
                    } else {
                        activeSly();
                    }
                }

                //activeSly();
                totalSlideWidth =  $(".frame > ul", elem).width();
                carouselWidth = $(".carousel-container", elem).width();
                function activeSly(_totalSlideWidth, _carouselWidth) {
                    if (typeof _totalSlideWidth !== "undefined" && typeof _carouselWidth !== "undefined") {
                        totalSlideWidth = _totalSlideWidth;
                        carouselWidth = _carouselWidth;
                    }
                    if (carouselWidth > totalSlideWidth) {
                        $frame.sly(optionsNoDrag, {
                            active: slyActive,
                            moveEnd: slyMoveEnd,
                            load: slyLoaded
                        });
                        $(".each-slide").css("margin-bottom", "20px");
                    } else {
                        $frame.sly(options, {
                            active: slyActive,
                            moveEnd: slyMoveEnd,
                            load: slyLoaded
                        });
                    }
                    accessibiltyFeatures();
                }

                $(window).on('resize',function () {
                    if ($.fn.sly) { // Temp Fix
                        $frame.sly(false);
                        if (carouselWidth >totalSlideWidth) {
                            $frame.sly(optionsNoDrag, {
                                active: slyActive,
                                moveEnd: slyMoveEnd,
                                load: slyLoaded
                            });
                            $(".each-slide").css("margin-bottom", "20px");
                        } else {
                            $frame.sly(options, {
                                active: slyActive,
                                moveEnd: slyMoveEnd,
                                load: slyLoaded
                            });
                        }
                        accessibiltyFeatures();
                    }
                });

                //Accessibiliy
                function accessibiltyFeatures() {
                    $(".contentslider-tab-entry", elem).on('focus', function(e) {
                        e.preventDefault();
                        $(".each-slide", elem).first().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        $('.frame').data('sly').toStart(true);
                    });
                    $(".each-slide", elem).on('keydown', function(e) {
                        e.preventDefault();
                        var _this = $(e.target), _slider = $('.frame').data('sly'),
                            _thisLink = $(e.target).find("a").attr("href");
                        if (e.shiftKey && e.which === 9) {
                            _this.removeClass("focusOutline").removeAttr("tabindex");
                            $(".nav-primary-menu>li:last").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        } else if (e.which === 9) {
                            _this.removeClass("focusOutline").removeAttr("tabindex");
                            $(".module-contentslider").parents(".row").next().find("a").first().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        } else if (e.which === 37 && _this.prev(".each-slide").length !== 0) {
                            _this.removeClass("focusOutline").removeAttr("tabindex").prev(".each-slide").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            _slider.slideBy(-1);
                        } else if (e.which === 39 && _this.next(".each-slide").length !== 0) {
                            _this.removeClass("focusOutline").removeAttr("tabindex").next(".each-slide").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            _slider.slideBy(1);
                        } else if (e.which === 13 && typeof(_thisLink) !=="undefined" && _thisLink !=="") {
                            window.location.href =  _thisLink;
                        }
                    });
                    $(".contentslider-tab-exit", elem).on('focus', function(e) {
                        e.preventDefault();
                        $(".each-slide", elem).last().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        $('.frame').data('sly').toEnd(true);
                    });
                }

                var trck = new Tracking(elem, 'ContentSlider');
                $(document).trigger('template.loaded');
            };
            return ContentSlider;
        }
);
