define(['jquery', 'underscore', 'handlebars', 'precompile', 'tracking', 'personalizationUtils', 'cqservice'],
    function ($, _, Handlebars, PrecompiledHandlebars, Tracking, PersonalizationUtils, cqservice) {
        'use strict';
        var Toppicks = function (elem) {
            var showToppicks = window.kpmgPersonalize.isSitePersonalize && PersonalizationUtils.privacyUtils.isAccepted(),
                isLoggedIn = PersonalizationUtils.accountUtils.isLoggedIn(),
                articles = getLastReadArticles(),
                queryStr, url;

            if (showToppicks && articles.length >= 4) {
                queryStr = getLastReadArticlesQueryStr(articles);
                url = getSOLRUrl(queryStr, articles);
                fetchRelatedArticles(url, handleResultsFromSOLR);
            }
            // removing extra spaces by hiding only on desktop
            // as mobile requires this placehoder to exist
            else if( !window.kpmg.isMobile && !window.kpmgPersonalize.misc.isAuthor ) {
                $("#toppicks-container").hide();
            }

            $('#toppicks-container').on('click', '.article > a', function () {
                $(this).parent().addClass("selected-article");
                var clonedElement = $('.module-toppicks').clone();
                clonedElement.find('.component-header').remove();
                clonedElement.find('.article').not('.selected-article').remove();
                var tracking = new Tracking(clonedElement, 'Toppicks'),
                    memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '',
                    articleTitle = $(this).find('.heading').text();
                if (memberFirm === "XX") {
                    memberFirm = "GLOBAL";
                }
                window.digitalData.page.pageInfo.industryPath = $(this).closest('[data-article-type]').attr('data-article-type');
                window.digitalData.page.article.articleDetails = articleTitle.concat(' | ', 'KPMG', ' | ', memberFirm);
                tracking.track('componentLink', articleTitle);
            });

            //Accessibiliy starts
            $('#toppicks-container').on('keyup','.article > a ', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).parent().addClass('focusOutline');
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                }
            });

            $('#toppicks-container').on('blur', '.article > a ', function (e) {
                $(this).parent().removeClass('focusOutline');
            });
            //Accessibiliy ends

            function handleResultsFromSOLR (data) {
                if (data && data.length === 4) {
                    var compName = 'toppicks',
                        template = PrecompiledHandlebars[compName],
                        finalHtml = template({
                            titleText: getTitleText(),
                            data: data,
                            kpmgAssetDomain: window.kpmgAssetDomain
                        }),
                        toppicksContainer;

                    $('.module-toppicks').replaceWith(finalHtml);

                    $('#toppicks-container').show();
                    $('.module-toppicks').show();

                    setTimeout(function () {
                        $('img.lazy').unveil();
                    }, 100);
                }
            }

            function getTitleText() {
                var name = window.kpmgPersonalize.i18n.customMsgs.you;

                if (isLoggedIn) {
                    var nameFormat = $(elem).data('name-format'),
                        nameSwitch = $(elem).data('name-switch'),
                        accountInfo = PersonalizationUtils.accountUtils.getInfo(),
                        firstName = accountInfo ? accountInfo.profile.firstName : '',
                        lastName = accountInfo ? accountInfo.profile.lastName : '';
                    if(nameSwitch){
                        name = (nameFormat === 'First Name') ? firstName : (lastName + ' ' + firstName);
                    }else{
                        name = (nameFormat === 'First Name') ? firstName : (firstName + ' ' + lastName);
                    }
                }

                return window.kpmgPersonalize.i18n.customMsgs.toppicksfor + ' ' + name;
            }

            function getLastReadArticles() {
                var locale = PersonalizationUtils.accountUtils.getLocale(),
                    key = '/' + locale.countryCode + '/' + locale.languageCode,
                    lastReadArticles = JSON.parse(localStorage.lastReadArticles || '{}');

                return (lastReadArticles[key] || []);
            }

            function fetchRelatedArticles(url, cb) {
                var options = {
                        baseUrl: url
                    },
                    service = new cqservice('relatedContent', options);
                service.SOLRFetch(cb, 'results', 4, 0);
            }

            function getLastReadArticlesQueryStr(articles) {
                var userInterests = PersonalizationUtils.accountUtils.getCategoryPreferences().split(','),
                    queryKeys = {
                        KPMG_Industry_ID_Loc: 'sl-industry-id-local',
                        KPMG_Topic_ID: 'sl-topics-id',
                        KPMG_Service_ID_Loc: 'sl-service-id-local'
                    },
                    queryArr = [];

                articles.forEach(function(article) {
                    Object.keys(queryKeys).forEach(function(queryKey) {
                        var tags, key;

                        if (article[queryKey]) {
                            tags = article[queryKey].split(',');
                            if (isLoggedIn) {
                                tags = _.intersection(tags, userInterests);
                            }
                            tags.forEach(function(tag) {
                                key = queryKeys[queryKey] + ':"' + tag + '"';
                                if (!_.contains(queryArr, key)) {
                                    queryArr.push(key);
                                }
                            });
                        }
                    });
                });
                //  building the query-tag from last-read articles when there are no common-zethis-ids for all the categories
                if (!queryArr.length && isLoggedIn) {
                    articles.forEach(function(article) {
                        Object.keys(queryKeys).forEach(function(queryKey) {
                            var tags, key;

                            if (article[queryKey]) {
                                tags = article[queryKey].split(',');
                                tags.forEach(function(tag) {
                                    key = queryKeys[queryKey] + ':"' + tag + '"';
                                    if (!_.contains(queryArr, key)) {
                                        queryArr.push(key);
                                    }
                                });
                            }
                        });
                    });
                }

                return queryArr.join(' | ');
            }

            function getSOLRUrl(queryStr, articles) {
                var ignoreList = ' -translatedurl:("' + articles[0].KPMG_URL + '" OR "' + articles[1].KPMG_URL + '" OR "'+ articles[2].KPMG_URL +'")',
                    solrQuery = $(elem).data('solr-query');

                return solrQuery.replace(/<Zthesid>/, queryStr)
                                .replace(/-id:\('<CurrentPage>'\)/, ignoreList);
            }
            
            // Keep the following line at the bottom of the toppicks function
            $(document).trigger('template.loaded');
        };

        return Toppicks;
    });
