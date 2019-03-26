define(['jquery', 'tracking', 'personalizationUtils', 'addtolibrary', 'contentrefreshctas'],
    function ($, Tracking, personalizationUtils, AddToLibrary, Contentrefreshctas) {
        'use strict';
        var logger = personalizationUtils.loggerUtils;
        var colorCodes = ["#483698", "#005eb8", "#00a3a1"];

        var Widedashboardarticle = function (elem, componentName) {
            if (personalizationUtils.commonUtils.isDomInitialized(elem)) {
                return;
            }
            personalizationUtils.commonUtils.initializeDom(elem);

            $("a.image-holder", elem).on('click', (function () {
                var lastClick = 0;
                return function (event) {
                    if (personalizationUtils.commonUtils.isMobile()) {
                        var now = Date.now(),
                            diff = now - lastClick;
                        lastClick = now;
                        if (diff > 250) {
                            event.preventDefault();
                            $(this).parent().toggleClass("show-desc");
                        }
                    }
                };
            })());

            $(".indicator-share", elem)
                .attr("id", personalizationUtils.commonUtils.generateUniqueId("widedashboardarticle"))
                .on('click', GigyaShareHandler);

            $(".content-refresh-cta", elem)
                .on('click', function() {
                    $('.content-refresh-slider').addClass('slide-down');
                    $('.content-refresh-slider', elem).removeClass('slide-down').attr('data-url', $(this).data('url'));
                });

            function GigyaShareHandler() {
                tracking.satelliteTracking({
                    'user': {
                        gigyaID: personalizationUtils.accountUtils.getInfo().UID
                    },
                    'list': {
                        ArticleShareLocation: "Component",
                        interactionType: 'Article Interaction'
                    }
                }, 'SocialShare', false);
                var memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '',
                    articleTitle = $('.module-widedashboardarticle').find('.hover-info-container>a>p').text();
                if (memberFirm === "XX") {
                    memberFirm = "GLOBAL";
                }
                // window.digitalData.page.pageInfo.industryPath = $(this).closest('[data-article-type]').attr('data-article-type');
                window.digitalData.page.article.articleDetails = articleTitle.concat(' | ', 'KPMG', ' | ', memberFirm);
                personalizationUtils.dashboardUtils.handleGigyaShare(this, tracking, componentName);
            }

            $(".hover-info-container", elem)
                .css("background-color", colorCodes[Math.ceil(Math.random() * colorCodes.length) - 1]);

            if (window.kpmgPersonalize.misc.isAuthor) {
                $("img", elem).css("display", "none");
            }

            //Initialize Content refresh component
            Contentrefreshctas($('.module-contentrefreshctas', elem));

            // initialize the add to library funtionality
            AddToLibrary($('.module-addtolibrary', elem));

            // Keep the following lines at the bottom of the Widedashboardarticle function
            var tracking = new Tracking(elem, 'Widedashboardarticle');
            $(document).trigger('template.loaded');
        };

        Widedashboardarticle.templateId = "template-widedashboardarticle";

        Widedashboardarticle.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
            logger.info("Rendering personalized DOM for Widedashboardarticle component...");

            function dataFormatConvertor(snpData) {
                var localeObj = personalizationUtils.accountUtils.getLocale(),
                    locale = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
                    kpmgFlyoutJSON = JSON.parse(sessionStorage.myKpmgFlyoutJSON || '{}'),
                    interestsPageURL = kpmgFlyoutJSON[locale] && kpmgFlyoutJSON[locale].links.interests.url,
                    isBlog = (snpData.KPMG_Template_Type.indexOf('touch-blog-post-template') > -1) ? true : false;

                return {
                    'hbs': {
                        'widedashboardarticle': {
                            'title': snpData.KPMG_Title,
                            'shortTitle': snpData.KPMG_Title,
                            'longDescription': snpData.KPMG_Description,
                            'shortDescription': snpData.KPMG_Short_Desc,
                            'imageFileReference': snpData.KPMG_Image,
                            'primaryUrl': snpData.KPMG_URL,
                            'altText': snpData.KPMG_Title,
                            'saved': snpData.savedArticle || false,
                            'personalized': true,
                            'addtolibrary': window.kpmgPersonalize.i18n.customMsgs.addtolibrary,
                            'refreshcontent': window.kpmgPersonalize.i18n.customMsgs.refreshcontent,
                            'share': window.kpmgPersonalize.i18n.customMsgs.share,
                            'showanotherarticle': window.kpmgPersonalize.i18n.customMsgs.showanotherarticle,
                            'dontshowarticleagain': (window.kpmgPersonalize.i18n.customMsgs.dontshowarticleagain).replace(/&#x27;/g,"'"),
                            'updatemypreferences': window.kpmgPersonalize.i18n.customMsgs.updatemypreferences,
                            'myinterests': interestsPageURL,
                            'articleType': snpData.KPMG_Article_Type,
                            'isBlog': isBlog
                        },
                        'globalValues': {
                            'assetDomainName': window.kpmgAssetDomain
                        }
                    }
                };
            }

            var supportedDataArr = snpDataArr.map(dataFormatConvertor);

            return $(handleBarTemplateFn(supportedDataArr[0]));
        };

        return Widedashboardarticle;
    }
);
