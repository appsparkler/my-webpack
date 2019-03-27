define(['common-utils', 'jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils'],
function(CommonUtils, $, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, personalizationUtils) {
    'use strict';

    var TmplInsightsFlex = function(elem) {
        var nav             = new Navigation(),
            footer          = new Footer(),
            navflyouta       = new NavFlyoutA(),
            navflyoutb       = new NavFlyoutB(),
            navflyoutc       = new NavFlyoutC(),
            $components     = $('.component');
        //
        CommonUtils.initializeAllComponents($components, initializeTemplate);
        //
        function initializeTemplate(){
            CommonUtils.fixChromeIssueForAuthor('.module-tmpl-insights-flex');
            addToLastReadFlexTemplates();
            // Menthod after all component for the template have been loaded
            $('.promotional-cell-hover').removeClass('promotional-cell-hover');
            $('[class^="module-promotional"]').each(function(){
                $(this).parent().removeClass('clearfix');
                $(this).addClass('promotional-cell-hover');
            });
            //
            if(!window.kpmgPersonalize.misc.isAuthor){
                if($('.cell4').has('section').length === 0 ){
                    if (!personalizationUtils.commonUtils.isMobile()) {
                        $('.cell5 .parsys-row').each( function() {
                            if ($(this).has('.module-bodytext').length || $(this).has('.module-image').length || $(this).has('.module-quote').length || $(this).has('.module-htmlcontainer').length || $(this).has('.module-inlinelist').length || $(this).has('.module-enhanceddownload').length || $(this).has('.module-promotionalb').length || $(this).has('.module-promotionalc').length || $(this).has('.module-promotionald').length || $(this).has('.module-promotionale').length || $(this).has('.module-audiovideo').length) {
                                $(this).addClass('col-md-12').addClass('no-gutter');
                            } else {
                                $(this).addClass('col-md-8').addClass('col-md-push-4');
                            }
                        });
                        $('.module-audiovideo .video-js').addClass("responsive");
                    }

                    $('.cell4').remove();
                    $('.cell5').removeClass('col6');
                }
            }
            // Remove tabindex attribute from child div in registration component -- not needed on this page
            $(".module-registration-promo .promo-wrapper").removeAttr("tabindex");
            function addToLastReadFlexTemplates() {
                var locale = personalizationUtils.accountUtils.getLocale(),
                    key = '/' + locale.countryCode + '/' + locale.languageCode,
                    articleMetaObject = personalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
                    value = {
                        'KPMG_Industry_ID_Loc': articleMetaObject.KPMG_Industry_ID_Loc || '',
                        'KPMG_Service_ID_Loc': articleMetaObject.KPMG_Service_ID_Loc || '',
                        'KPMG_Topic_ID': articleMetaObject.KPMG_Topic_ID || '',
                        'KPMG_URL': '/content/kpmgpublic' + articleMetaObject.KPMG_URL
                    },
                    lastReadFlexTemplates = JSON.parse(sessionStorage.lastReadFlexTemplates || '{}'),
                    temp = 0;

                lastReadFlexTemplates[key] = lastReadFlexTemplates[key] || [];
                lastReadFlexTemplates[key].forEach(function(article) {
                    if (article.KPMG_URL === value.KPMG_URL) {
                        temp = temp + 1;
                        return;
                    }
                });
                if(temp === 0) {
                    lastReadFlexTemplates[key].unshift(value);
                }
                if (lastReadFlexTemplates[key].length > 4) {
                    lastReadFlexTemplates[key].length = 4;
                }
                sessionStorage.lastReadFlexTemplates = JSON.stringify(lastReadFlexTemplates);
            }

            $(document).trigger('template.loaded');
        }
    };

    $(function(){
        var tmpl = new TmplInsightsFlex();
    });
}
);