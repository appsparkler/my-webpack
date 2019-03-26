define(['jquery', 'tracking', 'personalization', 'personalizationUtils', 'handlebars', 'precompile', 'genericErrorDialog', 'helpers'],
    function($, Tracking, personalization, personalizationUtils, Handlebars, PrecompiledHandlebars, genericErrorDialog, Helpers) {
        'use strict';

        var TouchSupportingcontent = function(elem) {

            window.kpmgPersonalize = window.kpmgPersonalize || {};
            var logger = personalizationUtils.loggerUtils,
                snpParams = window.kpmgPersonalize.snp.params,
                accountInfo = personalizationUtils.accountUtils.getInfo(),
                registeredLocale = personalizationUtils.accountUtils.getLocale(),
                locale = personalizationUtils.accountUtils.getLocale(),
                explicitPersonalization = personalizationUtils.accountUtils.isLoggedIn(),
                currentPage = 1,
                skipPersonalization = true,//Set this flag to false to enable personalization on supporting content
                resultFetchCount = 3,
                personalizedResultFetchCount = window.kpmgPersonalize.blogResultCount ? parseInt(window.kpmgPersonalize.blogResultCount) : 90,
                totalUniqueBlogs = [],
                personalizedBlogsCount = 0,
                totalPages = 1,
                compName = 'touch-promotional',
                promoTemplate = PrecompiledHandlebars[compName],
                $loadMoreDom = $('.loadmore-btn', elem),
                $blogsContainerDom = $('.content-wrapper', elem),
                $noResultsDom = $('.no-results', elem);


            function fetchSiteBlogs(requiredBlogsLength) {
                var url = '/search?',
                    paramData = '',
                    deferred = $.Deferred(),
                    resultsToFetch = resultFetchCount;

                paramData = 'all_sites=false&x1=KPMG_Tab_Type&q1=Blogs&facets=false';
                if(snpParams && snpParams.languageCode && snpParams.countryCode) {
                    paramData += "&language=" + snpParams.languageCode;
                    paramData += "&site=" + snpParams.countryCode + "_" + snpParams.languageCode;
                }

                if(requiredBlogsLength) {
                    resultsToFetch = totalUniqueBlogs.length + personalizedBlogsCount + requiredBlogsLength;
                }

                if(skipPersonalization) {
                    paramData += "&page=" + currentPage;
                }

                paramData += "&sp_c=" + resultsToFetch;

                if($blogsContainerDom.data('sort') === 'mostViewed') {
                    paramData += "&sort-type=mostviewed";
                } else {
                    paramData += "&sort=KPMG_Filter_Date";
                }

                url += paramData;

                $.ajax({
                    url: url
                })
                .done(function(response) {
                    if(skipPersonalization) {
                        totalPages = (response && response['customer-results'] && response['customer-results'].pagination['total-pages']) || 1;
                    }
                    deferred.resolve(response);
                })
                .fail(function() {
                    deferred.reject();
                });

                return deferred;
            }

            function fetchPersonalizedBlogs() {
                var snpCacheData = getSetSnPCache(),
                    deferred = $.Deferred(),
                    userResultsArray = [];

                if(snpCacheData && snpCacheData['customer-results'] && snpCacheData['customer-results'].resultset.results.result.length) {
                    userResultsArray = snpCacheData['customer-results'].resultset.results.result;
                    totalUniqueBlogs = totalUniqueBlogs.concat(userResultsArray);
                    userResultsArray = userResultsArray.slice((currentPage - 1)*resultFetchCount, currentPage*resultFetchCount);
                    return deferred.resolve(userResultsArray);
                } else if(userResultsArray.length === 0 && currentPage > 1) {
                    return deferred.resolve(userResultsArray);
                } else {

                    personalization.getZthesIDs(window.kpmgPersonalize.db.data)
                        .then(function(mappingData) {
                            var zthesIDs,
                                url = '/search',
                                paramData = {},
                                timeBoundParams = (window.kpmgPersonalize.snp && window.kpmgPersonalize.snp.params && window.kpmgPersonalize.snp.params.timeBoxParameter) || '';

                            if (mappingData.isCachedValue) {
                                //If mappingData is from cached value, read zthesIDs directly
                                zthesIDs = mappingData.zthesIDs;
                            } else if (mappingData.dbslmapping && mappingData.dbslmapping['error-code']) {
                                //Do not proceed if mapping service throws error
                                return deferred.reject('Error in SmartLogic mapping response.');
                            } else {
                                //If mappingData is read from mappingService,
                                //then set implicit personalization cookie with expiry same as privacyCookie
                                var dbCookieVal = {
                                    industry: window.kpmgPersonalize.db.data.industry,
                                    subindustry: window.kpmgPersonalize.db.data.sub_industry,
                                    zthesIDs: mappingData.dbslmapping ? mappingData.dbslmapping.mappings.map(function (val) {
                                        return val['zthes-id'].trim();
                                    }).join(',') : ''
                                };

                                $.cookie(personalizationUtils.constants.dmdbaseCookieKey, JSON.stringify(dbCookieVal), {
                                    path: '/',
                                    expires: personalizationUtils.privacyUtils.getCookieExpiry()
                                });

                                zthesIDs = dbCookieVal.zthesIDs;
                            }

                            //Call to S&P with zthesIDs to get personalized content and resolve the promise
                            zthesIDs = zthesIDs || '';

                            paramData.all_sites = false;
                            paramData.x1 = 'KPMG_Article_Type';
                            paramData.q1 = 'Blog_Post';
                            paramData.facets = false;
                            paramData.x2 = 'KPMG_SL_GL_Id';
                            paramData.q2 = zthesIDs.split(',').join('|');
                            paramData.sp_c = personalizedResultFetchCount;

                            if(snpParams && snpParams.languageCode && snpParams.countryCode) {
                                paramData.language = snpParams.languageCode;
                                paramData.site = snpParams.countryCode + "_" + snpParams.languageCode;
                            }

                            if($blogsContainerDom.data('sort') === 'mostViewed') {
                                paramData['sort-type'] = "mostviewed";
                            } else {
                                paramData.sort = "KPMG_Filter_Date";
                            }

                            if(timeBoundParams) {
                                timeBoundParams = timeBoundParams.indexOf('&') === 0 ? timeBoundParams.substring(1) : timeBoundParams;
                                $.extend(paramData, JSON.parse('{"' + decodeURI(timeBoundParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}'));
                            }

                            $.ajax({
                                url: url,
                                method: 'POST',
                                data: paramData
                            })
                            .done(function(response){
                                var personalizedResults = {
                                        'customer-results': {
                                            'resultset': {
                                                'results': {
                                                    'result': (response && response['customer-results'] && response['customer-results'].resultset.results.result) || []
                                                }
                                            }
                                        }
                                    };

                                personalizedResults = getSetSnPCache(personalizedResults);
                                userResultsArray = personalizedResults && personalizedResults['customer-results'] && personalizedResults['customer-results'].resultset.results.result;
                                totalUniqueBlogs = totalUniqueBlogs.concat(userResultsArray);
                                personalizedBlogsCount = userResultsArray.length;
                                userResultsArray = userResultsArray.slice((currentPage - 1)*resultFetchCount, currentPage*resultFetchCount);
                                deferred.resolve(userResultsArray);
                            })
                            .fail(function(){
                                deferred.reject();
                            });
                        })
                        .fail(function() {
                            deferred.reject();
                        });
                }

                return deferred;
            }

            function fetchBlogsAndPersonalize() {
                var deferred = $.Deferred();

                $.when(fetchSiteBlogs(), fetchPersonalizedBlogs())
                    .done(function(results, userResults) {
                        var personalizedResults = {
                                'customer-results': {
                                    'resultset': {
                                        'results': {
                                            'result': []
                                        }
                                    }
                                }
                            },
                            personalizedResultsArray = [],
                            moreBlogs = [],
                            totalBlogsArray = [];

                        moreBlogs = (results && results['customer-results'] && results['customer-results'].resultset.results.result) || [];
                        totalBlogsArray = totalUniqueBlogs.map(function(data) {
                            return data.KPMG_URL;
                        });

                        moreBlogs = moreBlogs.filter(function(data) {
                            return (totalBlogsArray.indexOf(data.KPMG_URL) === -1 ) ? true : false;
                        });

                        if(moreBlogs.length) {
                            totalUniqueBlogs = totalUniqueBlogs.concat(moreBlogs);
                        }

                        personalizedResultsArray = totalUniqueBlogs.slice((currentPage - 1)*resultFetchCount, currentPage*resultFetchCount);
                        personalizedResults['customer-results'].resultset.results.result = personalizedResultsArray;
                        totalPages = (results && results['customer-results'] && results['customer-results'].pagination['total-pages']) || 1;

                        renderBlogs(personalizedResults);
                    })
                    .fail(function(){
                        initializeComponent(true);
                    });
            }

            function fetchMoreBlogsAndPersonalize() {
                var deferred = $.Deferred(),
                    personalizedResults = {
                        'customer-results': {
                            'resultset': {
                                'results': {
                                    'result': []
                                }
                            }
                        }
                    },
                    personalizedResultsArray = [],
                    requiredBlogsLength = 0;

                if(totalUniqueBlogs.length < (currentPage * resultFetchCount)) {
                    requiredBlogsLength = (currentPage * resultFetchCount) - totalUniqueBlogs.length;
                    fetchSiteBlogs(requiredBlogsLength)
                        .then(function(response){
                            var moreBlogs = (response && response['customer-results'] && response['customer-results'].resultset.results.result) || [],
                                totalBlogsArray = totalUniqueBlogs.map(function(data) {
                                    return data.KPMG_URL;
                                });

                            moreBlogs = moreBlogs.filter(function(data) {
                                return (totalBlogsArray.indexOf(data.KPMG_URL) === -1 ) ? true : false;
                            });

                            if(moreBlogs.length) {
                                totalUniqueBlogs = totalUniqueBlogs.concat(moreBlogs);
                            }

                            personalizedResultsArray = totalUniqueBlogs.slice((currentPage - 1)*resultFetchCount, currentPage*resultFetchCount);
                            personalizedResults['customer-results'].resultset.results.result = personalizedResultsArray;

                            renderBlogs(personalizedResults);
                        })
                        .fail(showGenericErrorDialog);
                } else {
                    requiredBlogsLength = 0;
                    personalizedResultsArray = totalUniqueBlogs.slice((currentPage - 1)*resultFetchCount, currentPage*resultFetchCount);
                    personalizedResults['customer-results'].resultset.results.result = personalizedResultsArray;

                    renderBlogs(personalizedResults);
                }

            }

            function initializeComponent(fallBack) {
                if(window.kpmgPersonalize.misc.isAuthor) {
                    return false;
                }

                //Remove this block when personalization is turned on for supporting content
                if($blogsContainerDom.data('sort') !== 'mostViewed') {
                    //Skip first 6 results(When personalization is turned off in supporting content ) as these are being shown in Recent Posts component.
                    currentPage = 3;
                }

                if(skipPersonalization || fallBack) {
                    $.when(fetchSiteBlogs())
                        .done(renderBlogs)
                        .fail(showGenericErrorDialog);
                } else {
                    fetchBlogsAndPersonalize();
                }

                $loadMoreDom.off().on('click', renderBlogsRow);
            }

            function renderBlogsRow() {
                $('.web-spinner', elem).show();

                currentPage += 1;

                if(skipPersonalization) {
                    $.when(fetchSiteBlogs())
                        .done(renderBlogs)
                        .fail(showGenericErrorDialog);
                } else {
                    fetchMoreBlogsAndPersonalize();
                }
            }

            function renderBlogs(result) {
                var blogDom = '',
                    blogsDom = '',
                    data = {},
                    date = '',
                    topic = '',
                    formattedDate = '',
                    rowBlogs = (result && result['customer-results'] && result['customer-results'].resultset.results.result) || [];

                $('.web-spinner', elem).hide();

                if(Array.isArray(rowBlogs) && rowBlogs.length > 0) {

                    for(var i=0; i<rowBlogs.length; i++) {
                        date = rowBlogs[i].KPMG_Blog_Date_Time;
                        topic = (rowBlogs[i].KPMG_Blog_Topics && rowBlogs[i].KPMG_Blog_Topics.split('|')[0]) || '';

                        if(date && window.calanderProperties && window.dateFormatProperties) {
                            formattedDate = Helpers.dateFormat(date, window.calanderProperties, window.dateFormatProperties);
                        } else if (date) {
                            formattedDate = date;
                        }

                        data = {
                            'hbs': {
                                'promotional': {
                                    'title': rowBlogs[i].KPMG_Title,
                                    'shortTitle': rowBlogs[i].KPMG_Title,
                                    'longDescription': rowBlogs[i].KPMG_Description,
                                    'shortDescription': rowBlogs[i].KPMG_Short_Desc,
                                    'imageFileReference': rowBlogs[i].KPMG_Image,
                                    'primaryUrl': rowBlogs[i].KPMG_URL,
                                    'altText': rowBlogs[i].KPMG_Title,
                                    'publishDate': formattedDate,
                                    'isFormated': true,
                                    'one': true,
                                    'topic': topic
                                },
                                'globalValues': {
                                    'assetDomainName': window.kpmgAssetDomain
                                }
                            }
                        };

                        blogDom = promoTemplate(data);
                        blogsDom += '<div class="col-md-4 col-md-height blog">' + blogDom + '</div>';
                    }

                    if(i === 1) {
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                    } else if(i === 2) {
                        blogsDom += '<div class="col-md-4 col-md-height blog"></div>';
                    }

                    blogsDom = '<div class="row-same-height row-full-height">' + blogsDom + '</div>';
                    $blogsContainerDom.append(blogsDom);

                    //Set the test statement back to just currentPage > 1 when personalization is turned on for supporting content
                    if((currentPage > 1 && $blogsContainerDom.data('sort') === 'mostViewed') || (currentPage > 3 && $blogsContainerDom.data('sort') !== 'mostViewed')) {
                        $('.content-wrapper .row-same-height:last-child').find('.col-md-height:first-child a').trigger('focus');
                    }
                } else if(currentPage === 1) {
                    $blogsContainerDom.addClass('hidden');
                    $loadMoreDom.addClass('hidden');
                    $(elem).addClass('hidden');
                }

                handleLoadMore(currentPage, result['customer-results'].pagination);
            }

            function handleLoadMore(currentPage) {
                if(currentPage >= parseInt(totalPages)) {
                    $loadMoreDom.addClass('hidden');
                } else {
                    $loadMoreDom.removeClass('hidden');
                }
            }

            function getSnPCacheKey() {
                var snpCacheKey,
                    snpCacheKeyArr = [];

                snpCacheKeyArr.push("s", snpParams.countryCode, snpParams.languageCode);

                if(explicitPersonalization) {
                    snpCacheKeyArr.unshift("e");
                } else {
                    snpCacheKeyArr.unshift("i");
                }

                snpCacheKey = snpCacheKeyArr.join('||');

                return snpCacheKey;
            }

            function getSetSnPCache(data) {
                var parsedSnpData = [],
                    snpCacheKey = getSnPCacheKey();

                //To ensure that snpCacheData is declared and initialized in sessionStorage
                sessionStorage.supportContentData = sessionStorage.supportContentData || '{}';
                parsedSnpData = JSON.parse(sessionStorage.supportContentData);

                //If data is passed, update the cache
                if (data) {
                    //Limit caching to maximum of 6 entries
                    if (Object.keys(parsedSnpData).length > 6) {
                        delete parsedSnpData[Object.keys(parsedSnpData)[0]];
                    }
                    parsedSnpData[snpCacheKey] = data;
                    sessionStorage.supportContentData = JSON.stringify(parsedSnpData);
                }

                return JSON.parse(sessionStorage.supportContentData)[snpCacheKey];
            }

            function showGenericErrorDialog() {
                genericErrorDialog.showDialog();
            }

            if (window.kpmgPersonalize.misc.isAuthor || !window.kpmgPersonalize.isSitePersonalize || !personalizationUtils.privacyUtils.isAccepted()) {
                skipPersonalization = true;
                initializeComponent();
            } else if (window.kpmgPersonalize.db.data || $.cookie(personalizationUtils.constants.dmdbaseCookieKey)) {
                //Either demandbase call is success or demandbase data is already cached
                initializeComponent();
            } else {
                //Wait for demandbase call to complete
                $(document).on("dbData.received", function () {
                    initializeComponent();
                });
            }

            $(elem).on('keyup', 'a, .loadmore-btn', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $(elem).on('keydown', 'a, .loadmore-btn', function(e) {
                if( e.which === 9 ) {
                    $(this).removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

			// Keep the following lines at the bottom of the TouchSupportingcontent function
            var trck = new Tracking(elem, 'TouchSupportingcontent');
			$(document).trigger('template.loaded');
        };

        return TouchSupportingcontent;
    }
);
