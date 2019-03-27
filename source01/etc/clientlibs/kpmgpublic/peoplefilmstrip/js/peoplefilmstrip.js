/* global s */
define([
    'jquery',
    'clamp',
    'tracking',
    'jquerysly',
    'jqueryeasing'
],
    function($, $clamp, Tracking) {
        'use strict';
        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;        
        var element = {},
            $frame = {},
            $wrap = {},
            options = {},
            optionsNoDrag = {},
            carouselWidth,
            totalSlideWidth,
            hideScroll;

        var Peoplefilmstrip = function (elem) {
            element = elem;
            $(window).on('resize', initSly);
            init();
            $(document).on('reflow.complete', handleReflow);
            var trck = new Tracking(elem, 'Peoplefilmstrip');
            $(document).trigger('template.loaded');
        };

        function init() {
            var $headerClamp = $('.item-header', element),
                $descClamp = $('.pull-right',element),
                $titleClamp = $('span.title', element),
                $locationClamp = $('span.location', element);

            $wrap = $('.carousel-container', element);
            $wrap.attr('style', 'width:' + $(element).width() + 'px');
            $frame = $('.frame', element);
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
            };

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
            
            /*$headerClamp.each(function (index, element) {                
                if (!is_chrome && $(this).html().length < 27) {                    
                    $(this).removeClass('line-clamp line-clamp-1');                                       
                }
            });
            $descClamp.each(function (index, element) { 
                if (is_chrome) {                    
                    $(this).addClass('chr-line-clamp-5').removeClass('line-clamp-5');                                       
                }
                if(!is_chrome && $(this).html().length < 132) {
                    $(this).removeClass('line-clamp line-clamp-5');                     
                }
            }); */
            /*$titleClamp.each(function (index, element) {
                $(this).attr('style', '');
                if ($(this).is(':visible')) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 16 * 4,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                }
            });
            $locationClamp.each(function (index, element) {
                $(this).attr('style', '');
                if ($(this).is(':visible')) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 14 * 2,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                }
            });*/

            // Call Sly on frame
            initSly();
        }

        function initSly(evt) {
            hideScroll = function () {
                var $leftControl = $('.controls .prevPage', element),
                    $rightControl = $('.controls .nextPage', element),
                    $scrollBar = $('.scrollbar', element),
                    carouselWidth = $(element).width(),
                    totalSlideWidth = ($(".each-slide", element).width() + 9) * ($(".each-slide", element).length);
                if ($leftControl.hasClass('disabled') && $rightControl.hasClass('disabled')) {
                    $scrollBar.hide();
                } else {
                    $scrollBar.show();
                }
                if (totalSlideWidth < carouselWidth) { 
                    $leftControl.hide();
                    $rightControl.hide();
                    $scrollBar.hide();
                }
            };
            if (evt) {
                evt.preventDefault();
            }
            function slyActive() {
                var hideScrollbars = new hideScroll();
            }
            if ($.fn.sly) { // Temp Fix
                $frame.sly(false);
                $wrap.attr('style', 'width:' + $(element).width() + 'px');
                if (totalSlideWidth < carouselWidth) { 
                    $frame.sly(optionsNoDrag, {
                        active: slyActive
                    });
                } else {
                    $frame.sly(options, {
                        active: slyActive
                    });
                }
                accessibiltyFeatures();
            }
        }

        function handleReflow() {
            element = $(element);
            init();
        }

        //Accessibiliy
        function accessibiltyFeatures() {
            $(".peoplefilmstrip-tab-entry", element).on('focus', function(e) {
                e.preventDefault();
                $(".each-slide", element).first().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                $('.frame').data('sly').toStart(true);
            });
            $(".each-slide", element).on('keydown', function(e) {
                e.preventDefault();
                var _this = $(e.target), _slider = $('.frame').data('sly'),
                    _thisLink = $(e.target).find("a").attr("href"),
                    _thisCarousel = $(element);
                if (e.shiftKey && e.which === 9) {
                    _this.removeClass("focusOutline").removeAttr("tabindex");
                    $(".peoplefilmstrip-tab-entry", element).parents(".row-same-height").prev().find("li:last").attr("tabindex", "-1").addClass("focusOutline").find("a").trigger('focus');
                } else if (e.which === 9) {
                    _this.removeClass("focusOutline").removeAttr("tabindex");
                    if ($(".module-tmpl-topic").length !== 0) { 
                        _thisCarousel.parents(".row").next().find(".btn-cta:first").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    } else if ($(".module-tmpl-magazine").length !== 0) {
                        _thisCarousel.parents(".row").next(".row").find(".btn-cta:first").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    } else if ($(".module-tmpl-peoplesublanding").length !== 0) {
                        _thisCarousel.parents(".parsys-row").next(".parsys-row").find("a:first").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    } else {
                        _thisCarousel.parent().next().find(".btn-cta:first").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }
                } else if (e.which === 37 && _this.prev(".each-slide").length !== 0) {
                    _this.removeClass("focusOutline").prev(".each-slide").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    _slider.slideBy(-1);
                } else if (e.which === 39 && _this.next(".each-slide").length !== 0) {
                    _this.removeClass("focusOutline").next(".each-slide").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    _slider.slideBy(1);
                } else if (e.which === 13 && typeof(_thisLink) !=="undefined" && _thisLink !=="") {
                    window.location.href =  _thisLink;
                } 
            });
            $(".peoplefilmstrip-tab-exit", element).on('focus', function(e) {
                e.preventDefault();
                $(".each-slide", element).last().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                $('.frame').data('sly').toEnd(true);
            });
        }
        return Peoplefilmstrip;
    }
);