/* global s */
define([
        'jquery',
        'clamp',
        'tracking',
        'helpers',
        'personalizationUtils'
    ],
    function($, $clamp, Tracking, Helpers, personalizationUtils) {
        'use strict';
        var Kpmglearnmore = function(elem) {
            $(document).on('mobileBreakpoint', handleBreakpoint);
            $(document).on('desktopBreakpoint', handleBreakpoint);
            var $kpmgmodal = $('#kpmgModal');
            var article = $kpmgmodal.data('article');

            if (article) {
                var redirectURL,
                    loginLink = $('a.btn.loginUser', elem),
                    registerLink = $("a.btn.registerUser", elem);

                if (personalizationUtils.pathUtils.isAbsolutePath(article.href)) {
                    redirectURL = encodeURIComponent(article.href);
                } else {
                    redirectURL = encodeURIComponent(window.location.origin + article.href);
                }

                $(".module-kpmglearnmore .title-question").css("display", "block");

                loginLink.attr('href', loginLink.attr('href') + "?redirectURL=" + redirectURL);
                registerLink.attr('href', registerLink.attr('href') + "?redirectURL=" + redirectURL);

                personalizationUtils.commonUtils.setValue('article-to-save', article);
            }

            var sliderLength = $(".carousel .slide", elem).length,
                owlOptions = {},
                carouselElement = $('.learnMoreModal .owl-carousel'),
                imageFrequency = "3000";
            owlOptions = (sliderLength > 1) ? {
                items: 1,
                autoplay: true,
                autoplayTimeout: imageFrequency,
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
            var isOSXSafari = Helpers.isOSXSafari();


            function setSrc(breakpoint) {
                $.each($('[data-' + breakpoint + ']'), function(index, val) {
                    $(val).attr('data-src', $(val).attr('data-' + breakpoint));
                });
            }


            function handleBreakpoint(evt) {
                var bp = (evt.type === 'desktopBreakpoint') ? 'desktop' : 'mobile';
                setSrc(bp);
                var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
                if (carouselElement.data('owlCarousel')) {
                    $.each($('.carousel [data-src]', elem), function(index, val) {
                        $(this).attr('src', $(val).attr('data-desktop' ));
                        if(is_safari) {
                            $(this).attr('style','opacity:1');
                        }
                    });
                    $.each($('.accordion-content [data-src]', elem), function(index, val) {
                        $(this).attr('src', $(val).attr('data-mobile'));
                    });
                } else {
                    if (typeof carouselElement.owlCarousel !== 'undefined') {
                        carouselElement.on('initialized.owl.carousel', function(evt) {
                            var carouselHeightCheck = setInterval(function() {
                                if ($(".carousel", elem).height() > 250) {
                                    clearInterval(carouselHeightCheck);

                                }
                            }, 2000);
                        }).owlCarousel(owlOptions);
                    }
                }
            }
            var modalDivParent = $('.modal-box-container').parent().parent();
            var modalDiv = $('.modal-box-container').parent();
            if (window.kpmg.isMobile) {
                $(modalDivParent).addClass('modal-mobile');
            } else {
                $(modalDivParent).css({
                    "width": "567px",
                    "background": "#f0f0f0"
                });
                $(modalDiv).css({
                    "background": "#f0f0f0",
                    "padding": '0'
                });
            }
            $(function() {
                var accordion = {
                    init: function() {
                        this.bindEvents();
                    },
                    bindEvents: function() {
                        $('.accordion-title').on('click', this.toggleAccordion);
                    },
                    toggleAccordion: function() {
                        $(this).next().slideToggle();
                        $(this).toggleClass('active');
                        $(this.children[0]).toggleClass("icon-chevron-up icon-chevron-down");
                    }

                };
                accordion.init();
                $('.modal-box-container').each(function(){
                    $(".accordian-elements:eq(0) .accordion-title",this).trigger('click');
                });

                console.log(window.location.href.split('?')[0]);
            });

            if (personalizationUtils.accountUtils.isLoggedIn()) {
                $('.modal-box-container.authLearnmore ').css("display", "block");
                $('.modal-box-container.unauthLearnmore ').remove();

            } else {
                $('.modal-box-container.authLearnmore ').remove();
                $('.modal-box-container.unauthLearnmore ').css("display", "block");
            }

            $(".module-kpmglearnmore").parent().parent().prev('.btn-close').addClass("learnmore-btn-close");
            $(".learnmore-btn-close").on("click", function() {
                $(".module-kpmglearnmore").parent().parent().prev('.btn-close').removeClass("learnmore-btn-close");
                var id = $kpmgmodal.data("parent");
                $("#" + id).trigger('focus');
            });
            $(".learnmore-btn-close").on("keydown", function(e) {
                $(".module-kpmglearnmore").parent().parent().prev('.btn-close').removeClass("learnmore-btn-close");
                if (e.key === 'Enter') {
                    $(this).trigger("click");
                    var id = $kpmgmodal.data("parent");
                    $("#" + id).trigger('focus');
                }
            });

            $(function() {
                //*** Accessibiliy ***//
                var owlObj = carouselElement.owlCarousel(owlOptions);
                $(".learnmore-tab-entry").on('focus', function(e) {
                    e.preventDefault();
                    $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus');
                    // $(".owl-prev", elem).addClass("focusOutline");
                    if (isOSXSafari) {
                        $(".learnmore-btn-close ").attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                    } else {
                        $(".learnmore-btn-close").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }
                });
                $(".learnmore-tab-exit", elem).on('focus', function(e) {
                    e.preventDefault();
                    $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus');
                    $(".owl-next", elem).addClass("focusOutline");
                });

                $(".learnmore-btn-close").on('keydown', function(e) {
                    e.preventDefault();
                    var _this = $(".learnmore-btn-close");
                    if (e.which === 9) {
                        _this.removeClass("focusOutline focusOutline-arrow");

                        if (isOSXSafari) {
                            _this.removeClass("focusOutline-arrow");
                            $(".owl-prev").attr("tabindex", "0").trigger('focus').addClass("focusOutline-arrow");
                        } else {
                            _this.removeClass("focusOutline");
                            $(".owl-prev").attr("tabindex", "0").trigger('focus').addClass("focusOutline");
                        }
                    }
                });

                $(".owl-prev").on('keydown', function(e) {
                    e.preventDefault();
                    var _this = $(".owl-prev");
                    // adding description for screen reader
                    _this.attr('aria-label', "previous slide");
                    if (e.shiftKey && e.which === 9) {
                        _this.removeClass("focusOutline").attr("tabindex","-1");
                        if (isOSXSafari) {
                            $(".learnmore-btn-close").attr("tabindex", "0").addClass("focusOutline").trigger('focus');
                        } else {
                            $(".learnmore-btn-close").attr("tabindex", "0").addClass("focusOutline").trigger('focus');
                        }
                    } else if (e.which === 9) {
                        if (isOSXSafari) {
                            _this.removeClass("focusOutline-arrow");
                            $(".owl-next").attr("tabindex", "0").trigger('focus').addClass("focusOutline-arrow");

                        } else {
                            _this.removeClass("focusOutline");
                            $(".owl-next").attr("tabindex", "0").trigger('focus').addClass("focusOutline");
                        }
                    } else if (e.which === 13 || e.which === 37) {
                        owlObj.trigger('prev.owl');
                    } else if (e.which === 39) {
                        owlObj.trigger('next.owl');
                    }
                });
                
                $(".icon-carousel-right").on('keydown', function(e) {
                    e.preventDefault();
                    var _this = $(".owl-next");
                    // adding description for screen reader
                    _this.attr('aria-label', "next slide");
                    if (e.shiftKey && e.which === 9) {
                        _this.removeClass("focusOutline").attr("tabindex","-1");
                        if (isOSXSafari) {
                            $(".owl-prev").attr("tabindex", "0").addClass("focusOutline").trigger('focus');
                        } else {
                            $(".owl-prev").attr("tabindex", "0").addClass("focusOutline").trigger('focus');
                        }
                    } else if (e.which === 9) {
                        var _next = _this.parents(".modal-box-container").hasClass("unauthLearnmore") ? $(".modal-footer .registerUser") : $(".learnmore-btn-close");
                        if (isOSXSafari) {
                            _this.removeClass("focusOutline-arrow").attr("tabindex","-1");
                            _next.attr("tabindex", "0").trigger('focus').addClass("focusOutline");
                        } else {
                            _this.removeClass("focusOutline");
                            _next.attr("tabindex", "0").trigger('focus').addClass("");
                        }
                    } else if (e.which === 37) {
                        owlObj.trigger('prev.owl');
                    } else if (e.which === 13 || e.which === 39) {
                        owlObj.trigger('next.owl');
                    }
                });
                $(".modal-footer .registerUser").on('keydown', function(e) {
                    e.preventDefault();
                    var _this = $(".modal-footer .loginUser");
                    if (e.shiftKey && e.which === 9) {
                        _this.attr("tabindex","-1");
                        if (isOSXSafari) {
                            $(".owl-next").attr("tabindex", "0").addClass("focusOutline").trigger('focus');
                        } else {
                            $(".owl-next").attr("tabindex", "0").addClass("focusOutline").trigger('focus');
                        }
                    } else if (e.which === 9) {
                        if (isOSXSafari) {
                            $(".loginUser").attr("tabindex", "0").trigger('focus');
                        } else {
                            $(".loginUser").attr("tabindex", "0").trigger('focus');
                        }
                    }
                });
                $(".loginUser").on('keydown', function(e) {
                    e.preventDefault();
                    var _this = $(".registerUser");
                    if (e.shiftKey && e.which === 9) {
                        _this.attr("tabindex","-1");
                        if (isOSXSafari) {
                            $(".modal-footer .registerUser").attr("tabindex", "0").trigger('focus');
                        } else {
                            $(".modal-footer .registerUser").attr("tabindex", "0").trigger('focus');
                        }
                    } else if (e.which === 9) {
                        if (isOSXSafari) {
                            _this.removeClass("focusOutline-arrow");
                            $(".learnmore-btn-close").attr("tabindex", "0").trigger('focus').addClass("focusOutline");
                        } else {
                            _this.removeClass("focusOutline-arrow");
                            $(".learnmore-btn-close").attr("tabindex", "0").trigger('focus').addClass("focusOutline");
                        }
                    }
                });

                $('.btn-close').on('click', function(){
                    $('.modal-content').removeAttr("style");
                });
            });

            // On load analytics -
            Helpers.triggerTracking({
                "slideImpression": "HeroCarousel_slide1"
            }, "Slideshow Impression");
            var trck = new Tracking(elem, 'Kpmglearnmore');
            $(document).trigger('template.loaded');
        };

        return Kpmglearnmore;
    }
);
