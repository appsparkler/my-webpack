/* global s */
define(['jquery', 'tracking', 'addtolibrary'],
    function($, Tracking, AddToLibrary) {
        'use strict';
        var FeaturedArticles = function(elem) {
            $(document).on('desktopBreakpoint', function() {
                $('.title.visible-lg-FeatArticle', elem).attr('style', '');
                $('.title.visible-lg-FeatArticle', elem).each(function(idx, element) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 36 * 3,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                });
            });

            /* Clamping removed - BrandRefresh - Aparna
            $('.visible-lg-FeatArticleHead', elem).each(function(idx, element) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 18 * 3,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                });
            $(document).on('mobileBreakpoint', function() {
                $('.visible-xs-FeatArticle', elem).attr('style', '');
                $('.visible-xs-FeatArticle', elem).each(function(idx, element) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 14 * 5,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                });
            });
            */

            $('.inner-container').find('.module-featuredarticles').parent().addClass('promotional-cell-hover');
            $(elem).closest('.promotional-cell-hover').on('click', function(e) {
                var href = $('.module-featuredarticles').find('a').attr('href');
                if($(e.target).is("div") && href){
                    e.stopImmediatePropagation();
                    window.location.href = href;
                }
            });

            $('.inner-container .module-featuredarticles').closest('.promotional-cell-hover').attr('title', $('.inner-container .module-featuredarticles').find('a').attr('title'));

            var trck = new Tracking(elem, 'FeaturedArticles');
            $(document).trigger('template.loaded');

            // initialize the add to library funtionality
            AddToLibrary($('.module-addtolibrary', elem));
        };

        FeaturedArticles.templateId = 'template-featuredarticles';

        FeaturedArticles.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
            console.info("Rendering personalized DOM for FeaturedArticles component...");

            function dataFormatConvertor(snpData) {
                var isBlog = (snpData.KPMG_Template_Type.indexOf('touch-blog-post-template') > -1) ? true : false;
                return {
                    'hbs': {
                        'featuredArticles': {
                            'title': snpData.KPMG_Title,
                            'label':$($(authoredComp[0]).find('.alt-secondary-head')[0]).text(),
                            'shortTitle': snpData.KPMG_Title,
                            'description': snpData.KPMG_Description,
                            'shortDescription': snpData.KPMG_Short_Desc,
                            'imageUrl': snpData.KPMG_Image,
                            'primaryUrl': snpData.KPMG_URL,
                            'alt': snpData.KPMG_Title,
                            'fpRfpButtonText':$($(authoredComp[0]).find('.component-link')[0]).text(),
                            'fpRfpButtonLink': snpData.KPMG_URL,
                            'personalized': true,
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
        return FeaturedArticles;
    }
);
