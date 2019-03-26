/* global s */
define(['jquery', 'tracking', 'helpers', 'jquerysly', 'jqueryeasing'],
        function ($, Tracking, Helpers) {
            'use strict';
            var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
            var carouselWidth = $(".module-basicfilmstripcarousel").width(), totalSlideWidth = ($(".each-slide", ".module-basicfilmstripcarousel").width() + 9) * ($(".each-slide").length);
            var hideScroll = function () {
                var $leftControl = $('.controls .prevPage'),
                    $rightControl = $('.controls .nextPage'),
                    $scrollBar = $('.scrollbar');
                if ($leftControl.hasClass('disabled') && $rightControl.hasClass('disabled')) {
                    $scrollBar.hide();
                } else {
                    $scrollBar.show();
                }
                if (totalSlideWidth < carouselWidth) { 
                    $leftControl.hide();
                    $rightControl.hide();
                    $scrollBar.hide();
                    $(".each-slide").css("margin-bottom", "20px");
                }
            };
            var BasicFilmstripCarousel = function (elem) {
                var $frame = $('.module-basicfilmstripcarousel .frame'),
                $headerClamp = $('.item-header', $frame),
                $descClamp = $('.short-description',$frame),
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
                    },
                    optionsNoDrag = {
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
                    
                $headerClamp.each(function (index, element) {                              
                    if (!is_chrome && $(this).html().length < 28) {                    
                        $(this).removeClass('line-clamp line-clamp-1');                                       
                    }
                });
                $descClamp.each(function (index, element) {                     
                    if(!is_chrome && $(this).html().length < 132) {
                        $(this).removeClass('line-clamp line-clamp-5');                     
                    }
                });
                function slyActive() {
                    var hideScrollbars = new hideScroll();
                }
                function slyMoveEnd() {
                    Helpers.triggerTracking({"slideImpression": "BasicFilmStripCarousel_slide"}, "Slideshow Impression");
                } 
                // Call Sly on frame
                if ($.fn.sly) { // Temp Fix
                    if (totalSlideWidth < carouselWidth) { 
                        $frame.sly(optionsNoDrag, {
                            active: slyActive,
                            moveEnd: slyMoveEnd
                        });
                    } else {
                        $frame.sly(options, {
                            active: slyActive,
                            moveEnd: slyMoveEnd
                        });
                    }
                    accessibiltyFeatures();
                }
                $(window).on('resize', function () {
                    if ($.fn.sly) { // Temp Fix
                        $frame.sly(false);
                        if (totalSlideWidth < carouselWidth) { 
                            $frame.sly(optionsNoDrag, {
                                active: slyActive,
                                moveEnd: slyMoveEnd
                            });
                            $(".each-slide").css("margin-bottom", "20px");
                        } else {
                            $frame.sly(options, {
                                active: slyActive,
                                moveEnd: slyMoveEnd
                            });
                        }
                        accessibiltyFeatures();
                    }
                });

                //Accessibiliy
                function accessibiltyFeatures() {
                    $(".each-slide", elem).on('focus', function(e) {
                        $(this).addClass("focusOutline");
                    });
                    $(".each-slide", elem).on('blur', function(e) {
                        $(this).removeClass("focusOutline");
                    });
                    $(".each-slide", elem).on('keydown', function(e) {
                        var _this = $(e.target),
                            _slider = $('.frame').data('sly');
                        if (_this.hasClass("each-slide")) {
                            if (e.shiftKey && e.which === 9) {
                                if (_this.data("index") === 0) {
                                    _slider.toStart(true);
                                } else if (_this.data("index") === $(".each-slide", elem).length -1) {
                                    _slider.toEnd(true);
                                } else if (_this.prev(".each-slide").length !== 0) {
                                    _slider.slideBy(-1);
                                }
                            } else if (e.which === 9) {
                                if (_this.data("index") === $(".each-slide", elem).length -1) {
                                    _slider.toEnd(true);
                                } else if (_this.data("index") === 0) {
                                    _slider.toStart(true);
                                } else if (_this.next(".each-slide").length !== 0) {
                                    _slider.slideBy(1);
                                }
                            } else if (e.which === 37 && _this.prev(".each-slide").length !== 0) {
                                _this.prev(".each-slide").trigger('focus');
                                _slider.slideBy(-1);
                            } else if (e.which === 39 && _this.next(".each-slide").length !== 0) {
                                _this.next(".each-slide").trigger('focus');
                                _slider.slideBy(1);
                            }
                        }
                    });
                }

                // On load analytics 
                Helpers.triggerTracking({"slideImpression": "BasicFilmStripCarousel"}, "Slideshow Impression");
                var trck = new Tracking(elem, 'BasicFilmstripCarousel');
                $(document).trigger('template.loaded');
            };
            return BasicFilmstripCarousel;
        }
);