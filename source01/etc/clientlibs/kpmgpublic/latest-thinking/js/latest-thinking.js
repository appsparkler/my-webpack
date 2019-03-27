define([
    'jquery', 'handlebars', 'helpers', 'tracking'
], function($, HBS, Helpers, Tracking) {
    'use strict';

    var LatestThinking = function(elem) {
        //
        var SELECTORS, EVENTS, MOD_DATA;
        //
        EVENTS = {
            articleFiltersUpdated: 'latestthinking.article-filters.updated'
        };
        SELECTORS = {
            articleFilters: {
                container: 'div.article-filters',
                desktop: {
                    container: 'div#latest-thinking-desktop-article-filters',
                    getViewAllButton: function() {
                        return [SELECTORS.articleFilters.container, this.container, 'input[type=button]'].join(' ');
                    },
                    getSelect: function() {
                        return [SELECTORS.articleFilters.container, this.container, 'select'].join(' ');
                    }
                },
                mobile: {
                    container: 'div#latest-thinking-mobile-article-filters',
                    getSelect: function() {
                        return ['div.article-filters', this.container, 'select'].join(' ');
                    }
                },
                getSelectFields: function() {
                    return [this.mobile.getSelect(), this.desktop.getSelect()].join(',');
                }
            }
        };
        MOD_DATA = {
            articlesXHR: undefined,
            articles: undefined,
            INITIAL_ARTICLES_COUNT: 3,
            LOAD_MORE_ARTICLES_COUNT: 3
        };
        //
        initalizeModule();
        initializeCarousel();
        setupArticleFilters();
        // setup handlers
        setupLoadMoreArticlesClickHandler();
        mobileScroll();

        // private functions
        function initalizeModule() {
            var config;
            //
            resetDesktopFilters();
            resetMobileFilters();
            setActiveClassOnViewAllButton();
            //
            config = getConfig({
                q1: $(SELECTORS.articleFilters.desktop.getViewAllButton()).data('q1')
            });
            //
            $
                .when(getArticles(config))
                .then(renderArticles);
        }

        function setupArticleFilters() {

            $(SELECTORS.articleFilters.getSelectFields(), elem)
                .on('change', articleFiltersUpdatedCb);
            $(SELECTORS.articleFilters.desktop.getViewAllButton(), elem)
                .on('click', articleFiltersUpdatedCb);

            function articleFiltersUpdatedCb(evt) {
                if ($(".module-latest-thinking .articles").find(".article").length > 3) {
                    MOD_DATA.INITIAL_ARTICLES_COUNT = $(".module-latest-thinking .articles").find(".article").length;
                }

                Helpers.triggerTracking({
                    "sortType": $(evt.currentTarget).val()
                }, "Search Sort");

                $(document).trigger(EVENTS.articleFiltersUpdated, [evt]);
            }

            $(document)
                .on(EVENTS.articleFiltersUpdated, function(a, evt) {
                    setStylesOnArticleFilters();
                    fetchAndRenderArticles();
                    //private functions
                    function fetchAndRenderArticles() {
                        var config;
                        //
                        config = getConfig(getQueryParams());
                        $
                            .when(getArticles(config))
                            .then(function(articles) {
                                MOD_DATA.articles = articles;
                                renderArticles({
                                    isLoadMoreAction: false
                                });
                            });

                        // private functions
                        function getQueryParams() {
                            var queryParams;
                            queryParams = {};
                            if (evt.target.type === 'button' || evt.type === 'scroll') {
                                queryParams.q1 = $(evt.target).data('q1');
                            } else {
                                var optionElement;
                                //
                                optionElement = getOptionElement(evt);
                                queryParams.q1 = $(evt.target).data('q1');

                                if (evt.target.value !== 'View All') {                                    
                                    queryParams.x5 = $(optionElement).data('x5') || evt.currentTarget.selectedOptions[0].dataset.x5;
                                    queryParams.q5 = $(optionElement).data('q5') || evt.currentTarget.selectedOptions[0].dataset.q5;
                                }
                            }
                            return queryParams;
                        }
                        // private functions
                        function getOptionElement(evt) {
                            return $(evt.target)
                                .children()
                                .filter(
                                    function(idx, el) {
                                        return el.value === evt.target.value;
                                    }
                                ).get(0);
                        }

                    }

                    function setStylesOnArticleFilters() {
                        var isDesktopFilter, targetValue;
                        //
                        targetValue = evt.target.value;
                        isDesktopFilter = ($(evt.target).closest(SELECTORS.articleFilters.desktop.container)
                            .length > 0);
                        //
                        if (isDesktopFilter) {
                            if (evt.target.type === 'button') {
                                resetDesktopFilters();
                                setActiveClassOnViewAllButton();
                                $(SELECTORS.articleFilters.mobile.getSelect())
                                    .val('View All');
                                // set value to 'View All' on mobile filter select field
                            } else {
                                resetDesktopFilters();
                                $(evt.target)
                                    .addClass('active')
                                    .val(targetValue);
                                $(SELECTORS.articleFilters.mobile.getSelect())
                                    .val(targetValue);
                            }
                            // update mobile article filters
                        } else {
                            if (evt.target.value === 'View All') {
                                resetDesktopFilters();
                                setActiveClassOnViewAllButton();
                            } else {
                                resetDesktopFilters();
                                $(SELECTORS.articleFilters.desktop.getSelect())
                                    .each(function(idx, selectField) {
                                        var foundCorrespondingOption;
                                        //
                                        foundCorrespondingOption = false;
                                        $(selectField).find('option').each(function(idx, elem) {
                                            if (elem.value === targetValue) {
                                                $(selectField)
                                                    .val(targetValue)
                                                    .addClass('active');
                                                foundCorrespondingOption = true;
                                                return false;
                                            }
                                        });
                                        //
                                        return !foundCorrespondingOption;
                                    });
                            }
                        }

                    }
                });
        }

        function setActiveClassOnViewAllButton() {
            $(SELECTORS.articleFilters.desktop.getViewAllButton(), elem)
                .addClass('active');
        }

        function activateAddToLibraryFeature(elem) {
            require(['addtolibrary'], function(AddToLibrary) {
                AddToLibrary(elem);
            });
        }

        function resetDesktopFilters() {
            $([SELECTORS.articleFilters.desktop.getViewAllButton(), SELECTORS.articleFilters.desktop.getSelect()].join(','), elem)
                .removeClass('active');
            $(SELECTORS.articleFilters.desktop.getSelect())
                .val('View All');
        }

        function resetMobileFilters() {
            $(SELECTORS.articleFilters.mobile.getSelect()).val('View All');
        }

        function mobileScroll() {
            if (isMobileDevice()) {
                $('div.articles div.row', elem).on('scroll', function(evt) {
                    if ((this.offsetWidth + this.scrollLeft) === this.scrollWidth) {
                        scrollMoreArticles();
                    }
                });
            }
        }

        function scrollMoreArticles() {
            renderArticles({
                isLoadMoreAction: true,
                isMobile: true
            });
        }

        function isMobileDevice() {
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
        }

        function isElementInViewport(el) {
            //special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }

            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            );
        }

        function getArticlesFilterData() {
            return $('#latest-thinking-articles-filter-data', elem)
                .data('articleFilters');
        }

        function getConfig(params) {
            var articleFiltersData, languageCode, countryCode, configObj;
            //
            articleFiltersData = getArticlesFilterData();
            languageCode = window.kpmgPersonalize.snp.params.languageCode;
            countryCode = window.kpmgPersonalize.snp.params.countryCode;
            configObj = {
                data: {
                    all_sites: false,
                    site: countryCode + '_' + languageCode, // variable
                    language: languageCode, // variable
                    //
                    x1: 'KPMG_SL_GL_Id',
                    q1: params.q1, // variable
                    //
                    x2: 'KPMG_Article_Type',
                    q2: 'Article-General',
                    //
                    x3: 'KPMG_Template_Type',
                    q3: 'article-details-template|insights-flexible-template|html-template',
                    //
                    facets: false,
                    sp_c: 200 // initial 9 articles and +3
                }
            };
            if (params.q5 && params.x5) {
                configObj.data.q5 = params.q5;
                configObj.data.x5 = params.x5;
            }
            if (articleFiltersData && articleFiltersData.sort === 'mostviewed') {
                configObj.data['sort-type'] = 'mostviewed';
            } else {
                configObj.data.sort = 'KPMG_Filter_Date';
            }
            return configObj;
        }

        function setupLoadMoreArticlesClickHandler() {
            $('div.articles-placeholder input[type=button]', elem)
                .on('click', function() {
                    renderArticles({
                        isLoadMoreAction: true
                    });

                    var trackingObj = {
                        "linkLocationID1": "Load More Articles",
                        "linkLocationID2": "Load More Articles",
                        'events': 'event11'
                    };
                    Helpers.triggerTracking(trackingObj, 'Internal Link');
                });

        }

        function renderArticles(config) {
            var templateHTML, articles;

            if (typeof(MOD_DATA.articles) !== 'undefined' && MOD_DATA.articles.length > MOD_DATA.LOAD_MORE_ARTICLES_COUNT && MOD_DATA.articles.length > MOD_DATA.INITIAL_ARTICLES_COUNT) {
                $('div.articles-placeholder').find('input[type=button]').show();
            } else {
                $('div.articles-placeholder').find('input[type=button]').hide();
            }
            //
            templateHTML = $('#latest-thinking-article-hbs-template').html();
            if (config && !config.isLoadMoreAction) {
                $('div.articles div.row', elem)
                    .empty();
                //
                articles = MOD_DATA.articles.slice(0, MOD_DATA.INITIAL_ARTICLES_COUNT);
                MOD_DATA.articles.splice(0, MOD_DATA.INITIAL_ARTICLES_COUNT);
            } else {
                articles = MOD_DATA.articles.slice(0, MOD_DATA.LOAD_MORE_ARTICLES_COUNT);
                MOD_DATA.articles.splice(0, MOD_DATA.LOAD_MORE_ARTICLES_COUNT);
            }
            articles.forEach(function(article, idx) {
                var compiledTemplate, compiledArticle;

                compiledTemplate = HBS.compile(templateHTML)(article);

                if (config.isMobile) {
                    compiledArticle = $(compiledTemplate)
                        .appendTo('div.module-latest-thinking div.articles div.row', elem)
                        .css("display", "flex")
                        .fadeIn(500, function() {
                            var addToLibararyElem;
                            //$(this).css('display', 'inline-block');
                            addToLibararyElem = $(this).find('.module-addtolibrary').get(0);
                            $(addToLibararyElem)
                                .attr({
                                    'data-description': article.description,
                                    'data-short-description': article.description,
                                    'data-title': article.title,
                                    'data-href': article.href,
                                    'data-image': article.imgSrc,
                                    'data-shortTitle': article.title
                                });
                            activateAddToLibraryFeature(addToLibararyElem);
                        });
                } else {
                    compiledArticle = $(compiledTemplate)
                        .appendTo('div.module-latest-thinking div.articles div.row', elem)
                        .css("display", "flex")
                        .hide()
                        .delay(300 * idx)
                        .fadeIn(500, function() {
                            var addToLibararyElem;
                            //$(this).css('display', 'inline-block');
                            addToLibararyElem = $(this).find('.module-addtolibrary').get(0);
                            $(addToLibararyElem)
                                .attr({
                                    'data-description': article.description,
                                    'data-short-description': article.description,
                                    'data-title': article.title,
                                    'data-href': article.href,
                                    'data-image': article.imgSrc,
                                    'data-shortTitle': article.title
                                });
                            activateAddToLibraryFeature(addToLibararyElem);
                        });
                }
            });
        }

        function initializeCarousel() {
            var owlCarouselConfig, numberOfCarouselSlides, hasMoreThanOneSlide;
            //
            numberOfCarouselSlides = $('div.carousel-wrapper div.loop-center-carousel div.slide', elem).length;
            hasMoreThanOneSlide = (numberOfCarouselSlides > 1);
            owlCarouselConfig = {
                center: true,
                items: 1,
                loop: hasMoreThanOneSlide ? true : false,
                nav: hasMoreThanOneSlide ? true : false,
                navText: [
                    '<img src="/etc/designs/kpmgpublic/images/left_arrow.png" />',
                    '<img src="/etc/designs/kpmgpublic/images/right_arrow.png" />'
                ]
            };
            //
            $('.preinitialize-slide-wrapper', elem).hide();
            $('.loop-center-carousel', elem).show()
                .owlCarousel(owlCarouselConfig);

            if (!hasMoreThanOneSlide) {
                $('div.loop-center-carousel div.owl-dots', elem).addClass('d-none');
                $("div.article-filters").addClass('noCarousel');
            }
        }

        function getArticles(config) {
            var deferred, url;
            //
            //
            deferred = $.Deferred();
            //
            conditionallyAbortXHR();
            conditionallyInitializeXHR();
            //
            return deferred.promise();
            // private functions
            function conditionallyInitializeXHR() {
                if (MOD_DATA && MOD_DATA.q5 && MOD_DATA.q5 === config.data.q5 && MOD_DATA.x5 && MOD_DATA.x5 === config.data.x5) {
                    deferred.reject({
                        message: 'query-is-not-updated'
                    });
                } else {
                    // MOD_DATA.q1 = config.data.q1;
                    MOD_DATA.x5 = config.data.x5;
                    MOD_DATA.q5 = config.data.q5;
                    //
                    MOD_DATA.ARTICLES_XHR = $.ajax({
                        url: '/search',
                        method: 'POST',
                        success: successFn,
                        data: config.data
                    });
                }
                // private functions
                function successFn(response) {
                    var results = [];
                    try {
                        results =
                            response["customer-results"]
                            .resultset
                            .results
                            .result
                            .map(function(result) {
                                return {
                                    title: result.KPMG_Title,
                                    description: result.KPMG_Description,
                                    imgSrc: result.KPMG_Image,
                                    href: result.KPMG_URL
                                };
                            });
                    } catch (error) {
                        $('#latest-thinking-no-articles-found-error')
                            .removeClass('d-none')
                            .addClass('d-block');
                    }

                    MOD_DATA.articles = results;
                    renderAlertMsgIfZeroResults();
                    deferred.resolve(results);
                    //
                    function renderAlertMsgIfZeroResults() {
                        if (results && results.length === 0) {
                            $('#latest-thinking-no-articles-found-error')
                                .removeClass('d-none')
                                .addClass('d-block');
                        } else {
                            $('#latest-thinking-no-articles-found-error')
                                .addClass('d-none')
                                .removeClass('d-block');
                        }
                    }
                }
            }

            function conditionallyAbortXHR() {
                if (MOD_DATA.ARTICLES_XHR && MOD_DATA.ARTICLES_XHR.abort) {
                    MOD_DATA.ARTICLES_XHR.abort();
                }
            }
        }

        // Keep the following lines at the bottom of the LatestThinking function
        var trck;
        trck = new Tracking(elem, 'LatestThinking');
        //
        $(document).trigger('template.loaded');
    };
    return LatestThinking;
});