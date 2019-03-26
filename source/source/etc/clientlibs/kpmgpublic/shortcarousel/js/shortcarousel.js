/* global s */
define([
        'jquery',
        'clamp',
        'tracking',
        'helpers',
        'personalizationUtils'
    ],
    function($, $clamp, Tracking, Helpers, PersonalizationUtils) {
        'use strict';
        var ShortCarousel = function(elem) {
            $(document).on('mobileBreakpoint', initializeCarousel);
            $(document).on('desktopBreakpoint', initializeCarousel);
            var sliderLength = $(".carousel .slide", elem).length,
                owlOptions = {},
                carouselElement = $('.owl-carousel', elem);
            owlOptions = (sliderLength > 1) ? {
                items: 1,
                animateIn: false,
                loop: true,
                nav: true,
                lazyLoad: true,
                dots: true,
                navText: ['<span class="icon-carousel-left">', '<span class="icon-carousel-right">']
            } : {
                items: 1,
                animateIn: false,
                loop: false,
                nav: false,
                lazyLoad: true,
                dots: false,
                mouseDrag: false,
                touchDrag: false
            };
            function setSrc(breakpoint) {
                $.each($('[data-' + breakpoint + ']'), function(index, val) {
                    $(val).attr('data-src', $(val).attr('data-' + breakpoint));
                });
            }

            function initializeCarousel() {
                var bp = PersonalizationUtils.commonUtils.isMobile() ? 'mobile' : 'desktop';

                setSrc(bp);
                if (carouselElement.data('owlCarousel')) {
                    $.each($('[data-src]'), function(index, val) {
                        if ($(val).attr('style')) {
                            $(val).attr('src', $(val).attr('data-' + bp));
                        }
                    });
                } else {
                    if (typeof carouselElement.owlCarousel !== 'undefined') {
                        carouselElement.on('initialized.owl.carousel', function(evt){
                            var carouselHeightCheck = setInterval(function() {
                                if ($(".carousel", elem).height() > 250) {
                                    clearInterval(carouselHeightCheck);
                                    clampComponent();
                                }
                            }, 200);
                        }).owlCarousel(owlOptions);
                        carouselElement.on('translate.owl.carousel', function(evt){
                            var crouselHeightElement= setInterval(function() {
                                Helpers.triggerTracking({
                                    "slideImpression": "ShortCarousel_slide" + ($(".active", elem).find('li').data("slideno") + 1)
                                }, "Slideshow Impression");
                                clampComponent();
                            }, 150);
                            setTimeout(function() { clearInterval(crouselHeightElement); }, 2500);
                        });
                        if (sliderLength > 1) {
                            //Accessibiliy
                            $(".icon-carousel-right", elem).attr("aria-label", $(".module-shortcarousel").data("nextslidetext"));
                            $(".icon-carousel-left", elem).attr("aria-label", $(".module-shortcarousel").data("prevslidetext"));
                            var owlObj =carouselElement.data('owlCarousel');
                            $(".shortcarousel-tab-entry", elem).on('focus', function(e) {
                                e.preventDefault();
                                $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus');
                                $(".owl-prev", elem).addClass("focusOutline-arrow");
                            });
                            $(".icon-carousel-left", elem).on('keydown', function(e) {
                                e.preventDefault();
                                if (e.which === 9) {
                                    $(".owl-prev", elem).removeClass("focusOutline-arrow");
                                    $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus');
									$(".owl-next", elem).addClass("focusOutline-arrow");
                                }
                                if (e.which === 37) {
                                    owlObj.prev();
                                }
                                if (e.which === 39) {
                                    owlObj.next();
                                }
                                if (e.which === 9 && e.shiftKey) {
                                    $(this).removeAttr("tabindex");
                                    $(".owl-prev", elem).removeClass("focusOutline-arrow").removeAttr("tabindex");
                                    if ($(".module-tmpl-industry").length !== 0 || $(".module-tmpl-services-landing-r").length !== 0) {
                                        if ($(".share-component").length !== 0) {
                                            $(".share-component").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                                        } else {
                                            $(".module-breadcrumb").find("li:last").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                                        }
                                    } else {
                                        $(".nav-primary-menu>li:last").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                                    }
                                }
                            });
                            $(".icon-carousel-right", elem).on('keydown', function(e) {
                                e.preventDefault();
                                if (e.which === 9) {
                                    $(".owl-next", elem).removeClass("focusOutline-arrow").removeAttr("tabindex");
                                    if ($(".module-tmpl-services-landing-r").length !== 0 || $(".module-tmpl-industry").length !== 0 || $(".module-tmpl-peoplesublanding").length !== 0 ) {
                                        $(".subnavigation-list-group-item").first().addClass("focusOutline").find("a").attr("tabindex", "-1").trigger('focus');
                                    } else if ($(".module-tmpl-topic").length !== 0 || $(".module-tmpl-magazine").length !== 0) {
                                        $(".module-shortcarousel").parents(".row").next().find("a:first").trigger('focus').parent("li").attr("tabindex", "-1").addClass("focusOutline");
                                    } else {
                                        $(".module-shortcarousel").parents(".row").next().find(".btn-cta:first").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                                    }
                                }
                                if (e.which === 37) {
                                    owlObj.prev();
                                }
                                if (e.which === 39) {
                                    owlObj.next();
                                }
                                if (e.which === 9 && e.shiftKey) {
                                    $(this).removeAttr("tabindex");
                                    $(".owl-next", elem).removeClass("focusOutline-arrow");
                                    $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus');
                                    $(".owl-prev", elem).addClass("focusOutline-arrow");
                                }
                            });

                            $(".icon-carousel-left", elem).on('blur', function(e) {
                                $(this).removeAttr("tabindex");
                                $(".owl-prev", elem).removeClass("focusOutline-arrow");
                            });
                            $(".cta-align a").on('blur', function(e) {
                                $(this).removeAttr("tabindex").removeClass("focusOutline");
                            });
                            $(".icon-carousel-right", elem).on('blur', function(e) {
                                $(this).removeAttr("tabindex");
                                $(".owl-next", elem).removeClass("focusOutline-arrow");
                            });

                            $(".shortcarousel-tab-exit", elem).on('focus', function(e) {
                                e.preventDefault();
                                $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus');
                                $(".owl-next", elem).addClass("focusOutline-arrow");
                            });
                        } else {
                            $(".shortcarousel-tab-entry", elem).attr("tabindex", "-1");
                            $(".shortcarousel-tab-exit", elem).attr("tabindex", "-1");
                        }
                    }
                }
                rearrangingOwlControls();
                
                $(".owl-item > a", elem).on('mouseenter', function() {
                        $(".short-carousel-description p", this).addClass("hover");
                    }).on('mouseleave', function() {
                        $(".short-carousel-description p", this).removeClass("hover");
                    }
                );
            }

            function clampComponent() {
                    var $clampHeader = $('.module-shortcarousel .caption .slide-header'),
                        $clampDescription = $('.module-shortcarousel .caption p');
                    $(document).on('desktopBreakpoint', function() {
                        $clampHeader.each(function(index, element) {
                            $(this).attr('style', '');
                            if ($(this).is(':visible')) {
                                $(this).dotdotdot({
                                    ellipsis: '...',
                                    height: 56 * 2,
                                    wrap: 'word',
                                    fallbackToLetter: false,
                                    watch: "window"
                                });
                            }
                        });
                    });

                    $(document).on('mobileBreakpoint', function() {
                        $clampHeader.each(function(index, element) {
                            $(this).attr('style', '');
                            if ($(this).is(':visible')) {
                                $(this).dotdotdot({
                                    ellipsis: '...',
                                    height: 38 * 3,
                                    wrap: 'word',
                                    fallbackToLetter: true,
                                    watch: "window"
                                });
                            }
                        });
                    });

                    if ($(document).width() <= 640) {
                        $clampHeader.each(function(index, element) {
                            $(this).attr('style', '');
                            if ($(this).is(':visible')) {
                                $(this).dotdotdot({
                                    ellipsis: '...',
                                    height: 38 * 3,
                                    wrap: 'word',
                                    fallbackToLetter: true,
                                    watch: "window"
                                });
                            }
                        });
                    } else {
                        $clampHeader.each(function(index, element) {
                            $(this).attr('style', '');
                            if ($(this).is(':visible')) {
                                $(this).dotdotdot({
                                    ellipsis: '...',
                                    height: 56 * 2,
                                    wrap: 'word',
                                    fallbackToLetter: true,
                                    watch: "window"
                                });
                            }
                        });
                    }

                    $clampDescription.each(function(index, element) {
                        $(this).attr('style', '');
                        if ($(this).is(':visible')) {
                            $(this).dotdotdot({
                                ellipsis: '...',
                                height: 18 * 5,
                                wrap: 'word',
                                fallbackToLetter: true,
                                watch: "window"
                            });
                        }
                    });
                }
            $(window ).on( "resize", function( event ) {
                clampComponent();
            });

            function rearrangingOwlControls() {
                $('.owl-nav', elem).detach().prependTo('.owl-stage-outer', elem);
            }

                // On load analytics -
            Helpers.triggerTracking({
                "slideImpression": "ShortCarousel_slide1"
            }, "Slideshow Impression");
            var trck = new Tracking(elem, 'ShortCarousel');
            $(document).trigger('template.loaded');
        };

        return ShortCarousel;
    }
);
