define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils', 'resendVerificationEmail'],
    function($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, PersonalizationUtils, resendVerificationEmail) {
        'use strict';

        var TmplTouchBlogPost = function(elem) {
            var nav             = new Navigation(),
                footer          = new Footer(),
                navflyouta       = new NavFlyoutA(),
                navflyoutb       = new NavFlyoutB(),
                navflyoutc       = new NavFlyoutC(),
                $components     = $('.component');

            $.each($components, function(index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));

                require([module], function(mod) {
                    mod(val);
                });
            });

            function addToLastReadArticles() {
                var locale = PersonalizationUtils.accountUtils.getLocale(),
                    key = '/' + locale.countryCode + '/' + locale.languageCode,
                    articleMetaObject = PersonalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
                    value = {
                        'KPMG_Industry_ID_Loc': articleMetaObject.KPMG_Industry_ID_Loc || '',
                        'KPMG_Service_ID_Loc': articleMetaObject.KPMG_Service_ID_Loc || '',
                        'KPMG_Topic_ID': articleMetaObject.KPMG_Topic_ID || '',
                        'KPMG_URL': '/content/kpmgpublic' + articleMetaObject.KPMG_URL
                    },
                    lastReadArticles = JSON.parse(localStorage.lastReadArticles || '{}'),
                    temp = 0;

                lastReadArticles[key] = lastReadArticles[key] || [];
                lastReadArticles[key].forEach(function(article) {
                    if (article.KPMG_URL === value.KPMG_URL) {
                        temp = temp + 1;
                        return;
                    }
                });
                if(temp === 0) {
                    lastReadArticles[key].unshift(value);
                }
                if (lastReadArticles[key].length > 4) {
                    lastReadArticles[key].length = 4;
                }
                localStorage.lastReadArticles = JSON.stringify(lastReadArticles);
            }

            if(window.kpmgPersonalize.oppModalVerified) {
                if(!window.kpmgPersonalize.rsOppShown && !window.kpmgPersonalize.rsGenericShown) {
                    resendVerificationEmail.validate();
                }
            } else {
                document.addEventListener("oppModal", function() {
                    if(!window.kpmgPersonalize.rsOppShown && !window.kpmgPersonalize.rsGenericShown) {
                        resendVerificationEmail.validate();
                    }
                });
            }

            addToLastReadArticles();

            $(document).trigger('template.loaded');
            // Loads the reflow script for mobile component reflow
            require(['jquerymobilereflow']);
        };

        $(function(){
            var tmpl = new TmplTouchBlogPost();
        });
    }
);
