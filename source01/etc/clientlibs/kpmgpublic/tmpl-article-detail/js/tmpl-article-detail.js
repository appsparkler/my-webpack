define(['common-utils', 'jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils', 'jquerymobilereflow'],
    function (CommonUtils, $, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, PersonalizationUtils) {
        'use strict';
        var TmplArticleDetail = function () {
            var nav = new Navigation(),
                footer = new Footer(),
                navflyouta = new NavFlyoutA(),
                navflyoutb = new NavFlyoutB(),
                navflyoutc = new NavFlyoutC(),
                $components = $('.component');

            function initialize() {
                CommonUtils.fixChromeIssueForAuthor('.module-tmpl-article-detail');
                addToLastReadArticles();
                showPrint();
            }

            function showPrint() {
                var $image = $('.module-image img','.display-full-width'),
                isPrintable = $('.template').hasClass('printable'),
                loadCounter = $image.length;

                // make sure the images are loaded so that print shows images
                if(isPrintable) {
                    // if no image then directly call print
                    if(loadCounter === 0) {
                        window.print();
                    } else {
                        // wait for all image to load
                        $image.on('load', function() {
                            loadCounter--;
                            if(loadCounter === 0) {
                                setTimeout(window.print, 250);
                            }
                        });
                    }
                }
            }

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
                    lastReadFlexTemplates = JSON.parse(sessionStorage.lastReadFlexTemplates || '{}'),
                    temp = 0,
                    temp1 = 0;

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

                //Add to last read flex templates
                lastReadFlexTemplates[key] = lastReadFlexTemplates[key] || [];
                lastReadFlexTemplates[key].forEach(function(article) {
                    if (article.KPMG_URL === value.KPMG_URL) {
                        temp1 = temp1 + 1;
                        return;
                    }
                });
                if(temp1 === 0) {
                    lastReadFlexTemplates[key].unshift(value);
                }
                if (lastReadFlexTemplates[key].length > 4) {
                    lastReadFlexTemplates[key].length = 4;
                }
                sessionStorage.lastReadFlexTemplates = JSON.stringify(lastReadFlexTemplates);
            }
            //
            CommonUtils.initializeAllComponents($components, initialize);

            // IE specific hover border handling for continous promotional parsys
            if( !!document.documentMode ) {
                $('.module-tmpl-article-detail').find('.parsys-row').addClass("full-IE-height");
            }
            else {
                $('.module-tmpl-article-detail').find('.parsys-row').removeClass("full-IE-height");
            }


            $(document).trigger('template.loaded');

            // Loads the reflow script for mobile component reflow
            require(['jquerymobilereflow']);
        };

        $(function () {
            var tmpl = new TmplArticleDetail();
        });
    }
);
