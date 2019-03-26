/* global s, videojs  */
define(['jquery', 'clamp', 'tracking', 'helpers', 'owl', 'personalizationUtils'],
    function($, $clamp, Tracking, Helpers, Owl, PersonalizationUtils) {
        'use strict';
        var HeroCarousel = function(elem) {

            var tracking = new Tracking(elem, 'HeroCarousel');

            var userLoggedIn = PersonalizationUtils.accountUtils.isLoggedIn(),
                isSitePersonalize = window.kpmgPersonalize.isSitePersonalize,
                heroVariant = $('.module-herocarousel').hasClass('fullbleed') ? "fullbleed" : "marginalized",
                carouselVarient = $('.module-herocarousel .containerBanner').hasClass('bannerActivated') ? "containerBanner" : "slideShowFullBleed";

            if ($('.module-herocarousel').hasClass('videoBanner')) {
                heroVariant = "videoBanner";
                /*KPMGS-21436*/
                //$('.bannervideo-block').addClass('showBlock');
                $('.slideShowFullBleed').css('display', 'none');
                var videoElem = $('.module-herocarousel .bannervideo-block').find('video');
                if (videoElem) {
                    enableBCVideo(videoElem);
                    //code to trigger tracking on click of hero carousel video
                    $('.module-herocarousel').find('a').off('click').on('click',function(evt){
                        var LinkText = $(this).attr('title');
                        var trackingObj={
                            "linkLocationID1": LinkText.toString(),
                            "linkLocationID2": LinkText.toString(),
                            'linkLocation1': "HeroCarousel",
                            'linkLocation2': "HeroCarousel",
                            'events': 'event11'
                        };
                        Helpers.triggerTracking(trackingObj,'Internal Link');

                    });
                }

            } else if ($('.module-herocarousel').hasClass('gifBanner')) {
                heroVariant = "gifBanner";
                /*KPMGS-21436*/
                //$('.gifBanner_Block').addClass("showBlock");
                //code to trigger tracking on click of hero carousel gif
                $('.module-herocarousel').find('a').off('click').on('click',function(evt){
                    var LinkText = $(this).find('img').attr('title');
                    var trackingObj={
                        "linkLocationID1": LinkText.toString(),
                        "linkLocationID2": LinkText.toString(),
                        'linkLocation1': "HeroCarousel",
                        'linkLocation2': "HeroCarousel",
                        'events': 'event11'
                    };
                    Helpers.triggerTracking(trackingObj,'Internal Link');
                });
            }

            function enableBCVideo(elem) {
                var vPlayer = '',
                    element = $(elem),
                    mediaId = element.attr("data-video-id"),
                    elementID = "bannervideo_" + mediaId,
                    player = $("#" + elementID),
                    playerAccountID = player.data("account"),
                    playerEmbedID = player.data("embed"),
                    playerID = player.data("player"),
                    videoName = '',
                    videoDescription = '',
                    videoType = '',
                    cuePoints = [],
                    time = 0,
                    started = false,
                    hasFired = false,
                    reachedEnd = false,
                    brightCoveUrl = '//players.brightcove.net/' + playerAccountID + '/' + playerID + '_' + playerEmbedID + '/index.min';
                    //
                require.config({
                    'paths': {
                        'bcHeroCarousel': brightCoveUrl
                    }
                });
                //
                require(['bcHeroCarousel'], function() {
                    videojs(elementID).ready(function() {
                        vPlayer = this;
                        // listen for the "ended" event and play the video
                        vPlayer.on("ended", function() {
                            vPlayer.play();
                        });

                        // Listen for error events on a player instance:
                        vPlayer.on('error', function() {
                            // When your listener is invoked, check the error property on the player for details.
                            var error = vPlayer.error();
                            // Errors have a code and a message
                            if (error.code === -2) {
                                vPlayer.play();
                            }
                        });

                        // play the video first time after the metadata is loaded successfully
                        vPlayer.on('loadedmetadata', function(){
                            vPlayer.play();
                        });
                        //
                    });
                });
            }

            //

            //
            if (userLoggedIn && !!window.localStorage && isSitePersonalize) {
                var homePageBannerArticle = PersonalizationUtils.storeUtils.retrieveBannerArticleFromLocalStorage('home');
                if (!homePageBannerArticle) {
                    var zethisIds = PersonalizationUtils.accountUtils.getCategoryPreferences('all', 'country').split(',').join('|'),
                        locale = window.kpmgPersonalize.snp.params,
                        fetchParams = {
                            zethisIds: zethisIds,
                            site: locale.countryCode + '_' + locale.languageCode,
                            bannerFlag: true
                        };

                    // don't make the rest-call if there are no zethis-ids
                    if (!fetchParams.zethisIds || fetchParams.zethisIds.length === 0) {
                        initializeCarousel();
                        return;
                    }

                    PersonalizationUtils.storeUtils.fetchBannerArticles(fetchParams, 'personalized-results', resultHandler);
                } else {
                    initializePersonalizedHomePageBanner(homePageBannerArticle);
                }
            } else {
                initializeCarousel();

            }

            // private functions
            function setBreakpointEvtHandlers() {
                $(document).on('desktopBreakpoint', setSrcAndDataSrc);
                $(document).on('mobileBreakpoint', setSrcAndDataSrc);
            }

            function resultHandler(articles) {
                PersonalizationUtils.storeUtils.storeBannerArticlesInLocalStorage(articles);
                var homePageBannerArticle = PersonalizationUtils.storeUtils.retrieveBannerArticleFromLocalStorage('home');
                if (!!homePageBannerArticle) {
                    initializePersonalizedHomePageBanner(homePageBannerArticle);
                } else {
                    initializeCarousel();
                }
            }

            function handleCarouselImageHeight() {
                var fullbleedImgHeightDesktop = Math.floor(($('.module-herocarousel').width() * 350) / 1400),
                    fullbleedImgHeightMobile = Math.floor(($('.module-herocarousel').width() * 490) / 640),
                    marginalizedImgHeightMobile = Math.floor(($('.module-herocarousel').width() * 580) / 640);

                if (PersonalizationUtils.commonUtils.isMobile()) {
                    $('.fullbleed .slide img').css('height', fullbleedImgHeightMobile);
                    $('.marginalized .slide img').css('height', marginalizedImgHeightMobile);
                } else {
                    $('.fullbleed .slide img').css('height', fullbleedImgHeightDesktop);
                }
            }

            function initializePersonalizedHomePageBanner(article) {
                replaceHTML(article);
                initializeCarousel();
            }

            function initializeCarousel() {
                var carouselElem = $('.carousel', elem)[0];
                var animationBanner = $('.containerBanner');

                if (carouselElem && !animationBanner.hasClass('bannerActivated')) {
                    carouselElem.style.display = 'block';
                }

                $('.web-spinner').remove();
                //Set height property to maintain consistancy of carousel height when any of the image is not loaded
                handleCarouselImageHeight();

                var sliderLength = $(".carousel.slideShowFullBleed .slide").length,
                    owlOptions = {},
                    carouselElement = $('.slideShowFullBleed .owl-carousel');

                owlOptions = getCarouselOptions(sliderLength);
                carouselElement.on('initialized.owl.carousel', function(event) {
                    $(".module-herocarousel .owl-carousel .owl-item").css("display", "block");
                });

                carouselElement.owlCarousel(owlOptions);
                rearrangingOwlControls();
                setBreakpointEvtHandlers();
                setSrcAndDataSrc({
                    type: (PersonalizationUtils.commonUtils.isMobile()) ? 'mobileBreakpoint' : 'desktopBreakpoint'
                });

                //accessibility
                if (sliderLength > 1) {
                    // adding more context for screen reader
                    $(".icon-carousel-right", elem).attr("aria-label", $(".module-herocarousel").data("nextslidetext"));
                    $(".icon-carousel-left", elem).attr("aria-label", $(".module-herocarousel").data("prevslidetext"));

                    var owlObj = carouselElement.data('owlCarousel');
                    $(".herocarousel-tab-entry", elem).on('focus', function(e) {
                        e.preventDefault();
                        $(".icon-carousel-left", elem).attr("tabindex", "-1").trigger('focus');
                        $(".owl-prev", elem).addClass("focusOutline");
                    });
                    $(".icon-carousel-left", elem).on('keydown', function(e) {
                        e.preventDefault();
                        if (e.which === 9) {
                            $(".owl-prev", elem).removeClass("focusOutline");
                            $(".icon-carousel-right").attr("tabindex", "-1").trigger('focus');
                            $(".owl-next", elem).addClass("focusOutline");
                        }
                        if (e.which === 37) {
                            owlObj.prev();
                        }
                        if (e.which === 39) {
                            owlObj.next();
                        }
                        if (e.which === 9 && e.shiftKey) {
                            $(this).removeAttr("tabindex");
                            $(".owl-prev", elem).removeClass("focusOutline").removeAttr("tabindex");
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
                            $(".owl-next", elem).removeClass("focusOutline").removeAttr("tabindex");
                            if ($(".module-tmpl-services-landing-r").length !== 0 || $(".module-tmpl-industry").length !== 0 || $(".module-tmpl-peoplesublanding").length !== 0) {
                                $(".subnavigation-list-group-item").first().addClass("focusOutline").find("a").attr("tabindex", "-1").trigger('focus');
                            } else if ($(".module-tmpl-topic").length !== 0 || $(".module-tmpl-magazine").length !== 0) {
                                $(".module-herocarousel").parents(".row").next().find("a:first").trigger('focus').parent("li").attr("tabindex", "-1").addClass("focusOutline");
                            } else {
                                $(".module-herocarousel").parents(".row").next().find("a:first").trigger('focus').addClass("focusOutline");
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
                            $(".owl-next", elem).removeClass("focusOutline");
                            $(".icon-carousel-left").attr("tabindex", "-1").trigger('focus');
                            $(".owl-prev", elem).addClass("focusOutline");
                        }
                    });
                    $(".icon-carousel-left", elem).on('blur', function(e) {
                        $(this).removeAttr("tabindex");
                        $(".owl-prev", elem).removeClass("focusOutline");
                    });
                    $(".cta-align a").on('blur', function(e) {
                        $(this).removeAttr("tabindex").removeClass("focusOutline");
                    });
                    $(".icon-carousel-right", elem).on('blur', function(e) {
                        $(this).removeAttr("tabindex");
                        $(".owl-next", elem).removeClass("focusOutline");
                    });
                    $(".herocarousel-tab-exit", elem).on('focus', function(e) {
                        e.preventDefault();
                        $(".icon-carousel-right", elem).attr("tabindex", "-1").trigger('focus');
                        $(".owl-next", elem).addClass("focusOutline");
                    });
                } else {
                    $(".herocarousel-tab-entry", elem).attr("tabindex", "-1");
                    $(".herocarousel-tab-exit", elem).attr("tabindex", "-1");
                }

                $(".owl-item > a", elem).on('mouseenter',  function() {
                        $(".hero-carousel-description p", this).addClass("hover");
                    }).on('mouseleave', function() {
                        $(".hero-carousel-description p", this).removeClass("hover");
                    }
                );
            }

            function getCarouselOptions(sliderLength) {
                var heroCarouselImageFrequency = parseInt($(".module-herocarousel .carousel").attr('data-heroCarouselImageFrequency')),
                    singleSlideOptions = {
                        items: 1,
                        animateIn: false,
                        loop: false,
                        nav: false,
                        lazyLoad: true,
                        dots: false,
                        mouseDrag: false,
                        touchDrag: false
                    },
                    multipleSlideOptions = {
                        items: 1,
                        autoplay: heroCarouselImageFrequency && heroCarouselImageFrequency !== 0 && !isNaN(heroCarouselImageFrequency) ? true : false,
                        autoplayTimeout: heroCarouselImageFrequency,
                        animateIn: false,
                        loop: true,
                        autoplayHoverPause: true,
                        nav: true,
                        lazyLoad: true,
                        dots: true,
                        navText: ['<span class="icon-carousel-left">', '<span class="icon-carousel-right">']
                    };

                return (sliderLength > 1) ? multipleSlideOptions : singleSlideOptions;
            }

            function replaceHTML(selectedArticle) {
                var kpmgAssetDomain = window.location.origin,
                    readMoreText = window.kpmgPersonalize.i18n.customMsgs.readMore;
                var imgdesktop = "/jcr:content/renditions/cq5dam.web.1082.547.jpg",
                    imgmobile = "/jcr:content/renditions/cq5dam.web.640.580.jpg";

                if ((heroVariant === "videoBanner") || (heroVariant === "gifBanner")) {
                    return false;
                }

                if (heroVariant === 'fullbleed') {
                    imgdesktop = "/jcr:content/renditions/cq5dam.web.1400.350.jpg";
                    imgmobile = "/jcr:content/renditions/cq5dam.web.640.490.jpg";
                }
                var parsedHTML = $.parseHTML('<section class="module-herocarousel component self-contained component-trackable  ' + heroVariant + '">' +
                    //WEB-SPINNER
                    '<div class="web-spinner"> <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\' viewBox%3D\'0 0 1082 547\'%2F%3E" width="1082" height="547" class="desktop-only img-responsive"/> <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\' viewBox%3D\'0 0 640 580\'%2F%3E" width="640" height="580" class="mobile-only img-responsive"/> </div>' +

                    '<a href="javascript:void(0);" class="herocarousel-tab-entry no-highlight"></a>' +
                    '<div style="display:none" class="carousel has-slides" data-herocarouselimagefrequency="6000">' +
                    '<ul class="slides owl-carousel owl-loaded">' +
                    '<a href="' + kpmgAssetDomain + selectedArticle.KPMG_URL + '" title="' + selectedArticle.KPMG_Title + '">' +
                    '<li class="slide" data-slideno="0">' +
                    '<img style="color:blue;" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\' viewBox%3D\'0 0 1082 547\'%2F%3E" data-src="" data-mobile="' + kpmgAssetDomain + selectedArticle.KPMG_Image + imgmobile + '" data-desktop="' + kpmgAssetDomain + selectedArticle.KPMG_Image + imgdesktop + '" class="img-responsive owl-lazy" alt="' + selectedArticle.KPMG_Title + '" title="' + selectedArticle.KPMG_Title + '">' +
                    '<div class="caption-wrapper left ' + selectedArticle.KPMG_Font + '">' +
                    '<div class="caption-content">' +
                    '<div class="caption">' +
                    '<h2 class="slide-header mobile-only">' + selectedArticle.KPMG_Title + '</h2>' +
                    '<h2 class="slide-header desktop-only">' + selectedArticle.KPMG_Title + '</h2>' +
                    '<div class="hero-extra-padding desktop-only"></div>' +
                    '<div class="herocarousel-content">' +
                    '<div class="hero-carousel-description">' +
                    '<p class="mobile-only ' + selectedArticle.KPMG_Font + '">' + selectedArticle.KPMG_Short_Desc + '</p>' +
                    '<p class="desktop-only ' + selectedArticle.KPMG_Font + '">' + selectedArticle.KPMG_Short_Desc + '.</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>' +
                    '</a>' +
                    '</ul>' +
                    '</div>' +
                    '<a href="javascript:void(0);" class="herocarousel-tab-exit no-highlight"></a>' +
                    '</section>');

                $(elem).replaceWith(parsedHTML);
                elem = parsedHTML[0];
            }

            function setSrcAndDataSrc(evt) {
                var breakpoint = (evt.type === 'desktopBreakpoint') ? 'desktop' : 'mobile';
                $.each($(elem).find('[data-' + breakpoint + ']'), function(index, slideImg) {
                    var imgUrl = $(slideImg).attr('data-' + breakpoint);
                    $(slideImg).attr('data-src', imgUrl);
                    $(slideImg).attr('src', imgUrl);
                });
                clampComponent();
            }

            function clampComponent() {
                var $clampHeaderElems = $('.module-herocarousel .caption .slide-header desktop-only'),
                    $clampDescriptionElems = $('.module-herocarousel .caption p desktop-only'),
                    isMobile = window.kpmgPersonalize.personalizationUtils.commonUtils.isMobile();

                $(document).on('desktopBreakpoint', clampHeader);
                $(document).on('mobileBreakpoint', clampHeader);

                clampHeader();
                clampDescription();

                function clampHeader() {
                    $clampHeaderElems.each(function(index, element) {
                        $(this).attr('style', '');
                        if ($(this).is(':visible')) {
                            $(this).dotdotdot({
                                ellipsis: '...',
                                height: (!!isMobile) ? (36 * 3) : (54 * 3),
                                wrap: 'word',
                                fallbackToLetter: false,
                                watch: "window"
                            });
                        }
                    });
                }

                function clampDescription() {
                    $clampDescriptionElems.each(function(index, element) {
                        $(this).attr('style', '');
                        if ($(this).is(':visible')) {
                            $(this).dotdotdot({
                                ellipsis: '...',
                                height: 16 * 5,
                                wrap: 'word',
                                fallbackToLetter: false,
                                watch: "window"
                            });
                        }
                    });
                }
            }

            function rearrangingOwlControls() {
                $('.owl-nav', elem).detach().prependTo('.owl-stage-outer', elem);
            }

            //Modify image height to maintain aspect ratio
            $(window).on('resize',handleCarouselImageHeight);
            $(document).trigger('template.loaded');
        };
        return HeroCarousel;
    }
);
