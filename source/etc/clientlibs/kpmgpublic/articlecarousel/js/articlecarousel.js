/* global s */
/* global kpmgAssetDomain */
/* global calanderProperties */
/* global dateFormatProperties */
define(['jquery', 'tracking', 'handlebars', 'precompile', 'cqservice','helpers', 'owl', 'handlebarshelpers', 'clamp'],
        function ($, Tracking, Handlebars, PrecompiledHandlebars, Service, Helpers, $clamp) {
            'use strict';
            var ArticleCarousel = function (elem) {
                var wraper = $('.module-articlecarousel'),
                    manualCarouselElem = $('.articlecarousel-owl-carousel.manual-carousel'),
                    autoCarouselElem = $('.articlecarousel-owl-carousel.auto-carousel'),
                    autoCarouselTpl = $('#Article-autoCarousel-partial'),
                    options = {
                        baseUrl: autoCarouselElem.data("path")
                    },
                    showTime = wraper.data("showTime"),
                    serviceSOLR = null,
                    autoCarouselTemplate = null,
                    dataSOLR = {},
                    isManual = wraper.data('is-manual') || wraper.data('is-manual') === 'true' ? true : false,
                    carouselSettings = {
                        items: 1,
                        slideSpeed: 300,
                        paginationSpeed: 400,
                        loop: true,
                        autoplay: true,
                        nav: true,
                        navText: ['<span class="icon-carousel-left">', '<span class="icon-carousel-right">']
                    },
                    isOSXSafari = Helpers.isOSXSafari();
                if(dateFormatProperties && showTime) {
                    $.merge(dateFormatProperties.fields, [{"item4":"time"}]);
                }
                //$wrap = $('.articlecarousel-owl-carousel', elem);
                //$wrap.attr('style', 'width:' + $(elem).width() + 'px');
                function initCarousel(_this, settings, isSOLR) {
                    if ($(".articlecarousel-item", elem).length === 1)
                    {
                        $('.articlecarousel-item-description', elem).addClass('articlecarousel-singleItem-description');
                        $(".articlecarousel-tab-entry", elem).attr("tabindex", "-1");
                        $(".articlecarousel-tab-exit", elem).attr("tabindex", "-1");
                        $(".articlecarousel-owl-carousel").addClass('owl-loaded');
                    }
                    else {
                        var $owl = $(".articlecarousel-owl-carousel", elem).owlCarousel(settings);
                        $owl.on('changed.owl.carousel', function (evt) {
                            Helpers.triggerTracking({"slideImpression": "articlecarousel_slide" + ($(".active", elem).find('.articlecarousel-item').data("slideno") + 1)}, "Slideshow Impression");
                        });

                        $('.module-articlecarousel .owl-prev', elem).addClass('icon-carousel-left');
                        $('.module-articlecarousel .owl-next', elem).addClass('icon-carousel-right');
                        if($('.articlecarousel').length > 0) {
                            $('.module-articlecarousel').parent().parent().css("position","relative");
                        } else {
                            $('.module-articlecarousel').parent().css("position","relative");
                        }

                        //Accessibiliy
                        var owlObj = $owl.data('owlCarousel');
                        $(".articlecarousel-tab-entry", elem).on('focus', function(e) {
                            e.preventDefault();
                            if (isOSXSafari) {
                                $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                            } else {
                                $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            }
                        });

                        $(".icon-carousel-left", elem).on('keydown', function(e) {
                            e.preventDefault();
                            var _this = $(".icon-carousel-left", elem);
                            if (e.which === 9) {
                                if (isOSXSafari) {
                                    _this.removeClass("focusOutline-arrow");
                                } else {
                                    _this.removeClass("focusOutline");
                                }
                            }
                            if (e.which === 37) {
                                owlObj.prev();
                            }
                            if (e.which === 39) {
                                owlObj.next();
                            }
                            if (e.which === 9 && e.shiftKey) {
                                if (isOSXSafari) {
                                    _this.removeClass("focusOutline-arrow").removeAttr("tabindex");
                                } else {
                                    _this.removeClass("focusOutline").removeAttr("tabindex");
                                }
                                $(".nav-primary-menu>li:last").attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            }
                        });

                        $(".icon-carousel-left", elem).on('blur', function(e) {
                            $(this).removeClass("focusOutline").removeAttr("tabindex");
                        });

                        $(".icon-carousel-right", elem).on('blur', function(e) {
                            $(this).removeClass("focusOutline").removeAttr("tabindex");
                        });

                        $(".articlecarousel-item .btn-cta", elem).on('blur', function(e) {
                            $(this).removeClass("focusOutline").removeAttr("tabindex");
                        });

                        $(".articlecarousel-item .btn-cta", elem).on('keydown', function(e) {
                            e.preventDefault();
                            var _thisLink = $(e.target).parent().parent("a").attr("href");
                            if (e.which === 9) {
                                $(this).removeClass("focusOutline");
                                if (isOSXSafari){
                                    $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                                } else {
                                    $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                                }
                            }
                            if (e.which === 9 && e.shiftKey) {
                                $(this).removeClass("focusOutline").removeAttr("tabindex");
                                if (isOSXSafari) {
                                    $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                                    $(".icon-carousel-right", elem).removeClass("focusOutline-arrow");
                                } else {
                                    $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                                    $(".icon-carousel-right", elem).removeClass("focusOutline");
                                }
                            }
                            if (e.which === 13 && typeof(_thisLink) !== "undefined" && _thisLink !=="") {
                                window.location.href =  _thisLink;
                            }
                        });
                        $(".icon-carousel-right", elem).on('keydown', function(e) {
                            e.preventDefault();
                            var _this = $(this);
                            if (e.which === 9) {
                                if (isOSXSafari){
                                    _this.removeClass("focusOutline-arrow").removeAttr("tabindex");
                                } else {
                                    _this.removeClass("focusOutline").removeAttr("tabindex");
                                }
                                $(".module-articlecarousel").parent().next().find("a").first().trigger('focus');
                            }
                            if (e.which === 37) {
                                owlObj.prev();
                            }
                            if (e.which === 39) {
                                owlObj.next();
                            }
                            if (e.which === 9 && e.shiftKey) {
                                if (isOSXSafari){
                                    _this.removeClass("focusOutline-arrow").removeAttr("tabindex");
                                } else {
                                    _this.removeClass("focusOutline").removeAttr("tabindex");
                                }
                            }
                        });
                        $(".articlecarousel-tab-exit", elem).on('focus', function(e) {
                            e.preventDefault();
                            if (isOSXSafari){
                                $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline-arrow");
                            } else {
                                $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            }
                        });
                        if ($(document).width() <= 640) {
                            $(".owl-item", elem).css("height", $(".owl-stage-outer", elem).height() + 20);
                        }
                    }
                    $(".dateformat", elem).each(function(index) {
                        var _this = $(this), formatedDate;
                        if(calanderProperties && dateFormatProperties) {
                            formatedDate = Helpers.dateFormat(_this.attr('data-publishedDate'),calanderProperties, dateFormatProperties);
                            _this.text(formatedDate);
                        } else {
                            formatedDate = _this.attr('data-publishedDate');
                            _this.text(formatedDate);
                        }
                    });
                    if(isSOLR){
                        $(".articlecarousel-item").find("a").on("click", function(evt) {
                            var regex = /(<([^>]+)>)/ig,
                                analyticsLog = "ArticleCarousel" + '_' + $(evt.currentTarget).html().toLowerCase().replace(regex, "");
                            Helpers.triggerTracking({
                                'linkLocationID1': analyticsLog,
                                'linkLocationID2': analyticsLog,
                                'linkLocation1': "ArticleCarousel",
                                'linkLocation2': "ArticleCarousel",
                                'events': 'event11'
                            }, 'Internal Link');
                        });
                    }
                    Helpers.triggerTracking({"slideImpression": "articlecarousel_slide1"}, "Slideshow Impression");

                    setTimeout(function () {
                        $('img.lazy', elem).unveil();
                    }, 150);
                }
                // Clamping for desktop Title & Description
                /*var viewportWidth = screen.width,
                viewportElement = document.getElementById("kpmgViewport");

                if (viewportWidth > 640) {

                    var clampHead = $(".articlecarousel-item-partnerDescription.articlecarousel-details", elem);
                    clampHead.attr('style', '');
                    if (clampHead.is(':visible')) {
                        clampHead.dotdotdot ({
                            ellipsis    : '...',
                            height      : 16 * 4,
                            wrap        : 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    }
                    var clampDesc = $(".articlecarousel-item-partnerDescription.articlecarousel-desc", elem);
                    clampDesc.attr('style', '');
                    if (clampDesc.is(':visible')) {
                        clampDesc.dotdotdot ({
                            ellipsis    : '...',
                            height      : 14 * 7,
                            wrap        : 'word',
                            fallbackToLetter: false,
                            watch: "window"
                        });
                    }
                }*/
                /*
                 * If it is manual carousel get data from AEM
                 * If it is auto carousel get data from SOLR
                 *
                 */
                if (!isManual) {
                    var autocarouselComp = 'articlecarousel-autocarousel';
                    serviceSOLR = new Service('ContactCarousel', options);
                    autoCarouselTemplate = PrecompiledHandlebars[autocarouselComp];
                    /*
                     * (1) Calll SORL service
                     * (2) push response data to handle bar template
                     */
                    serviceSOLR.SOLRFetch(function (data) {
                        var _title = wraper.data('title'),
						readMoreKey = wraper.data('readmorelabel');
                        if (typeof data !== 'undefined' && data !== undefined) {
							var par = JSON.parse($('#articlecarouselconfig').attr('articlecarouselrendition'));
							$.each(data,function(index,currentData){
                                currentData.imageGalleryConfig= par.imageGalleryConfig;
								currentData.imageGalleryConfigExists=par.imageGalleryConfigExists;
							});
                            dataSOLR.results = data;
                            dataSOLR.meta = {carouselTitle: _title,
							readMoreLabel: readMoreKey};
                            if(kpmgAssetDomain){
                                dataSOLR = $.extend(true, dataSOLR, {"assetDomainName" : kpmgAssetDomain});
                            }
                            if(calanderProperties && dateFormatProperties) {
                                $.each(dataSOLR.results, function(index, val) {
                                    dataSOLR.results[index].publishedDate = Helpers.dateFormat(dataSOLR.results[index].publishedDate, calanderProperties, dateFormatProperties);
                                });
                            }
                            autoCarouselElem.html(autoCarouselTemplate(dataSOLR));
							window.picturefill(autoCarouselElem);
                            initCarousel(autoCarouselElem, carouselSettings, true);
                        } else {
                            autoCarouselElem.addClass('empty-data');
                        }
                    }, 'results', $(elem).data("items"), 0);
                }
                else {
                    initCarousel(manualCarouselElem, carouselSettings, false);
                }
                /*function clampText() {
                    var $clampAuthor = $('.articlecarousel-item-partnerDescription');
                    $clampAuthor.each(function(data, element) {
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

                }*/
                // Keep the following line at the bottom of the ArticleCarousel function
                var trck = new Tracking(elem, 'ArticleCarousel');
                $(document).trigger('template.loaded');
                //clampText();
            };
            return ArticleCarousel;
        }
);
