/* global s */
/* global kpmgAssetDomain */
define(['jquery', 'handlebars', 'precompile', 'cqservice', 'tracking', 'helpers', 'owl'],
    function ($, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers) {
        'use strict';
        var ContactCarousel = function (elem) {

            var wraper = $(elem),
                autoCarouselElem = $('.autoCarouselElem', elem),
                manualCarouselElem = $('.manualCarouselElem', elem),
                manualCarouselClone,
                autoCarouselTpl = $('#autoCarousel-partial'),
                options = {
                    baseUrl: autoCarouselElem.data("path")
                },
                autoCarouselTemplate = null,
                isManual = autoCarouselElem.length ? autoCarouselElem.data('is-manual') : true,
                serviceSOLR = null,
                dataSOLR = {},
                carouselSettings = {
                    items: 1,
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    loop: true,
                    autoplay: wraper.data('autoplay'),
                    autoplayTimeout: wraper.data('autoplaytimeout'),
                    nav: true,
                    navText: ['<a href="javascript:void(0);" class="owl-control-previous"><span class="icon-carousel-left"></a>',
                    '<a href="javascript:void(0);" class="owl-control-next"><span class="icon-carousel-right"></a>']

                },
                isOSXSafari = Helpers.isOSXSafari();

            if ($(elem).find('.manualCarouselClone').length === 0) {
                manualCarouselClone = $('.manualCarouselElem', elem).clone(true);
                manualCarouselClone.appendTo(elem).removeClass('manualCarouselElem').addClass('manualCarouselClone').hide();
            } else {
                manualCarouselClone = $('.manualCarouselClone').clone();
            }
            //$wrap = $('.contactcarousel-owl-carousel', elem);
            //$wrap.attr('style', 'width:' + $(elem).width() + 'px');
            function initCarousel(_this, settings, isSOLR) {
                /**************** Handle iphone issues on rotation - START ***************/
                var isOwlLoaded = $('.owl-carousel', elem).hasClass('owl-loaded');
                if (isOwlLoaded && isSOLR) {
                    $('.owl-carousel', elem).each(function () {
                        $(this).trigger('destroy.owl.carousel');
                        $(this).removeClass('owl-carousel');
                    });
                } else if (isOwlLoaded && !isSOLR) {
                    manualCarouselElem.empty();
                    manualCarouselElem.html(manualCarouselClone.html());
                }
                /***************** Handle iphone issues on rotation - END ****************/

                if ( (!isSOLR && $(".manualCarouselElem .contactcarousel-item", elem).length === 1) ||
                    (isSOLR && $(".autoCarouselElem .contactcarousel-item", elem).length === 1) ) {
                    $('.contactcarousel-item-description', elem).addClass('contactcarousel-singleItem-description');
                    $(".contactcarousel-tab-entry", elem).attr("tabindex", "-1");
                    $(".contactcarousel-tab-exit", elem).attr("tabindex", "-1");
                    $(".contactcarousel-owl-carousel").addClass('owl-loaded');
                } else {
                    var owl = _this.owlCarousel(settings);
                    owl.on('changed.owl.carousel', function (evt) {
                        Helpers.triggerTracking({
                            "slideImpression": "ContactCarousel_slide" + ($(".active", elem).find('.contactcarousel-item').data("slideno") + 1)
                        }, "Slideshow Impression");
                    });



                    if ($('.contactcarousel').length > 0) {
                        $('.module-contactcarousel').parent().parent().css("position", "relative");
                    } else {
                        $('.module-contactcarousel').parent().css("position", "relative");
                    }

                    //Accessibiliy
                    var owlObj = owl.data('owlCarousel');
                    $(".contactcarousel-tab-entry", elem).on('focus', function (e) {
                        e.preventDefault();
                        if (isOSXSafari) {
                            $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                        } else {
                            $("div.owl-prev > a > .icon-carousel-left" , elem ).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        }
                    });

                    $("div.owl-prev > a > .icon-carousel-left" , elem ).on('keydown', function (e) {
                        e.preventDefault();
                        var _this = $("div.owl-prev > a > .icon-carousel-left" , elem );
                        if (e.shiftKey && e.which === 9) {
                            if (isOSXSafari) {
                                _this.removeClass("focusOutline-arrow").removeAttr("tabindex").parents(".row-same-height").prev().first().find("li:last").attr("tabindex", "-1").addClass("focusOutline").find("a").trigger('focus');
                            } else {
                                if(_this.removeClass("focusOutline").parents(".row-same-height").prev().first().find("li:last").length > 0 ){
                                    _this.removeClass("focusOutline").removeAttr("tabindex").parents(".row-same-height").prev().first().find("li:last").attr("tabindex", "-1").addClass("focusOutline").find("a").trigger('focus');
                                }else{
                                    _this.removeClass("focusOutline").removeAttr("tabindex").parents(".row-same-height").prev().first().children(":last").attr("tabindex", "-1").addClass("focusOutline").trigger('focus');
                                }
                            }
                            return false;
                        } else if (e.which === 9) {
                            if (isOSXSafari) {
                                _this.removeClass("focusOutline-arrow");
                            } else {
                                _this.removeClass("focusOutline");
                                $("div.owl-next > a > .icon-carousel-right" , elem ).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            }
                        } else if (e.which === 37) {
                            owlObj.prev();
                        } else if (e.which === 39) {
                            owlObj.next();
                        }
                    });

                    $("div.owl-prev > a > .icon-carousel-left", elem).on('blur', function (e) {
                        $(this).removeClass("focusOutline").removeAttr("tabindex");
                    });

                    $("div.owl-next > a > .icon-carousel-right", elem).on('blur', function (e) {
                        $(this).removeClass("focusOutline").removeAttr("tabindex");
                    });

                    $("div.owl-next > a > .icon-carousel-right", elem).on('keydown', function (e) {
                        e.preventDefault();
                        var _this = $(this);
                        var module_carousel = $(".module-contactcarousel").parents(".mid-row");
                        if (e.shiftKey && e.which === 9) {
                            if (isOSXSafari) {
                                _this.removeClass("focusOutline-arrow").removeAttr("tabindex");
                                $("div.owl-prev > a > .icon-carousel-left" , elem ).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                            } else {
                                _this.removeClass("focusOutline").removeAttr("tabindex");
                                $("div.owl-prev > a > .icon-carousel-left" , elem ).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            }
                        } else if (e.which === 9) {
                            if (isOSXSafari) {
                                _this.removeClass("focusOutline-arrow").removeAttr("tabindex");
                            } else {
                                _this.removeClass("focusOutline").removeAttr("tabindex");
                            }

                            if ($(".module-tmpl-services-landing-r").length !== 0) {
                                if($(".module-contactcarousel").parents(".col-full-height").next(".col-full-height").find(".btn-cta:first").length !== 0){
                                    $(".module-contactcarousel").parents(".col-full-height").next(".col-full-height")
                                    .find(".btn-cta:first").attr("tabindex", "-1").trigger('focus');
                                }else{
                                    _this.removeClass("focusOutline").removeAttr("tabindex").parents(".col-full-height").next(".col-full-height").attr("tabindex", "-1").trigger('focus');
                                }
                            } else if ($(".module-tmpl-industry").length !== 0) {
                                $(".module-contactcarousel").parent().next().find(".btn-cta").first().attr("tabindex", "-1").trigger('focus');
                            } else if ($(".module-tmpl-location-details").length !== 0 &&
                                $(module_carousel).find("section").last().hasClass("module-contactcarousel") &&
                                ($(module_carousel).next(".mid-row").find("section").first().hasClass("module-googlemap") ||
                                    $(module_carousel).next(".mid-row").find("section").first().hasClass("module-image") ||
                                    $(module_carousel).next(".mid-row").find("section").first().hasClass("module-bodytext"))) {
                                $(".module-footer").find("li").first().attr("tabindex", "-1").addClass("focusOutline").find("a").trigger('focus');
                            } else {
                                $(".module-contactcarousel").parent().next().find("a").first().trigger('focus');
                            }
                        } else if (e.which === 37) {
                            owlObj.prev();
                        } else if (e.which === 39) {
                            owlObj.next();
                        }
                    });

                    $(".contactcarousel-tab-exit", elem).on('focus', function (e) {
                        e.preventDefault();
                        if (isOSXSafari) {
                            $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                        } else {
                            $("div.owl-next > a > .icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        }
                    });
                }
                if($('.contactcarousel-item', elem).length === 1) {
                    $('.contactcarousel-item').addClass('contact-cell-hover');
                }
                if (isSOLR) {

                    $(".contactcarousel-item").find("a").on("click", function (evt) {
                        var regex = /(<([^>]+)>)/ig,
                            analyticsLog = "ContactCarousel" + '_' + $(evt.currentTarget).html().toLowerCase().replace(regex, "");
                        Helpers.triggerTracking({
                            'linkLocationID1': analyticsLog,
                            'linkLocationID2': analyticsLog,
                            'linkLocation1': "ContactCarousel",
                            'linkLocation2': "ContactCarousel",
                            'events': 'event11'
                        }, 'Internal Link');
                    });
                }
                Helpers.triggerTracking({
                    "slideImpression": "ContactCarousel_slide1"
                }, "Slideshow Impression");

                setTimeout(function () {
                    $('img.lazy', elem).unveil();
                }, 150);
            }

            // Clamping for desktop Title & Description
            /*var viewportWidth = screen.width,
                viewportElement = document.getElementById("kpmgViewport");

            if (viewportWidth > 640) {

                var clampTitle = $(".contactcarousel-container", elem);
                clampTitle.attr('style', '');
                if (clampTitle.is(':visible')) {
                    clampTitle.dotdotdot({
                        ellipsis: '...',
                        height: 14 * 4,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                }
                var clampDesc = $(".contactcarousel-item-partnerDescription", elem);
                clampDesc.attr('style', '');
                if (clampDesc.is(':visible')) {
                    clampDesc.dotdotdot({
                        ellipsis: '...',
                        height: 14 * 7,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                }
            }

            /*
             * If it is manual carousel get data from AEM
             * If it is auto carousel get data from SOLR
             *
             */
            if (!isManual) {
                var autocarouselComp = 'autocarousel';
                serviceSOLR = new Service('ContactCarousel', options);
                autoCarouselTemplate = PrecompiledHandlebars[autocarouselComp];

                serviceSOLR.SOLRFetch(function resultHandler (data) {
                    var wraper = $('.module-contactcarousel'),
                        _title = wraper.data('title'),
                        contactKey = wraper.data('contact-key');
                    if (typeof data !== 'undefined' && data !== undefined) {
                        var par = JSON.parse($('.contactcarouselconfig').attr('contactcarouselrendition'));
                        $.each(data, function (index, currentData) {
                            currentData.imageGalleryConfig = par.imageGalleryConfig;
                            currentData.imageGalleryConfigExists = par.imageGalleryConfigExists;
                        });
                        dataSOLR.results = data;
                        dataSOLR.meta = {
                            carouselTitle: _title,
                            carouselContatKey: contactKey
                        };
                        if (kpmgAssetDomain) {
                            dataSOLR = $.extend(true, dataSOLR, {
                                "assetDomainName": kpmgAssetDomain
                            });
                        }
                        autoCarouselElem.html(autoCarouselTemplate(dataSOLR));
                        window.picturefill(autoCarouselElem);
                        initCarousel(autoCarouselElem, carouselSettings, true);
                    } else {
                        autoCarouselElem.addClass('empty-data');
                    }
                }, 'results', $(elem).data("items"), 0);
            } else {
                initCarousel(manualCarouselElem, carouselSettings, false);
            }

            var trck = new Tracking(elem, 'ContactCarousel');
            $(document).trigger('template.loaded');
        };
        return ContactCarousel;
    }
);
