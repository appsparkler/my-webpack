/* global s */
/* global kpmgAssetDomain */
/* global calanderProperties */
/* global dateFormatProperties */
define([
        'jquery',
        'clamp',
        'cqservice',
        'handlebars',
        'tracking',
        'helpers',
        'jquerysly',
        'jqueryeasing',
        'handlebarshelpers',
        'precompile'
    ],
    function($, $clamp, Service, Handlebars, Tracking, Helpers, PrecompiledHandlebars) {
        'use strict';
        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        var carouselWidth, totalSlideWidth;
        var hideScroll = function() {
            var $leftControl = $('.controls .prevPage'),
                $rightControl = $('.controls .nextPage'),
                $scrollBar = $('.scrollbar');
            if ($leftControl.hasClass('disabled') && $rightControl.hasClass('disabled')) {
                $scrollBar.hide();
            } else {
                $scrollBar.show();
            }
            if (carouselWidth < totalSlideWidth) {
                $leftControl.hide();
                $rightControl.hide();
                $scrollBar.hide();
                $(".each-slide").css("margin-bottom", "20px");
            }
        };
        var FilmStripCarousel = function(elem) {
            var _this = $(elem),
                options = {
                    baseUrl: $(elem).data("path")
                },
                showTime = _this.data("showTime"),
                service = new Service('FilmStripCarousel', options);
            service.SOLRFetch(handleFetchSuccess, 'results', _this.data("items"), 0);

            if(dateFormatProperties && showTime) {
                $.merge(dateFormatProperties.fields, [{"item4":"time"}]);
            }

            function handleFetchSuccess(data) {
                    var item = $('#filmstrip-item'),
                        compName = 'filmstripitem',
                        tmpl = PrecompiledHandlebars[compName],
                        itemPanel = $('.items', _this),
                        par = JSON.parse(_this.attr('data-filmcarouselrendition')),
                        _sampleFontSize = 14;


                    if (kpmgAssetDomain) {
                        data = $.extend(true, data, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }

                    $.each(data, function(index, currentData) {
                        currentData.imageGalleryConfig = par.imageGalleryConfig;
                        currentData.imageGalleryConfigExists = par.imageGalleryConfigExists;
                    });

                    $.each(data, function(index, val) {
                        if(dateFormatProperties && data[index].eventURL) {
                            data[index].eventStartDateLocal=data[index].eventStartDateCalendar;
                            data[index].eventEndDateLocal = data[index].eventEndDateCalendar;
                            data[index].eventStartDateCalendar = Helpers.dateFormat(data[index].eventStartDateCalendar, calanderProperties, dateFormatProperties);
                            data[index].eventEndDateCalendar = Helpers.dateFormat(data[index].eventEndDateCalendar, calanderProperties, dateFormatProperties);
                        }
                        itemPanel.append(tmpl(val));
                    });

                    if (window.picturefill) {
                        window.picturefill(itemPanel);
                    }
                
                    setTimeout(function() {
                        $('img.lazy', itemPanel).unveil();
                    }, 150);
                    var $frame = $('.frame', _this),                    
                        $headerClamp = $('.item-header', $frame),
                        $descClamp = $('.short-description',$frame),
                        $eventAddr = $('.filmstripcarousel-event-address', $frame),
                        $eventDesc = $('.filmstripcarousel-event-description',$frame),
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
                            scrollBar: $('.scrollbar', $wrap),
                            scrollBy: 1,
                            pagesBar: $('.pages', $wrap),
                            activatePageOn: 'click',
                            speed: 300,
                            elasticBounds: true,
                            easing: 'easeOutExpo',
                            dragHandle: true,
                            dynamicHandle: true,
                            clickBar: true,
                            // Buttons
                            forward: $('.forward', $wrap),
                            backward: $('.backward', $wrap),
                            prev: $('.prev', $wrap),
                            next: $('.next', $wrap),
                            prevPage: $('.prevPage', $wrap),
                            nextPage: $('.nextPage', $wrap)
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
                            scrollBar: $('.scrollbar', $wrap),
                            scrollBy: 1,
                            pagesBar: $('.pages', $wrap),
                            activatePageOn: 'click',
                            speed: 300,
                            elasticBounds: true,
                            easing: 'easeOutExpo',
                            dragHandle: true,
                            dynamicHandle: true,
                            clickBar: true,
                            // Buttons
                            forward: $('.forward', $wrap),
                            backward: $('.backward', $wrap),
                            prev: $('.prev', $wrap),
                            next: $('.next', $wrap),
                            prevPage: $('.prevPage', $wrap),
                            nextPage: $('.nextPage', $wrap)
                        };
                    totalSlideWidth = $(".items", elem).width();
                    carouselWidth = $(".carousel-container", elem).width();
                    
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
                    $eventAddr.each(function (index, element) {                     
                        if(!is_chrome && $(this).html().length < 165) {
                            $(this).removeClass('line-clamp line-clamp-5');                     
                        }
                    });
                    $eventDesc.each(function (index, element) {                     
                        if(!is_chrome && $(this).html().length < 85) {
                            $(this).removeClass('line-clamp line-clamp-5');                     
                        }
                    });

                    function slyActive() {
                        var hideScrollbars = new hideScroll();
                    }

                    function slyMoveEnd() {
                            Helpers.triggerTracking({
                                "slideImpression": "FilmStripCarousel_slide"
                            }, "Slideshow Impression");
                        }
                        // Call Sly on frame
                    if ($.fn.sly) { // Temp Fix
                        if (carouselWidth < totalSlideWidth) {
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
                    $(window).on('resize',function() {
                        if ($.fn.sly) { // Temp Fix
                            $frame.sly(false);
                            if (carouselWidth < totalSlideWidth) {
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
                }
            //Accessibiliy
            function accessibiltyFeatures() {
                $(".articleEventFilmStrip-tab-entry", elem).on('focus', function(e) {
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
                        $(".articleEventFilmStrip-tab-entry", elem).removeAttr("tabindex").parents(".row").prev().find("li:last").attr("tabindex", "-1").addClass("focusOutline").find("a").trigger('focus');
                    } else if (e.which === 9) {
                        _this.removeClass("focusOutline").removeAttr("tabindex");
                        $(".module-footer").find("li").first().find('a').attr("tabindex", "0").trigger('focus');
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
                $(".articleEventFilmStrip-tab-exit", elem).on('focus', function(e) {
                    e.preventDefault();
                    $(".each-slide", elem).last().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    $('.frame').data('sly').toEnd(true);
                });
            }
            // On load analytics 
            Helpers.triggerTracking({
                "slideImpression": "FilmStripCarousel"
            }, "Slideshow Impression");
            var trck = new Tracking(elem, 'FilmStripCarousel');
            $(document).trigger('template.loaded');
        };
        return FilmStripCarousel;
    }
);