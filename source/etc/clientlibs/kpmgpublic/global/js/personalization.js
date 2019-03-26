define(['jquery', 'underscore', 'personalizationUtils','sticky-bar-service','genericErrorDialog','cookiemgr'],
    function ($, _, personalizationUtils, stickyBarService, genericErrorDialog) {
    window.kpmgPersonalize = window.kpmgPersonalize || {};
    var skipPersonalization = false,
        logger = personalizationUtils.loggerUtils,
        snpParams = window.kpmgPersonalize.snp.params,
        accountInfo = personalizationUtils.accountUtils.getInfo(),
        registeredLocale = personalizationUtils.accountUtils.getLocale(),
        locale = personalizationUtils.accountUtils.getLocale(),
        explicitPersonalization = personalizationUtils.accountUtils.isLoggedIn(),
        startSnPindex = 0,
        countToDisableCTAs = window.kpmgPersonalize.misc.cellLevelCombinedHideRefresh || 3,//default value is 3
        isContentRefreshEnabled = window.kpmgPersonalize.isContentRefreshEnabled || true,
        links;

    personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
        links = data.links;
    });


    function showAsterisk(){
        var windowPath = window.location.pathname;
        //check profile icon is loaded in the client side
        if($(document).width() < 1100) {
            if($('#user-profile-icon').length > 0){
                //Show the asterisk near man icon
                if ((stickyBarService.isOPPChanged() || !stickyBarService.isAccountVerified()) && !windowPath.match("registration-interests") && !windowPath.match("registration-subscriptions")){
                        //Show asterisk for mobile
                        $('.notVerified.icon-notVerified').show();
                } else {
                    //Hide asterisk for mobile
                    $('.notVerified.icon-notVerified').hide();
                }
            }else{
                setTimeout(function(){ showAsterisk(); }, 500);
            }
        } else {
            if($('.ikon-trigger-with-navflyout-dropdown-component .dropdown-trigger.icon-person1').length > 0){
                //Show the asterisk near man icon
                if ((stickyBarService.isOPPChanged() || !stickyBarService.isAccountVerified()) && !windowPath.match("registration-interests") && !windowPath.match("registration-subscriptions")){
                        //Show asterisk for desktop
                        $('.ikon-trigger-with-navflyout-dropdown-component .icon-person1 .notVerified').show().css("visibility","visible");
                } else {
                    //Hide asterisk for desktop
                    $('.ikon-trigger-with-navflyout-dropdown-component .icon-person1 .notVerified').hide().css("visibility","hidden");
                }
            }else{
                setTimeout(function(){ showAsterisk(); }, 500);
            }
        }

    }


    function showAuthoredContent() {
        logger.info("Showing authored contents...");
        $('[personalize="true"]').each(function () {
            $(this).prop('hidden', false);
        });
    }

    function showPageAuthoredContent() {
        //This is to handle the error while personalizing page components in service & industry landing pages - KPMGS-11201
        logger.info("Showing authored contents only in page...");
        var personalizationDom = getPersonalizationDom();
        personalizationDom.forEach(function (authoredComponent) {
            $(authoredComponent).prop('hidden', false);
        });
    }

    function getZthesIDs(dbData) {
        if (!dbData) {
            dbData = window.kpmgPersonalize.db.data;
        }
        logger.info("Getting zthesIDs...");
        var cookieVal;

        if (explicitPersonalization) {
            logger.info("Retrieving explicit zthesIDs from cookie...");
            //Explicit personalization
            cookieVal = {};
            cookieVal.zthesIDs = personalizationUtils.accountUtils.getCategoryPreferences(window.kpmgPersonalize.snp.params.tagCategory, ['country']);
            cookieVal.isCachedValue = true;
            return $.when(cookieVal);
        } else {
            //Implicit personalization
            //Read mappingService cookie if available
            if ($.cookie(personalizationUtils.constants.dmdbaseCookieKey)) {
                logger.info("Retrieving implicit zthesIDs from cookie...");
                cookieVal = JSON.parse($.cookie(personalizationUtils.constants.dmdbaseCookieKey));
                cookieVal.isCachedValue = true;
                return $.when(cookieVal);
            }

            if(dbData && dbData.industry && dbData.sub_industry) {
                //Call to mappingService with Demandbase industry and sub_industry to get tags
                return $.ajax({
                    url: window.kpmgPersonalize.mapping.url
                        .replace('<industry>', dbData.industry)
                        .replace('<subindustry>', dbData.sub_industry)
                });
            } else {
                return $.when({});
            }

        }
    }

    function getSnPCacheKey() {
        var snpCacheKey,
            snpCacheKeyArr = [];
        if (window.location.pathname.match(/\/(dashboard|library)\.html$/)) {
            snpCacheKeyArr.push("d", registeredLocale.countryCode, registeredLocale.languageCode, snpParams.sortType);
        } else {
            snpCacheKeyArr.push("g", snpParams.countryCode, snpParams.languageCode, snpParams.sortType);
        }

        if (explicitPersonalization) {
            snpCacheKeyArr.unshift("e");
            snpCacheKeyArr.push(snpParams.tagCategory);
        } else {
            snpCacheKeyArr.unshift("i");
        }

        snpCacheKey = snpCacheKeyArr.join('||');

        return snpCacheKey;
    }

    /**
     * Helper function to get or set cached S&P results against a configuration.
     * @data {Object} Optional parameter. S&P results.
     *
     * Cache S&P results against a configuration and store it in sessionStorage.
     * Configuration comprises of following parameters:
     *      1. Country code
     *      2. Language code
     *      3. Sort type
     */
    function getSetSnPCache(data) {
        var parsedSnpData = [],
            snpCacheKey = getSnPCacheKey();

        //To ensure that snpCacheData is declared and initialized in sessionStorage
        sessionStorage.snpData = sessionStorage.snpData || '{}';
        parsedSnpData = JSON.parse(sessionStorage.snpData);

        //If data is passed, update the cache
        if (data) {
            //Limit caching to maximum of 6 entries
            if (Object.keys(parsedSnpData).length > 6) {
                delete parsedSnpData[Object.keys(parsedSnpData)[0]];
            }
            parsedSnpData[snpCacheKey] = data;
            sessionStorage.snpData = JSON.stringify(parsedSnpData);
        } else if (!$.isEmptyObject(parsedSnpData) && parsedSnpData[snpCacheKey]) {
            parsedSnpData[snpCacheKey] = filterSnPData(parsedSnpData[snpCacheKey]);

            sessionStorage.snpData = JSON.stringify(parsedSnpData);
        }

        return JSON.parse(sessionStorage.snpData)[snpCacheKey];
    }

    function getSnPResults(mappingData) {
        var zthesIDs, snpTimeout,
            filteredSnPData = [],
            aggregatedSnpDataResponse = {
                'personalized-results': {
                    'resultset': {
                        'results': {
                            'result': []
                        }
                    }
                }
            },
            snpCacheData = getSetSnPCache(),
            registeredSite = registeredLocale.countryCode + "_" + registeredLocale.languageCode,
            sites = snpParams.countryCode + "_" + snpParams.languageCode,
            deferred = $.Deferred(),
            rejectedList = ( accountInfo && accountInfo.data.rejectedArticlesList ) ? JSON.parse(accountInfo.data.rejectedArticlesList) : [];

        logger.info("Getting S&P results...");

        function makeSnPCall(reqNoOfResults) {
            var params = {},
                snpUrl = window.kpmgPersonalize.snp.url,
                timeBoundParams = (window.kpmgPersonalize.snp && window.kpmgPersonalize.snp.params && window.kpmgPersonalize.snp.params.timeBoxParameter) || '';
            snpUrl && snpUrl.split('?')[1].split('&').forEach(function (pair) {
                var splits = pair.split('=');
                params[splits[0]] = splits[1];
            });

            if (reqNoOfResults) {
                params['sp_c'] = reqNoOfResults;
            }

            params['site'] = sites;
            params[snpParams.sortTypeKey] = snpParams.sortType.split("=")[1];
            params['q1'] = zthesIDs.split(',').join('|');

            if (!window.location.pathname.match(/\/dashboard\.html$/) && timeBoundParams) {
                timeBoundParams = timeBoundParams.indexOf('&') === 0 ? timeBoundParams.substring(1) : timeBoundParams;
                $.extend(params, JSON.parse('{"' + decodeURI(timeBoundParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}'));
            }

            return $.ajax({
                url: window.kpmgPersonalize.snp.url.split('?')[0],
                method: 'POST',
                data: params
            });
        }

        function aggregateSnpData(snpData) {
            var aggregatedSnpData = aggregatedSnpDataResponse['personalized-results'].resultset.results.result;

            if (snpData && snpData['personalized-results'] && snpData['personalized-results'].resultset.results.result.length) {
                aggregatedSnpData = aggregatedSnpData.concat(snpData['personalized-results'].resultset.results.result);
                aggregatedSnpData = _.uniq(aggregatedSnpData, function (data) {
                    return data.KPMG_URL;
                });

                aggregatedSnpDataResponse['personalized-results'].resultset.results.result = aggregatedSnpData;
            }

            return aggregatedSnpDataResponse['personalized-results'].resultset.results.result;
        }

        if (mappingData.isCachedValue) {
            //If mappingData is from cached value, read zthesIDs directly
            zthesIDs = mappingData.zthesIDs;
        } else if (mappingData['dbslmapping'] && mappingData['dbslmapping']['error-code']) {
            //Do not proceed if mapping service throws error
            return deferred.reject('Error in SmartLogic mapping response.');
        } else if(mappingData.hasOwnProperty('dbslmapping')) {
            //If mappingData is read from mappingService,
            //then set implicit personalization cookie with expiry same as privacyCookie
            var dbCookieVal = {
                industry: kpmgPersonalize.db.data.industry,
                subindustry: kpmgPersonalize.db.data.sub_industry,
                zthesIDs: mappingData['dbslmapping'] ? mappingData['dbslmapping'].mappings.map(function (val) {
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
        if (window.location.pathname.match(/\/dashboard|library\.html$/) && explicitPersonalization) {
            //User is in dashboard page. Try to fetch required number of S&P results.
            var reqNoOfResults = window.kpmgPersonalize.misc.dashboardLimitNo || 35;

            if (isContentRefreshEnabled && window.location.pathname.match(/\/dashboard\.html$/)) {
                reqNoOfResults = (getPersonalizationDom().length * (1 + countToDisableCTAs)) + rejectedList.length;
            }

            if (snpCacheData && snpCacheData['personalized-results'] &&
                snpCacheData['personalized-results'].resultset.results.result.length >= reqNoOfResults) {
                //We have enough results in cache. Go ahead with personalization
                logger.info("Got enough S&P results from cache...");
                deferred.resolve(snpCacheData);
            } else {
                sites = personalizationUtils.accountUtils.getCategoryPreferences('country')
                    .replace(/\//g, "_")
                sites = sites ? sites.split(",") : [];
                //Add registered site to his country preferences
                sites.push(registeredSite);
                sites = _.uniq(sites).sort().join("|");

                //We do not have enough results
                //Make S&P call with user preferences
                logger.info("Fetching for explicit S&P results...");
                makeSnPCall(reqNoOfResults)
                    .then(function (snpData) {
                        if (aggregateSnpData(snpData).length >= reqNoOfResults) {
                            //We got enough results
                            logger.info("Got enough S&P results...");
                            return aggregatedSnpDataResponse;
                        } else if (accountInfo && accountInfo.data && accountInfo.data.implicit && accountInfo.data.implicit.industry) {
                            //We did not get enough results to personalize
                            //We have valid implicit zthesIDs
                            //Make one more S&P call with registeredLocale and implicit zthesIDs
                            zthesIDs = accountInfo.data.implicit.industry;
                            sites = registeredSite;
                            logger.info("Trying to fetch S&P results for implicit info...");
                            return makeSnPCall(reqNoOfResults);
                        }
                    }).then(function (snpData) {
                        if (aggregateSnpData(snpData).length >= reqNoOfResults) {
                            //We got enough results
                            logger.info("Got enough S&P results...");
                            return aggregatedSnpDataResponse;
                        } else {
                            //We did not get enough results to personalize
                            //We do not have valid implicit zthesIDs
                            //Make one more call with registeredLocale and without zthesIDs
                            zthesIDs = '';
                            sites = registeredSite;
                            logger.info("Trying to fetch S&P results for registered locale alone...");
                            return makeSnPCall(reqNoOfResults);
                        }
                    }).then(function (snpData) {
                        aggregateSnpData(snpData);
                        //Proceed personalization with whatever S&P results we have
                        logger.info("Caching S&P data for dashboard in sessionStorage...");
                        filteredSnPData = filterSnPData(aggregatedSnpDataResponse);
                        window.kpmgPersonalize.snp.data = getSetSnPCache(filteredSnPData);
                        deferred.resolve(filteredSnPData);
                    }).fail(function (err) {
                        deferred.reject("S&P call failed.");
                    });
            }
        } else if (snpCacheData) {
            //If S&P results are cached, return the cached data
            logger.info("Retrieving S&P results from sessionStorage...");
            deferred.resolve(snpCacheData);
        } else {
            snpTimeout = setTimeout(function () {
                deferred.reject("S&P timeout triggered.");
            }, window.kpmgPersonalize.snp.timeout + 2000);

            makeSnPCall()
                .then(function (snpData) {
                    logger.info("Caching S&P data in sessionStorage...");
                    filteredSnPData = filterSnPData(snpData);
                    window.kpmgPersonalize.snp.data = getSetSnPCache(filteredSnPData);
                    deferred.resolve(filteredSnPData);
                }).fail(function (err) {
                    deferred.reject("S&P call failed.");
                });
        }

        return deferred;
    }

    function getPersonalizationDom() {
        var cellAttr = personalizationUtils.commonUtils.isMobile() ? 'data-mobile-cell' : 'data-desktop-cell',
            sortedJqComponents = [];

        sortedJqComponents = $.makeArray($('[personalize="true"]'))
            //Convert native DOM to jQuery objects for easy accessibility
            .map(function (rawDom) {
                return $(rawDom);
            })
            //Sanity check. Filter DOMs that has valid parent elements.
            //i.e. parent element with data-desktop-cell/data-mobile-cell attribute
            .filter(function (jqDom) {
                var parentJqDom = jqDom.parent();

                if (parentJqDom.attr(cellAttr) ||
                    (/\bparsys\b/.test(parentJqDom.attr('class')) && parentJqDom.parent().attr(cellAttr))) {
                    //Valid DOM for personalization
                    return true;
                }

                //Remove hidden attribute for filtered authoredComponent
                jqDom.prop('hidden', false);
                return false;
            })
            //Sort DOMs in ascending order based on data-desktop-cell/data-mobile-cell value
            .sort(function (jqDom1, jqDom2) {
                return parseInt(jqDom1.parent().attr(cellAttr)) - parseInt(jqDom2.parent().attr(cellAttr));
            });

        return sortedJqComponents;
    }

    /**
     * Personalize components with data from S&P
     * @snpData {Object} S&P response JSON
     *
     * Step 1: Proceed only if snpData has any result
     * Step 2: Get all components to personalize
     * Step 3: Order them based on cell number
     * Step 4: Pass component template and snpData to `renderPersonalizedData` callable in each component module
     * Step 5: Get the personalized DOM and replace it for authored DOM
     * Step 6: In case of any error in Step 3 or 4, show authored content for that component
     */
    function personalizeComponents(snpData) {
        var sortedJqComponents,
            cellAttr = personalizationUtils.commonUtils.isMobile() ? 'data-mobile-cell' : 'data-desktop-cell',
            snpResults = snpData['personalized-results'].resultset.results.result,
            personalizeTemplate = snpData.personalizeTemplate ?  true : false ,
            personalizeNav = snpData.personalizeNav ? true : false;


        logger.info("Personalizing components...");

        if (snpResults.length === 0) {
            //If there are no S&P results, throw error
            return $.Deferred().reject("No S&P results to personalize components.");
        } else if (skipPersonalization) {
            return $.Deferred().reject("Skipping personalization.");
        }

        sortedJqComponents = getPersonalizationDom();

        //For each sorted component, create personalized HTML from appropriate S&P result(s)
        //and replace them in place of corresponding component
        sortedJqComponents.forEach(function (authoredComponent) {
            if (personalizeTemplate) {
                personalizeArticle(authoredComponent, snpResults);
            } else {
                personalizeArticle(authoredComponent);
            }
        });

        return $.Deferred().resolve();
    }

    function personalizeArticle(authoredComponent, intersectedResults) {
        var componentStartIndex = startSnPindex,
            componentEndIndex = parseInt(authoredComponent.attr('no-of-results-required')) + componentStartIndex,
            className = authoredComponent.attr('class'),
            compName = className.substring(7, className.indexOf(' ')),
            snpCacheKey = getSnPCacheKey(),
            snpResultsObj = JSON.parse(sessionStorage.snpData)[snpCacheKey],
            snpResults = (intersectedResults) ? intersectedResults : snpResultsObj['personalized-results'].resultset.results.result,
            deferred = $.Deferred();

        if (componentEndIndex > snpResults.length) {
            authoredComponent.prop('hidden', false);
            return;
        } else if (componentEndIndex === snpResults.length && isContentRefreshEnabled) {
            //Disable all refresh & hide CTAs when results are exhausted
            disableRefreshHideCTAs();
        }

        //Update startSnPindex to current components end index so that the next component will continue from that
        startSnPindex = componentEndIndex;
        require([compName, 'precompile'], function (compModule, PrecompiledHandlebars) {
            var templateStr, parsedTemplateStr, personalizedComponent;
            if (compModule && compModule.templateId &&
                    typeof compModule.renderPersonalizedData === 'function') {
                //Component supports personalization.

                //Get template string from the templateId mentioned in component Module
                // templateStr = $($('#' + compModule.templateId)[0]).html();

                //Assumption: Component HTML template is completely enclosed inside <section>
                //            and no custom helpers like 'include', 'embed' are used inside <section>
                // parsedTemplateStr = /<section.*<\/section>/g
                //     .exec(templateStr.replace(/\n/g, '<<NEW_LINE>>'))[0]
                //     .replace(/<<NEW_LINE>>/g, '\n');
                try {
                    //TODO: Send parsedTemplateStr and Handlebars.compile and let component module handle the rest
                    personalizedComponent = compModule.renderPersonalizedData(
                        PrecompiledHandlebars[compName],
                        snpResults.slice(componentStartIndex, componentEndIndex),
                        authoredComponent);
                    personalizedComponent.prop('hidden', false);
                    personalizedComponent.attr('no-of-results-required', componentEndIndex - componentStartIndex);
                    //Initialize the component DOM by passing it module
                    compModule($(personalizedComponent)[0]);
                } catch (err) {
                    logger.error('Error occured in personalizing component "', compName, '". Showing authored content.\n\tMsg:', err);
                    authoredComponent.prop('hidden', false);
                    return;
                }

                //Insert new personalized DOM after authored DOM and remove authored DOM
                //NOTE: We should not empty parent content and inset personalized DOM because
                //      parent element might contain Handlebars template tag (in script tag)
                authoredComponent.replaceWith(personalizedComponent);
            } else {
                //Component does not support personalization
                logger.warn("Component `" + compName + "` does not support personalization. Showing authored content.");
                authoredComponent.prop('hidden', false);
            }

            deferred.resolve(personalizedComponent);
        });

        return deferred;
    }

    function handleError(err) {
        logger.error("Error occured in personalizing components sequence.\n\tMsg:", err);
        showAuthoredContent();
    }

    /**
     * This is to remove user rejected articles from SnP data
     * Call this function when ever you make SnP call
     */
    function filterSnPData( snpData ) {
        //fetching account info again from local storage as rejected list will be updated in local storage on hiding the article
        var filteredList = {
                'personalized-results': {
                    'resultset': {
                        'results': {
                            'result': []
                        }
                    }
                }
            },
            accountInfo = personalizationUtils.accountUtils.getInfo(),
            rejectedList = ( accountInfo && accountInfo.data.rejectedArticlesList ) ? JSON.parse(accountInfo.data.rejectedArticlesList) : [];

        //Logic to remove rejected articles from SnP data
        filteredList['personalized-results'].resultset.results.result = (snpData['personalized-results']) ? snpData['personalized-results'].resultset.results.result.filter(function(data) {
            return (rejectedList.indexOf(data.KPMG_URL) === -1 ) ? true : false;
        }) : [];

        return filteredList;
    }

    function disableRefreshHideCTAs() {
        $('.refresh-article').removeClass('active');
        $('.hide-article').removeClass('active');
    }

    //Intersection of _.intersection(metaTag, userInterests)
    function getZthesIdExplicit() {
        var metaObject = personalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
        tagCategory = {
                "industry" : "KPMG_Industry_ID_Loc",
                "service" : "KPMG_Service_ID_Loc"
            }, userInterests;
        var metaTag,
            commonZthesIds = [];
        if (metaObject.KPMG_Template_Type === 'industrylanding-template' || metaObject.KPMG_Template_Type === "servicelanding-r-template") {
            userInterests = personalizationUtils.accountUtils.getCategoryPreferences().split(','),
            queryKeys = tagCategory[window.kpmgPersonalize.snp.params.tagCategory];
            if (metaObject[queryKeys]) {
                metaTag = metaObject[queryKeys].split(',');
                commonZthesIds = _.intersection(metaTag, userInterests);
            }
        }
        return $.Deferred().resolve(commonZthesIds);
    }

    //Intersection of _.intersection(metaTag, db)
    function getZthesIdImplicit() {
        var metaObject = personalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
        tagCategory = {
            "industry" : "KPMG_Industry_ID_Loc",
            "service" : "KPMG_Service_ID_Loc"
        },
        queryKeys = tagCategory[window.kpmgPersonalize.snp.params.tagCategory],
        commonZthesIds = [],
        deferred = $.Deferred();
        if (metaObject.KPMG_Template_Type === 'industrylanding-template' || metaObject.KPMG_Template_Type === "servicelanding-r-template") {
            if (!window.kpmgPersonalize.db.data.industry || !window.kpmgPersonalize.db.data.sub_industry) {
                deferred.resolve([]);
            } else {
                $.ajax({
                    url: window.kpmgPersonalize.mapping.url
                        .replace('<industry>', window.kpmgPersonalize.db.data.industry)
                        .replace('<subindustry>', window.kpmgPersonalize.db.data.sub_industry)
                    // timeout: window.kpmgPersonalize.snp.timeout
                }).done(function(dataL){
                    var dbZthesIds = dataL["dbslmapping"]["mappings"][0]["zthes-id"].split(","),
                    metaTag = [];
                    if (metaObject[queryKeys]) {
                        metaTag = metaObject[queryKeys].split(',');

                        commonZthesIds = _.intersection(metaTag, dbZthesIds );
                    }

                    deferred.resolve(commonZthesIds);
                }).fail(function(err) {
                    deferred.resolve([]);
                });
            }
        }
        return deferred;
    }

    function getIntersectedZthesIDs() {
        var commonzthesIds = [];
        if (explicitPersonalization) {
            commonzthesIds =  getZthesIdExplicit();
            commonzthesIds.then( function(zthesIds) {
                if (zthesIds.length === 0) {
                    commonzthesIds =  getZthesIdImplicit();
                }
            });
        } else {
            commonzthesIds =  getZthesIdImplicit();
        }

        return commonzthesIds;
    }

    function getIntersectedSnPResults(mappingData) {
        var filteredSnPData = [],
            zthesIDs = mappingData,
            aggregatedSnpDataResponse = {
                'personalized-results': {
                    'resultset': {
                        'results': {
                            'result': []
                        }
                    }
                }
            },
            registeredSite = registeredLocale.countryCode + "_" + registeredLocale.languageCode,
            sites = snpParams.countryCode + "_" + snpParams.languageCode,
            deferred = $.Deferred();

        logger.info("Getting Intersected S&P results...");

        function makeSnPCallWithzthesIDs() {
            var params = {},
                reqNoOfResults = window.kpmgPersonalize.misc.dashboardLimitNo || 10,
                snpUrl = window.kpmgPersonalize.snp.url;
            snpUrl && snpUrl.split('?')[1].split('&').forEach(function (pair) {
                var splits = pair.split('=');
                params[splits[0]] = splits[1];
            });

            if (reqNoOfResults) {
                params['sp_c'] = reqNoOfResults;
            }

            params['site'] = sites;
            params[snpParams.sortTypeKey] = snpParams.sortType.split("=")[1];
            params['q1'] = zthesIDs.join('|');

            return $.ajax({
                url: window.kpmgPersonalize.snp.url.split('?')[0],
                method: 'POST',
                data: params,
                callback : function(snpData){
                    snpData.personalizeTemplate = true;
                }
            });
        }

        function aggregateSnpData(snpData) {
            var aggregatedSnpData = aggregatedSnpDataResponse['personalized-results'].resultset.results.result;

            if (snpData && snpData['personalized-results'] && snpData['personalized-results'].resultset.results.result.length) {
                aggregatedSnpData = aggregatedSnpData.concat(snpData['personalized-results'].resultset.results.result);
                aggregatedSnpData = _.uniq(aggregatedSnpData, function (data) {
                    return data.KPMG_URL;
                });

                aggregatedSnpDataResponse['personalized-results'].resultset.results.result = aggregatedSnpData;
            }

            return aggregatedSnpDataResponse['personalized-results'].resultset.results.result;
        }

        sites = personalizationUtils.accountUtils.getCategoryPreferences('country')
            .replace(/\//g, "_")
        sites = sites ? sites.split(",") : [];
        //Add registered site to his country preferences
        sites.push(registeredSite);
        sites = _.uniq(sites).sort().join("|");

        if (mappingData.length === 0) {
            deferred.reject("Intersected tags not available.");
        } else {
            makeSnPCallWithzthesIDs()
                .then(function (snpData) {
                    if (aggregateSnpData(snpData).length > 0) {
                        //We got enough results
                        logger.info("Got enough Intersected S&P results...");
                        filteredSnPData = filterSnPData(aggregatedSnpDataResponse);
                        filteredSnPData.personalizeTemplate = true;
                        return filteredSnPData;
                    } else if (explicitPersonalization) {
                        //We did not get enough results to personalize
                        //We have valid implicit zthesIDs
                        //Make one more S&P call with registeredLocale and implicit zthesIDs
                        getZthesIdImplicit()
                            .then( function(data) {
                                zthesIDs = data;
                                sites = registeredSite;
                                logger.info("Trying to fetch intersected S&P results for implicit info...");
                                return makeSnPCallWithzthesIDs();
                            });
                    }
                }).then(function (snpData) {
                    if (aggregateSnpData(snpData).length > 0) {
                        //We got enough results
                        logger.info("Got enough Intersected S&P results...");
                        filteredSnPData = filterSnPData(aggregatedSnpDataResponse);
                        filteredSnPData.personalizeTemplate = true;
                        deferred.resolve(filteredSnPData);
                    } else {
                        //We did not get enough results to personalize
                        //We do not have valid implicit zthesIDs
                        deferred.reject("Intersected S&P call failed.");
                    }
                }).fail(function (err) {
                    deferred.reject("Intersected S&P call failed.");
                });
        }

        return deferred;
    }

    function addAdditionalData(){
        var cokie =$.cookie('localaccountinfoValue');
        //if cookie exists with value set to true call the OPP modal*/
        if(cokie==="true"){
            callOppModal();
        }else{
            $.when(getAccountInfo())
                .done(setgigyaData)
                .fail(showGenericErrorDialog);
        }
    }

    function callOppModal(){
        accountInfo = personalizationUtils.accountUtils.getInfo();
        var countryCode = locale.countryCode,
            languageCode = locale.languageCode,
            $rsOppModal = $('.rsOppModal'),
            hashParam = window.location.hash.replace('#', ''),
            evt = document.createEvent("CustomEvent");

        if(accountInfo.subscriptions &&
                accountInfo.subscriptions[countryCode] &&
                accountInfo.subscriptions[countryCode][languageCode] &&
                accountInfo.subscriptions[countryCode][languageCode].terms &&
                accountInfo.subscriptions[countryCode][languageCode].terms.email.isSubscribed===false){

            if(hashParam === 'hideopp') {
                return false;
            }

            if($('.rsOppModal .opp-checkbox').find('a').length > 0) {
                $('.rsOppModal .opp-checkbox').find('a').attr('href', $('.rsOppModal .opp-checkbox').find('a').attr('href') + '#hideopp');
            }

            $("html, body").animate({
                scrollTop: 0
            }, "slow", function() {
                $(".rsOppModal").bs3modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
            });

            $('.rsOppModal').on('click', 'a', function(e) {
                var newTab;
                e.preventDefault();
                e.stopPropagation();
                newTab = window.open($(this).attr('href'), '_blank');
                newTab.trigger('focus');
            });

            window.kpmgPersonalize = window.kpmgPersonalize || {};
            window.kpmgPersonalize.rsOppShown = true;
            window.kpmgPersonalize.oppModalVerified = true;

            evt.initCustomEvent('oppModal', false, false, {});
            document.dispatchEvent(evt);

            $('#terms1').off().on('click', function() {
                $rsOppModal.find('.terms').removeClass('error-border');
            });

            $('.rsOppModal .continueButton').off().on('click', function (e) {
                if($('#terms1').length > 0) {
                    if($('#terms1').prop('checked') !== true) {
                        $rsOppModal.find('.terms').addClass('error-border');
                        e.preventDefault();
                        return false;
                    } else {
                        $rsOppModal.find('.terms').removeClass('error-border');
                    }
                }

                $('.loading-spinner').show();
                //Update the terms.email.isSubscribed flag to true in gigya for site
                updateRegsiteredSiteOppInGigya()
                    .then(function() {
                        showAsterisk();
                        $('.loading-spinner').hide();
                        if(personalizationUtils.commonUtils.getValue('cross_site')) {
                            personalizationUtils.pathUtils.gotoPage(location.origin + links.profile.url);
                        }
                    })
                    .fail(showGenericErrorDialog);
            });

            $('.rsOppModal .ignoreandlogout').off().on('click', function () {
                window.gigya.accounts.logout({
                    callback: function(response) {
                        var homeURL = '',
                        winkpmgpath = window.location.pathname;

                        if (response.errorCode) {
                            console.error("Error occurred in logout.\n\tMSG: " + response.errorMessage);
                            genericErrorDialog.showDialog();
                        } else {
                            sessionStorage.removeItem("verifyEmailAlert");
                            personalizationUtils.commonUtils.clearValues('origin');
                            personalizationUtils.commonUtils.clearValues('subid');
                            personalizationUtils.commonUtils.clearValues('cross_site');
                            personalizationUtils.commonUtils.clearValues('cross_site_name');
                            personalizationUtils.commonUtils.clearValues('cross_site_referrer');

                            homeURL = winkpmgpath.split('/').slice(0, (window.kpmgPersonalize.misc.isAuthor ? 3 : 1));
                            homeURL.push(locale.countryCode, locale.languageCode, "home.html");

                            if(window.kpmgPersonalize && window.kpmgPersonalize.isBlog) {
                                window.location.reload(true);
                            } else {
                                window.location = homeURL.join("/");
                            }
                        }
                    }
                });
            });

        }else{

            callGenericModal();
        }
    }

    function addGigyaListeners() {
        window.gigya.accounts.addEventHandlers({
            onLogout: function () {
                personalizationUtils.accountUtils.clearInfo();
                personalizationUtils.storeUtils.setUserLibrary({});
            }
        });
    }

    personalizationUtils.commonUtils.checkForGigyaObject(addGigyaListeners);

    function updateRegsiteredSiteOppInGigya() {
        var rsOpp = {},
            deferred = $.Deferred();

        rsOpp[locale.countryCode] = {};
        rsOpp[locale.countryCode][locale.languageCode] = {
            terms : {
                email: {
                    isSubscribed: true
                }
            }
        };

        window.gigya.accounts.setAccountInfo({
            subscriptions: rsOpp,
            callback: function(response) {
                if(response.errorCode === 0) {
                    window.gigya.accounts.getAccountInfo({
                        include: personalizationUtils.constants.UserAccountIncludes.join(','),
                        callback: function(data) {
                            $.extend(accountInfo.subscriptions, data.subscriptions);
                            personalizationUtils.accountUtils.setInfo(accountInfo);
                            deferred.resolve();
                        }
                    });
                } else {
                    deferred.reject();
                    logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                }
            }
        });

        return deferred;
    }


    function setgigyaData(gigyaData) {
        var evt = document.createEvent("CustomEvent");

        accountInfo = personalizationUtils.accountUtils.getInfo();
        accountInfo.subscriptions = accountInfo.subscriptions || {};

        if(gigyaData && gigyaData.subscriptions) {

            $.extend(accountInfo.subscriptions, gigyaData.subscriptions);
            $.extend(accountInfo.data, gigyaData.data);
            personalizationUtils.accountUtils.setInfo(accountInfo);
            setCookie('localaccountinfoValue', 'true', window.kpmgPersonalize.userAccInfoExpiry);//userAccInfoExpiry is in hours
            callOppModal();
        } else {
            window.kpmgPersonalize = window.kpmgPersonalize || {};
            window.kpmgPersonalize.oppModalVerified = true;

            evt.initCustomEvent('oppModal', false, false, {});
            document.dispatchEvent(evt);
        }
    }

    function callGenericModal(){
        if(links && links.profile && links.profile.url){
            if(window.location.pathname.match(links.profile.url)) {
                return false;
            }
        }

        var subscriptionSites = getSubscriptionSitesList(),
            countryCode,
            languageCode,
            todaysDate,
            currentTimeInMilli,
            todaysDateInISO,
            lastGenericModalShowDate,
            lastShownDate,
            lastShownDateInMilli,
            lastUpdatedSubscribtionDate,
            subscribtionDate,
            subscribtionDateInMilli,
            registeredSite = locale.countryCode + '_' + locale.languageCode,
            evt = document.createEvent("CustomEvent"),
            genericModalShown = false;

        subscriptionSites = subscriptionSites.filter(function(item) {
            return item.key !== registeredSite;
        });

        for (var i=0; i<subscriptionSites.length; i++) {

            countryCode = subscriptionSites[i].split('_')[0];
            languageCode = subscriptionSites[i].split('_')[1];

            if(accountInfo.subscriptions &&
                    accountInfo.subscriptions[countryCode] &&
                    accountInfo.subscriptions[countryCode][languageCode] &&
                    accountInfo.subscriptions[countryCode][languageCode].terms &&
                    accountInfo.subscriptions[countryCode][languageCode].terms.email.isSubscribed===false){

                todaysDate = new Date();
                currentTimeInMilli = todaysDate.getTime();
                todaysDateInISO = todaysDate.toISOString();

                if(accountInfo.data && accountInfo.data.SSOPPChangeDisplayDate){
                    lastGenericModalShowDate = accountInfo.data.SSOPPChangeDisplayDate;
                    lastShownDate = new Date(lastGenericModalShowDate);
                    lastShownDateInMilli = lastShownDate.getTime();

                    lastUpdatedSubscribtionDate = (accountInfo &&
                        accountInfo.subscriptions &&
                        accountInfo.subscriptions[countryCode] &&
                        accountInfo.subscriptions[countryCode][languageCode] &&
                        accountInfo.subscriptions[countryCode][languageCode].terms &&
                        accountInfo.subscriptions[countryCode][languageCode].terms.email &&
                        accountInfo.subscriptions[countryCode][languageCode].terms.email.lastUpdatedSubscriptionState) || '';

                    if(lastUpdatedSubscribtionDate) {
                        subscribtionDate = new Date(lastUpdatedSubscribtionDate);
                        subscribtionDateInMilli = subscribtionDate.getTime();

                        if( subscribtionDateInMilli > lastShownDateInMilli ){
                            genericModalShown = true;
                            setAccountInfo(todaysDateInISO);
                            genericModalPopup();
                            break;
                        }
                    }

                }else{
                    genericModalShown = true;
                    setAccountInfo(todaysDateInISO);
                    genericModalPopup();
                    break;
                }

             }
        }

        window.kpmgPersonalize = window.kpmgPersonalize || {};
        if(genericModalShown) {
            window.kpmgPersonalize.rsGenericShown = true;
        } else {
            window.kpmgPersonalize.rsGenericShown = false;
        }

        window.kpmgPersonalize.oppModalVerified = true;
        evt.initCustomEvent('oppModal', false, false, {});
        document.dispatchEvent(evt);
    }

    function genericModalPopup(){
        $("html, body").animate({
            scrollTop: 0
        }, "slow", function() {
            $(".genericOppModal").bs3modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
        });

        $('.genericOppModal .continueButton').off().on('click', function () {
            personalizationUtils.pathUtils.gotoPage(location.origin + links.profile.url);
        });
    }


    function getSubscriptionSitesList() {
        var listArray = [],
            sites = [];

        accountInfo.subscriptions = accountInfo.subscriptions || {};

        for(var key in accountInfo.subscriptions) {
            if(key.length === 2 && accountInfo.subscriptions.hasOwnProperty(key)){
                sites = Object.keys(accountInfo.subscriptions[key]);
                listArray.push(key.concat('_', sites[0]));
            }
        }

        return listArray;
    }


    function showGenericErrorDialog() {
        $('.loading-spinner').hide();
        genericErrorDialog.showDialog();
    }

    function setAccountInfo(updatedDate) {
        accountInfo = personalizationUtils.accountUtils.getInfo();
        var accountDataInfo = {};
        accountDataInfo['data'] = {};
        var accountData = accountInfo.data;

        accountDataInfo['data'] = accountData;
        accountDataInfo['data']['SSOPPChangeDisplayDate'] = updatedDate;

        $.extend(accountInfo.data, accountDataInfo.data);
        personalizationUtils.accountUtils.setInfo(accountInfo);

        window.gigya.accounts.setAccountInfo({
            data : accountInfo.data,
            callback: function (response) {
                if (response.errorCode === 0) {
                    console.log('Gigya got updated with new SSOPP Change Display Date : success!!!');
                } else {
                    genericErrorDialog.showDialog();
                    logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                }
            }
        });
    }

    function getAccountInfo() {
        var deferred = $.Deferred();
        window.gigya.accounts.getAccountInfo({
            include: personalizationUtils.constants.UserAccountIncludes.join(','),
            callback: function (response) {
                if (response.errorCode === 0) {
                    deferred.resolve(response);
                } else {
                    deferred.resolve();
                }
            }
        });

        return deferred;
    }

    function setCookie(cname,cvalue,expHours) {
        var d = new Date();
        d.setTime(d.getTime() + (expHours*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function populateUsernameForOPPModals() {
        accountInfo = personalizationUtils.accountUtils.getInfo();

        if(accountInfo && accountInfo.profile) {
            $('.module-oppmodal').find('.user-name').html(accountInfo.profile.firstName);
        }
    }

    /**
     * Get personalized content and store it in window.kpmgPersonalize object for component personalization
     *
     * Step 1: Check if privacyCookie and personalization is set. Else return at this step
     * Step 2: Call mappingService to get the zthesIDs for Industry and SubIndustry and store it in `demandbase` cookie
     * Step 3: Call S&P with response from mappingService and additional info (like tag category, sort order)
     * Step 4: Store S&P response in window.kpmgPersonalize.snpData
     * Step 5: Personalize the components with S&P response
     * Step 6: In case of error in any of the below step, show authored contents
     */
    window.kpmgPersonalize.fetchDataAndPersonalize = function () {
        if (explicitPersonalization) {
            if(!window.kpmgPersonalize.misc.isAuthor) {
                populateUsernameForOPPModals();
                addAdditionalData();
            }

            personalizationUtils.storeUtils.fetchUserLibraryAndUpdate();
        }
        if (personalizationUtils.privacyUtils.isAccepted() && window.kpmgPersonalize.isPersonalize) {
            var commonzthesIds;
            if(window.kpmgPersonalize.isPageTagsFlagEnabled){
                logger.info("Started personalization based on intersected tags...");
                //Personalize page components
                getIntersectedZthesIDs()
                    .then(getIntersectedSnPResults)
                    .then(personalizeComponents)
                    .fail(showPageAuthoredContent);
            } else {
                logger.info("Started personalization sequence...");
                getZthesIDs(window.kpmgPersonalize.db.data)
                    .then(getSnPResults)
                    .then(personalizeComponents)
                    .fail(handleError);
            }
        } else {
            logger.info("Site or page is not configured for personalization.");
            showAuthoredContent();
        }
    };

    if (window.kpmgPersonalize.misc.isAuthor || !window.kpmgPersonalize.isSitePersonalize) {
        showAuthoredContent();
    } else if(!personalizationUtils.privacyUtils.isAccepted()) {

        //Privacy policy is not accepted and user is not logged in
        //Show Authored content
        //Wait for user to accept privacy policy, then proceed with personalization
        showAuthoredContent();
        skipPersonalization = true;
        // window.kpmgPersonalize.fetchDataAndPersonalize();
        $('.btn-close-main .btn-close')
            .on('click', function () {
                //SetTimeout is required such that the original event will get fired first
                //which will set the privacy cookie before we start with personalization
                setTimeout(function () {
                    if (kpmgPersonalize.db.data) {
                        window.kpmgPersonalize.fetchDataAndPersonalize();
                    } else {
                        $(document).on("dbData.received", function () {
                            window.kpmgPersonalize.fetchDataAndPersonalize();
                        });
                    }
                }, 0);
            });
    } else if (window.kpmgPersonalize.db.data || $.cookie(personalizationUtils.constants.dmdbaseCookieKey)) {
        //Either demandbase call is success or demandbase data is already cached
        window.kpmgPersonalize.fetchDataAndPersonalize();
    } else {
        //Wait for demandbase call to complete
        $(document).on("dbData.received", function () {
            window.kpmgPersonalize.fetchDataAndPersonalize();
        });
    }


    if(explicitPersonalization){
        showAsterisk(); //show asterisk on condition
    }


    return {
        getZthesIDs: getZthesIDs,
        getSetSnPCache: getSetSnPCache,
        getSnPResults: getSnPResults,
        personalizeComponents: personalizeComponents,
        personalizeArticle: personalizeArticle,
        showAsterisk: showAsterisk
    };
});
