define(['jquery', 'tracking', 'personalizationUtils', 'addtolibrary', 'contentrefreshctas', 'genericErrorDialog'],
    function ($, Tracking, personalizationUtils, AddToLibrary, Contentrefreshctas, genericErrorDialog) {
        'use strict';
        var logger = personalizationUtils.loggerUtils;

        var Dashboardarticle = function (elem, componentName) {
            if (personalizationUtils.commonUtils.isDomInitialized(elem)) {
                return;
            }
            personalizationUtils.commonUtils.initializeDom(elem);

            // Keep the following lines at the bottom of the Dashboardarticle function
            var tracking = new Tracking(elem, 'Dashboardarticle');
            $(".indicator-share", elem)
                .attr("id", personalizationUtils.commonUtils.generateUniqueId("dashboardarticle"))
                .on('click', GigyaShareHandler);

            $(".content-refresh-cta", elem)
                .on('click', function() {
                    $('.content-refresh-slider').addClass('slide-down');
                    $('.content-refresh-slider', elem).removeClass('slide-down').attr('data-url', $(this).data('url'));
                });

            //accessibility
            $(elem).on("keyup", ".content-refresh-cta", function (e) {
                var keyCode = e.which || e.keyCode;
                if (keyCode === 13) {
                    $(this).trigger("click");
                }
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
                    articleTitle = $('.module-dashboardarticle').find('.tertiary-head').text();
                if (memberFirm === "XX") {
                    memberFirm = "GLOBAL";
                }
                // window.digitalData.page.pageInfo.industryPath = $(this).closest('[data-article-type]').attr('data-article-type');
                window.digitalData.page.article.articleDetails = articleTitle.concat(' | ', 'KPMG', ' | ', memberFirm);
                personalizationUtils.dashboardUtils.handleGigyaShare(this, tracking, componentName);
            }

            if (window.kpmgPersonalize.misc.isAuthor) {
                $("img", elem).css("display", "none");
            }

            //Initialize Content refresh component
            Contentrefreshctas($('.module-contentrefreshctas', elem));

            // initialize the add to library funtionality
            AddToLibrary($('.module-addtolibrary', elem));

            $(document).trigger('template.loaded');
        };

        Dashboardarticle.templateId = "template-dashboardarticle";

        Dashboardarticle.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
            logger.info("Rendering personalized DOM for Dashboardarticle component...");

            function dataFormatConvertor(snpData) {
                var localeObj = personalizationUtils.accountUtils.getLocale(),
                    locale = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
                    kpmgFlyoutJSON = JSON.parse(sessionStorage.myKpmgFlyoutJSON || '{}'),
                    interestsPageURL = kpmgFlyoutJSON[locale] && kpmgFlyoutJSON[locale].links.interests.url,
                    isBlog = (snpData.KPMG_Template_Type.indexOf('touch-blog-post-template') > -1) ? true : false;

                return {
                    'hbs': {
                        'dashboardarticle': {
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
                            'dontshowarticleagain': (window.kpmgPersonalize.i18n.customMsgs.dontshowarticleagain).replace(/&#x27;/g, "'"),
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

        return Dashboardarticle;
    }
);
