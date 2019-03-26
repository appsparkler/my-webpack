define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils'],
    function($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, PersonalizationUtils) {
        'use strict';

        var TmplHtml = function(elem) {
            var nav             = new Navigation(),
                footer          = new Footer(),
                navflyouta       = new NavFlyoutA(),
                navflyoutb       = new NavFlyoutB(),
                navflyoutc       = new NavFlyoutC(),
                $components     = $('.component');

            this.mountComponents = function (cName) {
                var component = cName || '.component';
                var $components = $(component);
                $.each($components, function (index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));
                    require([module], function (mod) {
                        mod(val, module);
                    });
                });
            };

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

            this.mountComponents();
            addToLastReadArticles();
            $(document).trigger('template.loaded');
        };

        $(function () {
            window.kpmg = window.kpmg || {};
            window.kpmg.template = window.kpmg.template || {};
            var tmpl = window.kpmg.template.html = new TmplHtml();
        });

    }
);
