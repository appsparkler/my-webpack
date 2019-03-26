/* global s */
/* global searchAnalyticFunc */
/* global shareProperties */
/* global kpmgAssetDomain */
/* global _satellite */
/* global _ */
/* global calanderProperties */
/* global dateFormatProperties */
define(['jquery',
        'clamp',
        'handlebars',
        'precompile',
        'cqservice',
        'tracking',
        'helpers',
        'router',
        'personalizationUtils',
        'common-utils',
        'cookiemgr', 'jqueryui', 'underscore',
        'handlebarshelpers'
    ],function($, $clamp, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers, Router, personalizationUtils, CommonUtils) {
        'use strict';
        var SearchResults = function(elem) {
            var loadMore = false,
                $loader = $('.web-spinner', elem),
                isMobile = personalizationUtils.commonUtils.isMobile();
            
            var parseJSON;
            var searchResultsModel = {
                    facets: {},
                    facetSelected: {},
                    facetDeselected: {},
                    facetChildSelected: {},
                    currentSelection: "",
                    tabs: {},
                    results: {},
                    SelectBoxOptions: {},
                    pagination: {},
                    CQModel: JSON.parse($("#CQModel").attr('data-CQModal')),
                    totalResults: {},
                    breadcrumbs: {},
                    queries: Helpers.getUrlParams(decodeURIComponent(location.href)),
                    reset: false,
                    initialSearch: false,
                    deeplinked: false,
                    globalTaxFacets: ['KPMG_Ser_Path', 'KPMG_Ind_Path'],
                    defaultParentFacets: ['KPMG_Cont_Type_Path', 'KPMG_Geo_Rel_Path', 'KPMG_Market_Path', 'KPMG_Filter_Year', 'KPMG_Cont_Mem_Firm', 'KPMG_Event_Mem_Firm', 'KPMG_Blog_Topics']
                },
                mobileLatestFacetSelected = '',
                backBtnURL = [],
                backBtnClicked = false,
                queryKey = {
                    "KPMG_Cont_Type_Path": {
                        "key": "KPMG_Cont_Type_Path",
                        "has-child": false
                    },
                    "KPMG_Geo_Rel_Path": {
                        "key": "KPMG_Geo_Rel_Path",
                        "has-child": false
                    },
                    "KPMG_Market_Path": {
                        "key": "KPMG_Market_Path",
                        "has-child": false
                    },
                    "KPMG_Service_Pth_Loc": {
                        "key": "KPMG_Ser_Path_Loc",
                        "has-child": true
                    },
                    "KPMG_Topic_Path": {
                        "key": "KPMG_Topic_Path",
                        "has-child": true
                    },
                    "KPMG_Ind_Path_Loc": {
                        "key": "KPMG_Ind_Path_Loc",
                        "has-child": true
                    },
                    "KPMG_Filter_Year": {
                        "key": "KPMG_Filter_Year",
                        "has-child": false
                    },
                    "KPMG_Service_Path": {
                        "key": "KPMG_Ser_Path",
                        "has-child": true,
                        "allSite": true
                    },
                    "KPMG_Ind_Path": {
                        "key": "KPMG_Ind_Path",
                        "has-child": true,
                        "allSite": true
                    },
                    "KPMG_Cont_Mem_Firm": {
                        "key": "KPMG_Cont_Mem_Firm",
                        "has-child": false
                    },
                    "KPMG_Event_Mem_Firm": {
                        "key": "KPMG_Event_Mem_Firm",
                        "has-child": false
                    },
                    "KPMG_Blog_Topics": {
                        "key": "KPMG_Blog_Topics",
                        "has-child": false
                    }
                },
                cacheObject = {
                    resultsContainer: $(".resultsSet"),
                    searchClearAll: $(".clear-all-filters"),
                    facetsContainer: $(".facets-container"),
                    tabsResultsContainer: $(".resultsListingcontainer"),
                    tabsContainer: $('.results-tabs-list'),
                    facetsTemp: 'searchresults-facets',
                    gridHeaderTemp: 'searchresults-searchHeader',
                    resultsCountTemp: 'resultsCount',
                    tabsTemp: 'tabList',
                    resultsTemp: 'searchresults-resultSet',
                    quickViewPeopleTemp: $("#quickView-people").html(),
                    quickViewInsightsTemp: $("#quickView-insights").html(),
                    quickViewEventTemp: $("#quickView-events").html(),
                    quickViewGenericTemp: $("#quickView-generic").html(),
                    registrationPromoTemp: 'registration-promo',
                    facetsPanel: $('.resp-tabs-list'),
                    quickViewModal: $("#search-results-quick-view"),
                    sortResultsContainer: $('.sortResults'),
                    resultsCountContainer: $('.results-count'),
                    resultsHeader: $('.results-header'),
                    resultsPanel: $('.resultSet'),
                    modalContentPanel: $('.modal-content-panel'),
                    tileView: $(".containerTileView"),
                    listView: $(".containerListView"),
                    loadMoreBtn: $(".btn-more"),
                    loadMoreContainer: $(".loadMore"),
                    searchValContainer: $(".searchinputsContent"),
                    allSitesBtn: $("#all-sites"),
                    thisSiteBtn: $("#this-site"),
                    loaderOverlay: $(".search-overlay"),
                    facetsOverlay: $(".facets-overlay"),
                    i18nModel: searchResultsModel.CQModel.i18nModel,
                    backBtnArray: [" "],
                    backBtnContainer: $(".btn-back"),
                    prevPageLink: $('.prev-page-btn', elem),
                    domainArr: window.location.href.split("/"),
                    suggestionSelected: false,
                    suggestionWaitTime: $(elem).data('search-waittime') || 250 /*Default value will be 250 milliseconds*/ ,
                    searchInput: $('#search', elem),
                    selectedValue: null,
                    advancedSearchCta: $('.advanced-search-cta', elem)
                },
                links = {},
                valueHighlight, highLighterDidYouMean, // value created m1
                isIE = false || !!document.documentMode,
                isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
                generateQuery = function() {
                    var queryUrl = "/search";
                    var param = window.location.search ? window.location.search : "";
                    queryUrl += param ? param : "?q=";
                    //queryUrl += (searchResultsModel.queries.q) ? "&q=" + encodeURIComponent(searchResultsModel.queries.q) : "";
                    if(!searchResultsModel.queries.q) {
                        queryUrl = decodeURIComponent(queryUrl);
                    }

                    if (queryUrl.indexOf('facets=true') > -1 || queryUrl.indexOf('facets=false') > -1) {
                        queryUrl = queryUrl.replace(/&?facets=(true|false)/gi, '');
                    }

                    toggleFacetItemSelectionFromURL(queryUrl);
                    var temp = getUrlVars(queryUrl);
                    valueHighlight = decodeURIComponent(temp.q);
                    return queryUrl;
                },
                stringConstants = {
                    desktopContainer: "desktopContainer",
                    mobileContainer: "mobileContainer",
                    active: "active",
                    downArrow: "icon-chevron-down",
                    upArrow: "icon-chevron-right",
                    chevronUp: "icon-chevron-up",
                    chevronRight: "icon-chevron-right"
                },
                ajaxService = new Service("searchresults", {
                    baseUrl: generateQuery()
                }),
                requestUrls = {
                    globalSearchParam: searchResultsModel.CQModel.globalSearchParam,
                    localSearchParam: searchResultsModel.CQModel.localSearchParam,
                    smartLogicURL: searchResultsModel.CQModel.smartLogicUrl
                },
                facets = {
                    facetsTemplate: PrecompiledHandlebars[cacheObject.facetsTemp]
                },
                gridHeader = {
                    searchHeaderTemplate:PrecompiledHandlebars[cacheObject.gridHeaderTemp]
                },
                resultsCount = {
                    resultsCountTemplate: PrecompiledHandlebars[cacheObject.resultsCountTemp]
                },
                tabs = {
                    tabsTemplate: PrecompiledHandlebars[cacheObject.tabsTemp]
                },
                resultList = {
                    resultsTemplate: PrecompiledHandlebars[cacheObject.resultsTemp],
                    currentPage: 1,
                    recordSize: 9,
                    totalPages: 0
                },
                registrationPromo = {
                    promoTemplate: PrecompiledHandlebars[cacheObject.registrationPromoTemp]
                },
                manageRecentSearch = {
                    cookieField: 'recentSearchKeyList',
                    maxRecentItemCt: 5,
                    get: function() {
                        var cookieVal = $.cookie(this.cookieField);
                        return cookieVal ? JSON.parse(cookieVal) : [];
                    },
                    set: function(value) {
                        $.cookie(this.cookieField, JSON.stringify(value), {
                            path: '/',
                            expires: 365
                        });
                    },
                    reset: function() {
                        $.removeCookie(this.cookieField, {
                            path: '/'
                        });
                    }
                },
                facetParams = '',
                fetchFacets = true,
                referrerPage = '',
                inputTypeAhead = {
                    /*
                     *  Type Ahead functiomlity, which can be injected to
                     * jquety UI auto complete
                     */
                    isTypeAheadActive: false,
                    setVal: function($input, matchText, elem) {
                        var keyTyped = cacheObject.searchInput.val(),
                            keyword = keyTyped.toLowerCase(),
                            typeAheadVal = matchText.replace(new RegExp(keyword, 'i'), ''),
                            left = 0,
                            typeAheadElem = $('.typeahead-value', elem),
                            tempKey = $('.tmp-key', elem),
                            extraWidth = 0,
                            inputLeftSpace = 0;

                        if ($(document).width() <= 640) {
                            inputLeftSpace = 30;
                        } else {
                            inputLeftSpace = 9;
                        }
                        if (typeAheadVal.indexOf(" ") === 0) {
                            typeAheadVal = typeAheadVal.replace(/\s/, "&nbsp;");
                        }
                        typeAheadElem.css({
                            'display': 'none'
                        });
                        if (typeAheadElem.length) {
                            typeAheadElem.html(typeAheadVal);
                        } else {
                            $input.after('<span class="typeahead-value typeahead-elem" >' + typeAheadVal + '</span><span class="tmp-key" style="display:inline-block;left:0;position:absolute;visibility: hidden;font-family:Arial, Helvetica, sans-serif;padding:0;margin:0 0 0 9px;text-transform:none;"></span>');
                            typeAheadElem = $('.typeahead-value', elem);
                            tempKey = $('.tmp-key', elem);
                        }

                        tempKey.text(keyTyped.replace(/\s/, "+"));

                        left = inputLeftSpace + tempKey.width() + parseInt(extraWidth);
                        console.log(left);
                        typeAheadElem.css({
                            'left': left + 'px',
                            'display': 'block'
                        });
                        this.isTypeAheadActive = true;
                    },
                    doKeyUp: function($input, e) {
                        var currentKeyword = $input.val();
                        if ($.trim(currentKeyword) === '') {
                            this.clearTypeAhead();
                            this.isTypeAheadActive = false;
                        }

                    },
                    doKeyDown: function($input, e) {
                        var typeAheadElem = $input.next('.typeahead-value'),
                            currentTypeAheadText = typeAheadElem.text(),
                            currentKeyword = $input.val(),
                            clearForkey = [9, 40, 8],
                            inputChangeKey = [39, 9],
                            ctrlDown = e.ctrlKey || e.metaKey;

                        if (this.isTypeAheadActive && currentTypeAheadText.length && inputChangeKey.indexOf(e.keyCode) > -1) {
                            $input.val(currentKeyword + '' + currentTypeAheadText);
                            typeAheadElem.css({
                                'display': 'none'
                            });
                            this.isTypeAheadActive = false;
                        } else if (clearForkey.indexOf(e.keyCode) > -1 || !currentTypeAheadText.length || (e.keyCode === 88 && ctrlDown)) {
                            this.clearTypeAhead();
                            this.isTypeAheadActive = false;
                        }
                    },
                    clearTypeAhead: function() {
                        $('.typeahead-value').css({
                            'display': 'none'
                        });
                    }
                };

            
            if(!window.kpmgPersonalize.misc.isAuthor){
                redirectForEmptySearch();  
            }
            function redirectForEmptySearch() {
                var search;
                search = window.location.search;
                if(!search) {
                    window.location.search = 'sp_p=any';
                }
            }

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
            });

            if (document.referrer.match(/\/events\.html$/)) {
                referrerPage = '&q1=Events&x1=KPMG_Tab_Type';
            } else if (document.referrer.match(/\/insights\.html$/)) {
                referrerPage = '&q1=Insights&x1=KPMG_Tab_Type';
            } else if (document.referrer.match(/\/press-releases\.html$/)) {
                referrerPage = '&q1=Press+releases&x1=KPMG_Tab_Type';
            } else if (document.referrer.match(/\/contacts\//)) {
                referrerPage = '&q1=People&x1=KPMG_Tab_Type';
            } else if( document.referrer.indexOf(window.kpmgPersonalize.blogPath) > 0 ) {
                referrerPage = '&q1=Blogs&x1=KPMG_Tab_Type';
            }

            if (sessionStorage.getItem("smartLogicTags") === null || sessionStorage.getItem("smartLogicTags") === "") {
                $.ajax({
                    url: personalizationUtils.constants.interestsServiceURL
                        .replace(/<countryCode>/g, window.kpmgPersonalize.snp.params.countryCode)
                        .replace(/<languageCode>/g, window.kpmgPersonalize.snp.params.languageCode)
                        .replace(/<boolean>/g, "false"),
                    success: function(response) {
                        var tags = personalizationUtils.commonUtils.processInterestsJson(response);
                        sessionStorage.setItem("smartLogicTags", JSON.stringify(tags));

                        var evt = document.createEvent("CustomEvent");
                        evt.initCustomEvent('smartLogicTags', false, false, {});
                        document.dispatchEvent(evt);
                    }
                });
            }

            if (sessionStorage.getItem("backBtnItems") === null || sessionStorage.getItem("backBtnItems") === "") {
                sessionStorage.setItem("backBtnItems", document.referrer);
            }
            if (sessionStorage.getItem("backBtnClicked") === null || sessionStorage.getItem("backBtnClicked") === "") {
                sessionStorage.setItem("backBtnClicked", false);
            }
            var router = new Router();
            router.config({
                    root: window.location.pathname,
                    mode: 'history'
                })
                .check(window.location.pathname + window.location.search)
                .listen();

            if (dateFormatProperties) {
                $.merge(dateFormatProperties.fields, [{
                    "item4": "time"
                }]);
            }
            if (searchResultsModel.queries.keyword) {
                cacheObject.searchInput.val(searchResultsModel.queries.keyword.replace(" " + searchResultsModel.queries.SES, ""));
            } else if (searchResultsModel.queries.q) {
                cacheObject.searchInput.val(searchResultsModel.queries.q.replace(" " + searchResultsModel.queries.SES, ""));
            }
            if (searchResultsModel.CQModel.activeSearch) {
                cacheObject.loaderOverlay.show();
                var req = (searchResultsModel.queries.all_sites === "true") ? requestUrls.globalSearchParam : requestUrls.localSearchParam,
                    reqWithFacets = req.concat('&facets=true');

                facetParams = req;

                if (referrerPage) {
                    reqWithFacets += referrerPage;
                }

                if (!personalizationUtils.commonUtils.isMobile() && window.searchFacetsFlag) {
                    ajaxService.searchFetch(generateFacets, reqWithFacets);
                }

                if (window.KPMG.searchResults) {
                    handleServiceRequestOnload(window.KPMG.searchResults, window.KPMG.searchParams);
                } else {
                    //To handle when S&P call is taking time
                    document.addEventListener("searchResultsPrioritize", function() {
                        handleServiceRequestOnload(window.KPMG.searchResults, window.KPMG.searchParams);
                    });
                }

                if (searchResultsModel.queries.all_sites === "true") {
                    cacheObject.allSitesBtn.trigger("click");
                }
            }

            cacheObject.resultsContainer.on('click', '.module-registration-promo', function(){
                Helpers.triggerSatteliteTracking("onClickSearchCTA");
            });

            cacheObject.advancedSearchCta.on('click', function() {
                var $this = $(this);

                if (!window.searchFacetsFlag && fetchFacets) {
                    fetchFacets = false;
                    if (ajaxService.params.baseUrl.indexOf('facets=true') > -1 || ajaxService.params.baseUrl.indexOf('facets=false') > -1) {
                        ajaxService.params.baseUrl = ajaxService.params.baseUrl.replace(/&?facets=(true|false)/gi, '');
                    }
                    if (facetParams.indexOf('facets=false') > -1 || facetParams.indexOf('facets=true')) {
                        facetParams = facetParams.replace(/&?facets=(true|false)/gi, '');
                    }
                    facetParams = facetParams + '&facets=true';
                    if (referrerPage) {
                        facetParams += referrerPage;
                        referrerPage = '';
                    }
                    ajaxService.searchFetch(generateFacets, facetParams);
                }

                $this.toggleClass('active');
                if ($(this).hasClass('active')) {
                    cacheObject.facetsContainer.removeClass('hidden');
                    $this.find('.accordion').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                    $this.attr('aria-expanded', 'true');
                } else {
                    cacheObject.facetsContainer.addClass('hidden');
                    $this.find('.accordion').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    $this.attr('aria-expanded', 'false');
                }
            });

            generateSearchInput();

            function hex2char(hex) {
                // converts a single hex number to a character
                // note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
                // hex: string, the hex codepoint to be converted
                var result = '';
                var n = parseInt(hex, 16);
                if (n <= 0xFFFF) {
                    result += String.fromCharCode(n);
                } else if (n <= 0x10FFFF) {
                    n -= 0x10000;
                    result += String.fromCharCode(0xD800 || (n > 10)) + String.fromCharCode(0xDC00 || (n && 0x3FF));
                } else {
                    result += 'hex2Char error: Code point out of range';
                }
                return result;
            }

            function convertHexNCR2Char(str) {
                // converts a string containing &#x...; escapes to a string of characters
                // str: string, the input

                // convert up to 6 digit escapes to characters
                str = $("<textarea/>").html(str).text();

                str = str.replace(/&#x([A-Fa-f0-9]{1,6});/g,
                    function(matchstr, parens) {
                        return hex2char(parens);
                    }
                );
                return str;
            }

            function getUrlVars(url) {
                var hash;
                var myJson = {};
                var hashes = url.slice(url.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    myJson[hash[0]] = hash[1];
                }
                //console.log('urlVars is now '+JSON.stringify(myJson));
                return myJson;
            }

            function uniq(a) {
                var seen = {};
                return a.filter(function(item) {
                    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
                });
            }

            function compareNumbers(a, b) {
                return a - b;
            }

            function isAllSites() {
                return searchResultsModel.queries.all_sites;
            }

            function isParent(key) {
                var facetKeyExt = _.last(key.split('_'));

                if (facetKeyExt === 'pa' || facetKeyExt === 'Parent' || _.indexOf(searchResultsModel.defaultParentFacets, key) >= 0) {
                    return true;
                } else {
                    return false;
                }
            }

            function isChild(key) {
                return !isParent(key);
            }

            function hasChildFacet() {}

            function parentSuffix(key) {
                if (isAllSites() && _.indexOf(searchResultsModel.globalTaxFacets, key) >= 0) {
                    return '_Parent';
                } else {
                    return '_pa';
                }
            }

            function childSuffix(key) {
                if (isAllSites() && _.indexOf(searchResultsModel.globalTaxFacets, key) >= 0) {
                    return '_Child';
                } else {
                    return '_ch';
                }
            }

            function getChildFacetKey(key) {
                if (isParent(key)) {
                    return key.replace('_pa', '_ch').replace('_Parent', '_Child');
                } else {
                    return key;
                }

            }

            function getParentFacetKey(key) {
                if (!isParent(key)) {
                    return key.replace('_ch', '_pa').replace('_Child', '_Parent');
                } else {
                    return key;
                }
            }

            function resetFacetsIfParentUnselected(key, facet) {
                var parentKey = getParentFacetKey(key),
                    filteredFacets, filteredChildFacets, i, j, selectedFacet;

                if (isParent(key)) {
                    for (i = 0; i < searchResultsModel.facets.length; i++) {
                        if (searchResultsModel.facets[i]["facet-title"] === facet.title) {
                            selectedFacet = _.where(searchResultsModel.facets[i]["facet-values"]["facet-item"], {
                                "facet-name": facet.name
                            })[0];

                            // removeFacetItemSelection(parentKey, selectedFacet["facet-name"]);
                            if (typeof selectedFacet !== "undefined" && selectedFacet["facet-has-children"] && selectedFacet["facet-has-children"] === "1") {
                                _.map(selectedFacet["facet-children"]["facet-child"], function(child) {
                                    if (child["facet-selected"]) {
                                        delete child["facet-selected"];
                                        removeFacetItemSelection(getChildFacetKey(key), child["facet-name"]);
                                    }
                                });
                            }
                        }
                    }
                }
            }

            function resetFacetsIfChildSelected(key, facet) {

                var i, j, selectedFacet;

                if (!facet) {
                    return;
                }
                // if a facet child is selected, all other facet with nested facet should get unselected
                var parentKey = getParentFacetKey(key),
                    filteredFacets, filteredChildFacets;
                searchResultsModel.facetChildSelected[parentKey] = true;
                filteredFacets = searchResultsModel.facetSelected[parentKey];

                // get the parent selcted if the selected item is a child.
                if (isChild(key)) {

                    filteredChildFacets = searchResultsModel.facetSelected[getChildFacetKey(key)];
                    for (i = 0; i < searchResultsModel.facets.length; i++) {
                        if (searchResultsModel.facets[i]['facet-title'] === facet.title) {

                            // make parent selected when any child is selected
                            _.map(searchResultsModel.facets[i]['facet-values']['facet-item'], function(parent) {
                                if (parent['facet-name'] === facet.parent) {
                                    parent['facet-selected'] = true;
                                    addFacetItemSelection(parentKey, parent['facet-name']);
                                }
                                return facet;
                            });

                            // make other selected removed
                            filteredFacets = searchResultsModel.facetSelected[parentKey];
                            filteredFacets = _.without(filteredFacets, facet.parent);

                            for (j = 0; j < filteredFacets.length; j++) {
                                selectedFacet = _.where(searchResultsModel.facets[i]["facet-values"]["facet-item"], {
                                    "facet-name": filteredFacets[j]
                                })[0];
                                delete selectedFacet["facet-selected"];
                                removeFacetItemSelection(parentKey, selectedFacet["facet-name"]);
                                if (selectedFacet["facet-has-children"] === "1") {
                                    _.map(selectedFacet["facet-children"]["facet-child"], function(child) {
                                        if (child["facet-selected"]) {
                                            removeFacetItemSelection(getChildFacetKey(key), child["facet-name"]);
                                        }
                                    });
                                }
                            }
                        }
                    }

                }

                if (isParent(key)) {
                    filteredFacets = searchResultsModel.facetSelected[parentKey];
                    filteredFacets = _.without(filteredFacets, facet.name);

                    for (i = 0; i < searchResultsModel.facets.length; i++) {
                        if (searchResultsModel.facets[i]["facet-title"] === facet.title) {
                            for (j = 0; j < filteredFacets.length; j++) {
                                selectedFacet = _.where(searchResultsModel.facets[i]["facet-values"]["facet-item"], {
                                    "facet-name": filteredFacets[j]
                                })[0];
                                // if not ALL and not the parent of the selected child, and has children will get unselected.
                                if (selectedFacet["facet-name"] !== "All" && selectedFacet["facet-has-children"] === "1" && selectedFacet["facet-children-selected"]) {
                                    removeFacetItemSelection(parentKey, selectedFacet["facet-name"]);
                                    if (selectedFacet["facet-has-children"] === "1") {
                                        _.map(selectedFacet["facet-children"]["facet-child"], function(child) {
                                            if (child["facet-selected"]) {
                                                removeFacetItemSelection(getChildFacetKey(key), child["facet-name"]);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }

            }

            function toggleFacetItemSelectionFromURL(url) {
                var urlParams = getUrlVars(url),
                    re = new RegExp("^(x|X)[0-9]+$");
                for (var key in urlParams) {
                    if (re.test(key)) {
                        var value = urlParams["q" + key.substr(1)].split('|');

                        // when picking values from URL remove the + from it
                        value = _.map(value, function(fac) {
                            return decodeURIComponent(fac).replace(/\+/gi, " ");
                        });

                        addFacetItemSelection(urlParams[key], value);
                        searchResultsModel.deeplinked = true;
                    }
                }
            }

            function addFacetItemSelection(key, value) {

                if (_.isArray(value)) {
                    searchResultsModel.facetSelected[key] = value;
                    return;
                }

                if (!_.isArray(searchResultsModel.facetSelected[key])) {
                    searchResultsModel.facetSelected[key] = [];
                }

                if (value === "All") {
                    searchResultsModel.facetDeselected[key] = _.without(searchResultsModel.facetSelected[key], value);
                    searchResultsModel.facetSelected[key] = new Array(value);

                    if (searchResultsModel.facetSelected[getChildFacetKey(key)]) {
                        searchResultsModel.facetSelected[getChildFacetKey(key)] = new Array(value);
                    }

                } else if (_.indexOf(searchResultsModel.facetSelected[key], value) < 0) {
                    searchResultsModel.facetSelected[key].push(value);
                }

                // remove all from the list if another item is selected
                if (searchResultsModel.facetSelected[key].length > 1) {
                    searchResultsModel.facetSelected[key] = _.without(searchResultsModel.facetSelected[key], "All");
                }
            }

            function removeFacetItemSelection(key, value) {
                searchResultsModel.facetSelected[key] = _.without(searchResultsModel.facetSelected[key], value);
                searchResultsModel.facetDeselected[key] = new Array(value);

                // add all into the list if everthing is removed
                if (searchResultsModel.facetSelected[key].length < 1) {
                    searchResultsModel.facetSelected[key].push("All");
                }
            }

            function toggleFacetItemSelection(key, value, data) {
                // if the new facet selected is not added before then add it else ignore since we only need one instance
                if (_.indexOf(searchResultsModel.facetSelected[key], value) < 0) {
                    addFacetItemSelection(key, value);

                    // if at any point new facet is getting added and it is achild, make sure to remove other facets.
                    resetFacetsIfChildSelected(key, data);
                } else {
                    removeFacetItemSelection(key, value);
                    // if a parent is unselected all its child should get unselected
                    resetFacetsIfParentUnselected(key, data);
                }

            }

            function reConstructURL(link, selected, currentFacet, type, facetKey, parentFacet, children) {
                var sort = function(num) {
                        return num;
                    },
                    parentChildFacetKey, facetKeyExt, parentChildKey, flattenFacet;
                // convert URL to JSON
                var urlParams = getUrlVars(link);

                // loop through each selected facted update the URL params.
                for (var selectedFacet in selected) {
                    if (selected.hasOwnProperty(selectedFacet)) {
                        var key = [],
                            paramCount = 0,
                            facetValues = [],
                            deselected = '',
                            re = new RegExp("^(x|X)[0-9]+$");

                        for (var paramKey in urlParams) {
                            if (urlParams.hasOwnProperty(paramKey)) {
                                // keep the count. if the param is starting with x and increment count
                                if (re.test(paramKey)) {
                                    paramCount++;
                                }

                                // if param matched one from selected, add it to keys
                                // for example : x12 : KPMG_Filter_Year and selected["KPMG_Filter_Year"] = [2012]
                                if (urlParams[paramKey] === selectedFacet) {
                                    key.push(Number(paramKey.substr(1))); // return the number; x12 becomes 12; this is used to find q12 which has the existing param values.
                                }
                            }
                        }

                        // if length is zero means the key does not exist the param and need to be added.
                        // this happens when previously this filter was never used.
                        if (key.length === 0) {
                            key.push(++paramCount);
                            urlParams['q' + paramCount] = "All";
                            urlParams['x' + paramCount] = selectedFacet;
                        }

                        // sort the keys for each manipulation
                        key = _.sortBy(key, sort);

                        // fetch values by suffixing 'q';
                        // if this call is coming when deselecting a filter. we have to make sure the url should ignore the deselected value as well.
                        $.each(key, function(index, value) {
                            try {
                                facetValues.push(urlParams['q' + value].replace(/\+/gi, ' ').replace(/\%20/gi, ' ').split('|'));
                            } catch (err) {
                                facetValues.push(currentFacet["facet-name"]);
                            }
                        });

                        var filterOwnChild = function(selectedFacets) {
                            var filteredSelection = [],
                                parent, child, i;
                            for (i = 0; i < searchResultsModel.facets.length; i++) {
                                if (searchResultsModel.facets[i]["facet-title"] === currentFacet["facet-title"]) {
                                    parent = _.where(searchResultsModel.facets[i]['facet-values']["facet-item"], {
                                        "facet-name": currentFacet["facet-parent"]
                                    })[0];

                                    if (parent && parent["facet-has-children"] === "1") {
                                        child = _.where(parent["facet-children"]["facet-child"], {
                                            "facet-selected": true
                                        });
                                        _.map(child, function(childSelection) {
                                            filteredSelection.push(childSelection["facet-name"]);
                                        });
                                    }
                                }
                            }

                            filteredSelection.push(currentFacet["facet-name"]);
                            if (facetKey === selectedFacet) {
                                selectedFacets = filteredSelection;
                            }


                            return selectedFacets;
                        };

                        // combine the existing values and all new selection and create one.
                        flattenFacet = _.union(selected[selectedFacet]);

                        // this creates an undolink, ignore of all is not required because if case of ALL, that would the only filter present.
                        if (currentFacet["facet-name"] && currentFacet["facet-name"] !== "All") {
                            // make sure to remove the deselected item from the undolink url of others
                            if (searchResultsModel.facetDeselected[selectedFacet]) {
                                deselected = searchResultsModel.facetDeselected[selectedFacet];
                            }

                            if (type === "UNDOLINK") {
                                if (currentFacet["facet-name"] === "All") {
                                    currentFacet["facet-name"] = '';
                                }

                                // remove the deselected facet and the current facet from the undo link.
                                flattenFacet = _.without(flattenFacet, deselected[0]);
                                flattenFacet = _.without(flattenFacet, currentFacet["facet-name"]);

                            }

                            // this means its creating a link for child. remove the other selected items from the list.
                            if (parentFacet && children && type === "LINK") {

                                // chid facets shold only include belonging to its parent
                                flattenFacet = filterOwnChild(flattenFacet);
                                flattenFacet = _.union(flattenFacet, _.flatten(facetValues));


                                // get all the selected top level facets to know how to create link fir child.
                                var siblingSelections = _.where(parentFacet["facet-values"]["facet-item"], {
                                    "facet-selected": true
                                });
                                $.each(siblingSelections, function(index, exceptionFacet) {
                                    // all child link should not have any other facet except all or its parent
                                    if (exceptionFacet["facet-name"] !== "All" && exceptionFacet["facet-name"] !== currentFacet["facet-parent"]) {
                                        flattenFacet = _.without(flattenFacet, exceptionFacet["facet-name"]);
                                    }
                                });
                            }


                            // Parent facets should not have facets and its child if a child is selected
                            if (!children && type === "LINK") {
                                var parentfacets = _.where(searchResultsModel.facets, {
                                        "facet-title": currentFacet["facet-title"]
                                    })[0],
                                    siblingSelections_;
                                if (parentfacets) {
                                    siblingSelections_ = _.where(parentfacets["facet-values"]["facet-item"], {
                                        "facet-children-selected": true
                                    });
                                    $.each(siblingSelections_, function(index, exceptionFacet) {
                                        if (exceptionFacet["facet-name"] !== "All" && exceptionFacet["facet-name"] !== currentFacet["facet-parent"]) {
                                            flattenFacet = _.without(flattenFacet, exceptionFacet["facet-name"]);
                                            if (getChildFacetKey(exceptionFacet["facet-key"]) === selectedFacet) {
                                                flattenFacet = ["All"];
                                            }
                                        }
                                    });

                                }
                            }


                            if (type === "LINK" && facetKey === selectedFacet) {
                                flattenFacet = _.union(flattenFacet, [currentFacet["facet-name"]]);
                                // any sibling child selected, then dont add it to link, because it will be deselected on this facet selection

                            }
                        }

                        // create parent/Child key based on the facetKey
                        parentChildFacetKey = _.last(facetKey.split('_'));
                        parentChildFacetKey = facetKey.replace(parentChildFacetKey, (parentChildFacetKey === parentSuffix(facetKey)) ? childSuffix(facetKey) : parentSuffix(facetKey));

                        // remove all if user has selected more than 2 filters.
                        if (flattenFacet.length > 1) {
                            flattenFacet = _.without(flattenFacet, "All");
                        } else if (flattenFacet.length === 0) {
                            flattenFacet = ["All"];
                        }

                        if (currentFacet["facet-name"] && currentFacet["facet-name"] === "All" && type === "LINK") {
                            if ((getParentFacetKey(facetKey) === selectedFacet) || getChildFacetKey(facetKey) === selectedFacet) {
                                flattenFacet = ["All"];
                            }
                        }

                        // undo link should not have child facets as well
                        if (type === "UNDOLINK" && selectedFacet === getChildFacetKey(facetKey) && isParent(facetKey)) {
                            if (children) {
                                flattenFacet = ["All"];
                            }
                        }

                        // removed duplicated values in the query param.
                        flattenFacet = _.uniq(flattenFacet.map(function(value) {
                            //replace all space with +;
                            return encodeURIComponent(decodeURIComponent(value)).replace(/ /g, '+').replace(/\%2B/g, '+').replace(/\%20/g, '+').replace(/\%2F/g,'~2F');
                        }));

                        // update the query value with the newly generated pipe seperated filters
                        urlParams['q' + key[0]] = _.sortBy(flattenFacet, sort).join('|');

                        // remove all other filters.
                        urlParams = _.omit(urlParams,
                            _.rest(key).map(function(value) {
                                return "q" + value;
                            }).join(','),
                            _.rest(key).map(function(value) {
                                return "x" + value;
                            }).join(',')
                        );

                    }
                }



                // reconstructURL based on the updated object.
                return ("?" + Object.keys(urlParams).map(function(key) {
                    return (key) + '=' + urlParams[key];
                }).join('&'));
            }

            function updateFilterUrl(facets, selected, children, parentFacets) {
                var link, facet;
                var facetkey, parentKey;

                // if its coming from child then get child items and rename the key with a _ch
                if (children) {
                    facet = facets['facet-children']["facet-child"];
                    parentKey = parentFacets["facet-key"];
                    facetkey = parentKey + childSuffix(parentKey);
                } else {
                    facet = facets['facet-values']["facet-item"];
                    facetkey = (facets["facet-has-children"]) ? facets["facet-key"] + parentSuffix(facets["facet-key"]) : facets["facet-key"];
                }

                for (var j = 0; j < facet.length; j++) {
                    var facetItem = facet[j];

                    // if the facet is already selected, then look for undolink, else we have to use link
                    link = (facetItem.undolink) ? facetItem.undolink : facetItem.link;

                    if (_.indexOf(selected[facetkey], facet[j]["facet-name"]) >= 0) {
                        facetItem.undolink = reConstructURL(link, selected, facetItem, "UNDOLINK", facetkey, facets, children);

                        if (facetItem["facet-name"] === 'All' && selected[facetkey].length > 1) {
                            facetItem.link = reConstructURL(link, selected, facetItem, "LINK", facetkey, facets, children);
                        }

                        // PARENT AUTO SELECTION
                        // when child is selected, automatically parent gets selected
                        if (children && facetItem["facet-parent"]) {
                            var parentLink = (facets["facet-selected"]) ? facets.undolink : facets.link;
                            facets.undolink = reConstructURL(parentLink, selected, facets, "UNDOLINK", parentKey + parentSuffix(parentKey), facets, children);
                        }

                        // RECURSIVE INTO CHILD
                        if (facetItem["facet-has-children"]) {
                            facetItem = updateFilterUrl(facetItem, selected, true, facets);
                        }
                    } else {
                        facetItem.link = reConstructURL(link, selected, facetItem, "LINK", facetkey, parentFacets, children);
                        // RECURSIVE INTO CHILD
                        if (facetItem["facet-has-children"]) {
                            facetItem = updateFilterUrl(facetItem, selected, true, facets);
                        }
                    }
                    if (facet.length === 2 && !facetItem["facet-parent"]) {
                        if (facetItem["facet-name"] === 'All') {
                            facetItem['facet-hide'] = "hide";
                        }
                        else{
                            facetItem['facet-selected'] = true;
                            facetItem.disabled = "disabled";
                        }
                    }
                }
                if (facet.length === 1) {
                    facets['category-hide'] = "hide";
                }

                return facets;
            }

            /**
             * Gets called with each facet, it loops through its item and child item and update the selection and url
             * Facets {Object} each facet (include child)
             * Selected {Object} current selected filters, uses to generate new URL
             * children {Boolean} true if the facet is a child
             * parentKey {String} name of the parent Facet when working with child
             * */
            function updateFilter(facets, selected, children, parentFacets) {

                var link, facet;
                var facetkey, parentKey;

                // if its coming from child then get child items and rename the key with a _ch
                if (children) {
                    facet = facets['facet-children']["facet-child"];
                    parentKey = parentFacets["facet-key"];
                    facetkey = parentKey + childSuffix(parentKey);
                } else {
                    facet = facets['facet-values']["facet-item"];
                    facetkey = (facets["facet-has-children"]) ? facets["facet-key"] + parentSuffix(facets["facet-key"]) : facets["facet-key"];
                }

                for (var j = 0; j < facet.length; j++) {
                    var facetItem = facet[j];
                    facetItem["facet-name"] = convertHexNCR2Char(facetItem["facet-name"]);

                    // if the facet is already selected, then look for undolink, else we have to use link
                    link = (facetItem["facet-selected"]) ? facetItem.undolink : facetItem.link;

                    // make the facet item selected based on selection. else remove it.
                    if (_.indexOf(selected[facetkey], facetItem["facet-name"]) >= 0) {
                        // FACET SELECTION
                        // set the facet selected to true for all the selection matched facet items.
                        facetItem["facet-selected"] = true;
                        facetItem["facet-parent"] = facets['facet-name'];
                        facetItem["facet-title"] = facets['facet-title'];
                        facetItem["facet-key"] = facetkey;
                        // facetItem.undolink = reConstructURL(link, selected, facetItem,"UNDOLINK",facetkey,parentKey);


                        // ALL FACET UNSELECTION IF OTHER FACET SELECTED
                        if (facetItem["facet-name"] === 'All' && selected[facetkey].length > 1) {
                            delete facetItem["facet-selected"];
                            // facetItem.link = reConstructURL(link, selected, facetItem,"LINK",facetkey,parentKey);
                        }

                        // RECURSIVE INTO CHILD
                        if (facetItem["facet-has-children"]) {
                            facetItem = updateFilter(facetItem, selected, true, facets);
                        }

                    } else {

                        delete facetItem["facet-selected"];
                        facetItem["facet-parent"] = facets['facet-name'];
                        facetItem["facet-title"] = facets['facet-title'];
                        facetItem["facet-key"] = facetkey;

                        // facetItem.link = reConstructURL(link, selected, facetItem,"LINK", facetkey,parentKey);

                        // RECURSIVE INTO CHILD
                        if (facetItem["facet-has-children"]) {
                            facetItem = updateFilter(facetItem, selected, true, facets);
                        }
                    }
                }

                if (children) {
                    if (_.where(facet, {"facet-selected": true}).length) {
                        facets["facet-children-selected"] = true;
                    } else {
                        delete facets["facet-children-selected"];
                    }
                }
                return facets;
            }

            function mergeDeep(target, source, currentSelection) {
                var linkName, datalink;
                if (typeof target === 'object' && typeof source === 'object') {
                    var targetFacetItem = target['facet-values']['facet-item'];
                    var sourceFacetItem = source['facet-values']['facet-item'];

                    // if the filter is not the current selected then update with latest from snp.
                    if (currentSelection !== '' && currentSelection.indexOf(source["facet-key"]) < 0) {
                        target = source;
                    }

                    // loop through each new section and find the same in the target, if found replace it with updated one.
                    for (var j = 0; j < targetFacetItem.length; j++) {

                        targetFacetItem[j]['facet-name'] = convertHexNCR2Char(targetFacetItem[j]['facet-name']);
                        var index = sourceFacetItem
                            .map(function(e) {
                                return convertHexNCR2Char(e['facet-name']);
                            })
                            .indexOf(targetFacetItem[j]['facet-name']);

                        if (index > -1) {
                            targetFacetItem[j] = $.extend(false, targetFacetItem[j], sourceFacetItem[index]);

                            // if its first time then create the selection object based on facet selected
                            if (targetFacetItem[j]["facet-selected"] && searchResultsModel.initialSearch) {
                                var facetKey = (target["facet-has-children"]) ? target["facet-key"] + parentSuffix(target["facet-key"]) : target["facet-key"];
                                addFacetItemSelection(facetKey, targetFacetItem[j]['facet-name']);
                            }
                        }

                    }

                }
                return target;
            }

            function getFacetFilter(previousSelection, currentSelection) {
                var i, j;
                var index = currentSelection.map(function(item) {
                        return item['facet-title'];
                    })
                    .indexOf("Blog Author");

                if(index > -1) {
                    currentSelection.splice(index, 1);
                }

                // if there is previous selection, then return the new selection
                // this is useful when the page is loaded for first time.
                // if user clicks on clear all, reset the facets to default (which can be currently the currentselection)
                if (Object.keys(previousSelection).length <= 0 || searchResultsModel.reset) {
                    searchResultsModel.initialSearch = true;
                    searchResultsModel.reset = false;
                    // if this request initiated from URL then dont clean the selection because its created from the URL. we need it to create the
                    // facet selection
                    if (!searchResultsModel.deeplinked) {
                        searchResultsModel.facetSelected = {};
                        searchResultsModel.deeplinked = false;
                    }
                    searchResultsModel.facetDeselected = {};
                    previousSelection = currentSelection;
                } else {
                    searchResultsModel.initialSearch = false;
                }

                for (i = 0; i < previousSelection.length; i++) {
                    if (currentSelection[i]) {

                        currentSelection[i]["facet-key"] = queryKey[currentSelection[i]["facet-title"]].key;
                        currentSelection[i]["facet-has-children"] = queryKey[currentSelection[i]["facet-title"]]["has-child"];
                        previousSelection[i] = mergeDeep(previousSelection[i], currentSelection[i], searchResultsModel.currentSelection);
                    }
                }

                // update facet selection based on many logics
                for (i = 0; i < previousSelection.length; i++) {
                    previousSelection[i] = updateFilter(previousSelection[i], searchResultsModel.facetSelected);
                }

                // now that the facet selection is decided, construct the URL.
                for (i = 0; i < previousSelection.length; i++) {
                    previousSelection[i] = updateFilterUrl(previousSelection[i], searchResultsModel.facetSelected);
                }
                // once the URLs are been completely reconstructed, reset the facetDeselected object for future.
                searchResultsModel.facetDeselected = {};
                return previousSelection;
            }

            function fetchSearchResults(callback, params, operation) {
                var searchParams = params;
                if (ajaxService.params.baseUrl.indexOf('facets=true') > -1 || ajaxService.params.baseUrl.indexOf('facets=false') > -1) {
                    ajaxService.params.baseUrl = ajaxService.params.baseUrl.replace(/&?facets=(true|false)/gi, '');
                }
                if (searchParams.indexOf('facets=true') > -1 || searchParams.indexOf('facets=false') > -1) {
                    searchParams = searchParams.replace(/&?facets=(true|false)/gi, '');
                }
                searchParams = searchParams + '&facets=false';
                ajaxService.searchFetch(callback, searchParams, operation);

                if (!personalizationUtils.commonUtils.isMobile()) {
                    if (ajaxService.params.baseUrl.indexOf('facets=false') > -1 || ajaxService.params.baseUrl.indexOf('facets=true') > -1) {
                        ajaxService.params.baseUrl = ajaxService.params.baseUrl.replace(/&?facets=(true|false)/gi, '');
                    }
                    if (params.indexOf('facets=false') > -1 || params.indexOf('facets=true') > -1) {
                        params = params.replace(/&?facets=(true|false)/gi, '');
                    }
                    facetParams = params + '&facets=true';
                    if (window.searchFacetsFlag || !fetchFacets) {
                        ajaxService.searchFetch(generateFacets, facetParams);
                    }
                }

                cacheObject.facetsOverlay.show();
            }

            function handleServiceRequestOnload(data, paramUrl, operation) {
                if (kpmgAssetDomain) {
                    data = $.extend(true, data, {
                        "assetDomainName": kpmgAssetDomain
                    });
                }

                $('.web-spinner').remove();

                var tabCollection = Helpers.filterJSON(data, "tabs"),
                    resultCollection = Helpers.filterJSON(data, "resultset")[0],
                    featuredResultCollection = Helpers.filterJSON(data, "featured_products")[0];
                if (featuredResultCollection && featuredResultCollection.result[0]) {
                    $.each(featuredResultCollection.result, function(index, val) {
                        val.favourite = true;
                    });
                }
                searchResultsModel.results = $.merge(featuredResultCollection.result, Helpers.filterJSON(resultCollection, "result")[0]);

                //KPMG_Article_Date
                searchResultsModel.tabs = Helpers.filterJSON(tabCollection, "facet-item")[0];
                searchResultsModel.totalResults = Helpers.filterJSON(data, "searchheader")[0];
                searchResultsModel.SelectBoxOptions = Helpers.filterJSON(data, "sort-option")[0];
                searchResultsModel.pagination = Helpers.filterJSON(data, "pagination")[0];
                searchResultsModel.breadcrumbs = Helpers.filterJSON(data, "breadcrumb-item")[0];
                searchResultsModel.suggestions = Helpers.filterJSON(data, "suggestions")[0];
                searchResultsModel.currentQuery = cacheObject.searchInput.val();

                generateTabs();
                generateGridHeader();
                //generateFacets();


                if (searchResultsModel.results[0]) {
                    $(".noDataFound").hide();
                    $(".resultsContainer").removeClass("search-noResults");
                    generateResultList();
                    cacheObject.resultsContainer.show();
                    cacheObject.advancedSearchCta.show();
                    cacheObject.facetsContainer.show();
                } else {
                    $(".noDataFound").show();
                    $(".resultsContainer").addClass("search-noResults");
                    //Append suggestions to results section in 0 results scenario
                    cacheObject.resultsPanel.empty();
                    cacheObject.resultsPanel.html($('.zero-results-suggestions'));
                    $('.zero-results-suggestions').removeClass('hidden');
                    cacheObject.resultsContainer.show();
                    cacheObject.advancedSearchCta.hide();
                    cacheObject.facetsContainer.hide();
                    cacheObject.loadMoreContainer.hide();
                }
                searchAnalyticFunc(operation);
                if (typeof operation !== "undefined") {
                    if (operation === "sort") {
                        Helpers.triggerTracking({
                            "sortType": $(".sortOptions").val()
                        }, "Search Sort");
                    } else if (operation === "checkBoxFilters") {
                        Helpers.triggerSatteliteTracking("searchFiltersApplied");
                    } else if (operation !== "") {
                        Helpers.triggerTracking({
                            "searchTab": operation
                        }, "Search Tab");
                    }
                }
                if (isIE || isFirefox) {
                    $("select").addClass("custom-dropdown");
                }

                var Urlparam = removeParameter(paramUrl.url.split('?')[1], 'keyword');
                Urlparam = removeParameter(Urlparam, 'SES');
                Urlparam = removeParameter(Urlparam, 'q');
                var paramsOfUrl = Helpers.getUrlParams(paramUrl.url);
                if(paramsOfUrl.q) {
                    Urlparam += '&q=' + encodeURIComponent(paramsOfUrl.q);
                }
                if (paramsOfUrl.SES) {
                    Urlparam += '&SES=' + paramsOfUrl.SES;
                    searchResultsModel.queries.SES = paramsOfUrl.SES;
                } else if (searchResultsModel.queries.SES) {
                    Urlparam += '&SES=' + searchResultsModel.queries.SES;
                }
                Urlparam = '?' + Urlparam;
                router.navigate(Urlparam);
                generateHighlighter();

                globalLoadingElements(operation);

                var backClicked = sessionStorage.getItem("backBtnClicked");
                if (backClicked === "false") {
                    var currentURL = window.location.href;
                    var oldData = sessionStorage.getItem("backBtnItems").concat(',');
                    var mergeData = oldData.concat(currentURL);
                    sessionStorage.setItem("backBtnItems", mergeData);
                    sessionStorage.setItem("backBtnClicked", false);
                }

                searchResultsModel.queries = Helpers.getUrlParams(decodeURIComponent(location.href));
                cacheObject.searchInput.val(searchResultsModel.totalResults.searchQuery.replace(" " + searchResultsModel.queries.SES, ""));
                $('.search-query-text').html(searchResultsModel.totalResults.searchQuery.replace(" " + searchResultsModel.queries.SES, "")).removeClass('hidden');

                cacheObject.loaderOverlay.hide();

            }

            function generateHighlighter() {
                //Getting "q" value for Did you mean
                if (highLighterDidYouMean === 1) {
                    var queryUrl = "/search";
                    var param = window.location.search ? window.location.search : "";
                    queryUrl += param ? param : "?q=";
                    queryUrl = decodeURIComponent(queryUrl);
                    var temp = getUrlVars(queryUrl);
                    valueHighlight = decodeURIComponent(temp.q);
                    highLighterDidYouMean = 0;
                }
                valueHighlight = valueHighlight.replace(/[`~!@#$%^&*()_|+\-=?;:''",.<>\{\}\[\]\\\/]/gi, ' ');
                if (valueHighlight) {
                    $('.resultsListContainer .resultSet .textContainer').each(function() {
                        if (!$(this).hasClass('highLighter')) {
                            var temp = valueHighlight.split(" ");
                            for (var i = 0; i < temp.length; i++) {
                                var resultsetHtmlHeader = $(this).find('h3 p').contents();
                                var resultsetHtmlDescription = $(this).find('p.description').contents();
                                var resultsetHtmlPeople = $(this).find('p.peopleDetails').contents();
                                var valueKeyword = temp[i];
                                if (valueKeyword) {
                                    valueKeyword = valueKeyword.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');
                                    var pattern = new RegExp('(' + valueKeyword + ')', 'gi');
                                    var j, resultHtmlHeader = "";
                                    for (j = 0; j < resultsetHtmlHeader.length; j++) {
                                        var resultHeader;
                                        if (resultsetHtmlHeader[j].nodeType === 3) {
                                            resultHeader = resultsetHtmlHeader[j].nodeValue;
                                            resultHeader = resultHeader.replace(pattern, '<strong>$1</strong>');
                                            resultHtmlHeader = resultHtmlHeader + "" + resultHeader;
                                        } else {
                                            resultHeader = resultsetHtmlHeader[j].outerHTML;
                                            resultHtmlHeader = resultHtmlHeader + "" + resultHeader;
                                        }
                                    }
                                    $(this).find('h3 p').html(resultHtmlHeader);

                                    var k, resultHtmlDescription = "";
                                    for (k = 0; k < resultsetHtmlDescription.length; k++) {
                                        var resultDescription;
                                        if (resultsetHtmlDescription[k].nodeType === 3) {
                                            resultDescription = resultsetHtmlDescription[k].nodeValue;
                                            resultDescription = resultDescription.replace(pattern, '<strong>$1</strong>');
                                            resultHtmlDescription = resultHtmlDescription + "" + resultDescription;
                                        } else {
                                            resultDescription = resultsetHtmlDescription[k].outerHTML;
                                            resultHtmlDescription = resultHtmlDescription + "" + resultDescription;
                                        }
                                    }
                                    $(this).find('p.description').html(resultHtmlDescription);

                                    var l, resultHtmlPeople = "";
                                    for (l = 0; l < resultsetHtmlPeople.length; l++) {
                                        var resultPeople;
                                        if (resultsetHtmlPeople[l].nodeType === 3) {
                                            resultPeople = resultsetHtmlPeople[l].nodeValue;
                                            resultPeople = resultPeople.replace(pattern, '<strong>$1</strong>');
                                            resultHtmlPeople = resultHtmlPeople + "" + resultPeople;
                                        } else {
                                            resultPeople = resultsetHtmlPeople[l].outerHTML;
                                            resultHtmlPeople = resultHtmlPeople + "" + resultPeople;
                                        }
                                    }
                                    $(this).find('p.peopleDetails').html(resultHtmlPeople);
                                }
                            }
                            $(this).addClass('highLighter');
                        }
                    });
                }
            }

            function removeParameter(url, parameter) {
                var urlparts = url;
                var prefix = encodeURIComponent(parameter) + '=';
                var pars = urlparts.split(/[&;]/g);
                for (var i = pars.length; i-- > 0;) {
                    if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                        pars.splice(i, 1);
                    }
                }
                url = pars.join('&');
                return url;
            }

            function generateSearchInput() {
                cacheObject.thisSiteBtn.on('click', searchInThisSite);
                cacheObject.allSitesBtn.on('click', searchInAllSites);

                if (sessionStorage.getItem("backBtnItems").length > 0) {
                    cacheObject.prevPageLink.removeClass('hide');
                } else {
                    $(".search-input").addClass("search-noResults-input");
                }
                $('#submitSearch').on('click', searchSubmitted);
                $(".nav-primary-menu-item").on('mouseenter', hideSearchSuggestion);
                var widgetInst = cacheObject.searchInput.on('keypress', searchOnKeyPress).autocomplete({
                    delay: 120,
                    minLength: 0,
                    open: function() {
                        var recentHead = $('.recent_item_heading');
                        if (recentHead[0]) {
                            recentHead.removeClass('ui-menu-item');
                            recentHead.off('click');
                        }
                    },
                    close: function() {
                        $('ul.ui-autocomplete').css({
                            'position': 'fixed',
                            'z-index': '100'
                        });
                    },
                    source: function(request, response) {
                        request.term = request.term.replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, "");
                        var smartLogicURL = cacheObject.domainArr[0] + '//' + cacheObject.domainArr[2] + '/ses?TBDB=disp_taxonomy&template=service.json&service=PREFIX&term_prefix=' + request.term + '&lang=' + searchResultsModel.CQModel.searchLanguage + '&language=' + searchResultsModel.CQModel.searchLanguage + "&prefix_results_limit=" + searchResultsModel.CQModel.sesPrefixResultsLimit + "&FILTER=DE=" + searchResultsModel.CQModel.commonModelId + "&DE=" + searchResultsModel.CQModel.localCountryModelId,
                            //var smartLogicURL = cacheObject.domainArr[0] + '//' + cacheObject.domainArr[2] + '/ses?TBDB=disp_taxonomy&template=service.json&service=PREFIX&term_prefix=' + request.term + '&lang=' + searchResultsModel.CQModel.searchLanguage + '&language=' + searchResultsModel.CQModel.searchLanguage +"&prefix_results_limit=100",
                            minLength = cacheObject.searchInput.autocomplete("option", "minLength"),
                            recentList = manageRecentSearch.get(),
                            headerObject = [{
                                "label": cacheObject.i18nModel.yourRecentSearchCopy,
                                "value": "recent_item_heading"
                            }],
                            matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(cacheObject.searchInput.val()), "i");
                        $('ul.ui-autocomplete').css({
                            'position': 'absolute',
                            'z-index': '0'
                        });
                        if (minLength >= 3) {
                            $.ajax({
                                url: smartLogicURL,
                                success: function(data) {
                                    parseJSON = (data) ? data.termHints : [];
                                    if (parseJSON && parseJSON[0]) {
                                        var jsonObject = _.chain(parseJSON)
                                            .groupBy("name")
                                            .map(function(value, keyName) {
                                                return {
                                                    label: keyName,
                                                    value: _.map(value, function(val) {
                                                        return val.id;
                                                    })
                                                };
                                            }).value(),
                                            startWith = _.filter(jsonObject, function(val) {
                                                return matcher.test(val.label);
                                            }),
                                            contains = _.difference(jsonObject, startWith),
                                            collection = _.union(startWith, contains);
                                        collection = _.first(collection, 5);
                                        collection = (collection[0] && recentList[0]) ? _.union(collection, headerObject, recentList) : collection;
                                        response(collection);
                                        if (matcher.test(collection[0].label)) {
                                            inputTypeAhead.setVal(cacheObject.searchInput, collection[0].label, elem);
                                        } else {
                                            inputTypeAhead.clearTypeAhead();
                                        }
                                    } else {
                                        inputTypeAhead.clearTypeAhead();
                                    }
                                },
                                error: $.proxy(function(e) {
                                    console.log(e.respone);
                                }, this)
                            });
                        } else {
                            if (recentList[0]) {
                                response(_.union(headerObject, recentList));
                            }
                        }
                    },
                    focus: function(evt, ui) {
                        if (ui.item.value === "recent_item_heading") {
                            evt.preventDefault();
                            $('.recent_item_heading').next('li').trigger('mouseenter');
                            return false;
                        }
                        inputTypeAhead.clearTypeAhead();
                        $(".ui-helper-hidden-accessible").hide();
                        cacheObject.searchInput.val(ui.item.label);
                        evt.preventDefault();
                        return false;
                    },
                    select: function(event, ui) {
                        if (ui.item && ui.item.value) {
                            if (ui.item.value !== "recent_item_heading") {
                                cacheObject.searchInput.val(ui.item.label);
                                cacheObject.selectedValue = ui.item.value;
                                cacheObject.suggestionSelected = true;
                            } else {
                                event.preventDefault();
                                return false;
                            }
                        }
                        event.preventDefault();
                        return false;
                    }
                }).on('keyup', function(e) {
                    var _this = $(this),
                        minLength = (_this.val() === "" || _this.val().length < 3) ? 0 : 3;
                    cacheObject.searchInput.autocomplete("option", "minLength", minLength);
                    inputTypeAhead.doKeyUp(_this, e);
                }).on('focus', function() {
                    cacheObject.searchInput.trigger('keydown');
                }).on('blur', function() {
                    inputTypeAhead.clearTypeAhead();
                    /*
                     * Forcefully hide jquery autocomplete loader icon on blur because
                     * some scenario jquery auto complete loader is not disapearing by default
                     *
                     */
                    cacheObject.searchInput.addClass('ui-autocomplete-input').removeClass('ui-autocomplete-loading');
                }).on('keydown', function(e) {
                    inputTypeAhead.doKeyDown($(this), e);
                }).data('ui-autocomplete');
                widgetInst._renderItem = function(ul, item) {
                    var li = (item.value === "recent_item_heading") ? $("<li class='recent_item_heading'>") : $("<li>");
                    return li
                        .attr("data-value", item.value)
                        .text(item.label)
                        .appendTo(ul);
                };

                function searchByInput() {
                    if (!cacheObject.suggestionSelected) {
                        cacheObject.selectedValue = null;
                    }
                    if (cacheObject.searchInput.val()) {
                        cacheObject.loaderOverlay.show();
                        var selectedTerm = cacheObject.searchInput.val().replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, ""),
                            recentList = manageRecentSearch.get(),
                            selectedObject = {
                                "label": selectedTerm,
                                "value": cacheObject.selectedValue
                            };
                        valueHighlight = cacheObject.searchInput.val();
                        if (recentList[0]) {
                            var existSearch = _.find(recentList, function(val) {
                                return val.label.toLowerCase().trim() === selectedTerm.toLowerCase().trim();
                            });
                            if (existSearch) {
                                manageRecentSearch.reset();
                                var removedExist = _.reject(recentList, function(val) {
                                    return val.label.toLowerCase().trim() === selectedTerm.toLowerCase().trim();
                                });
                                manageRecentSearch.set(removedExist[0] ? _.union(removedExist, [selectedObject]) : [selectedObject]);
                            } else {
                                if (recentList.length === manageRecentSearch.maxRecentItemCt) {
                                    recentList.shift();
                                }
                                manageRecentSearch.set(_.union(recentList, [selectedObject]));
                            }
                        } else {
                            manageRecentSearch.set([selectedObject]);
                        }
                    }
                    cacheObject.suggestionSelected = false;
                    var searchTxt = cacheObject.searchInput.val();
                    searchTxt = searchTxt.replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, "");
                    var ecode_search = encodeURIComponent(searchTxt);
                    if (!cacheObject.selectedValue && parseJSON) {
                        parseJSON.some(function(element, i) {
                            if (searchTxt.toLowerCase() === element.name.toLowerCase()) {
                                cacheObject.selectedValue = [element.id];
                                searchTxt = element.name;
                                return true;
                            }
                        });
                    }
                    var params = cacheObject.selectedValue ? '?q=' + ecode_search + ' ' + cacheObject.selectedValue.join(' ') + '&sp_p=any&SES=' + cacheObject.selectedValue.join(' ') : '?q=' + ecode_search + '&sp_p=any';
                    params += '&facets=false';
                    var searchCheckParam = ($('#this-site').is(':checked')) ? searchResultsModel.CQModel.localSearchParam : searchResultsModel.CQModel.globalSearchParam;
                    ajaxService.params.baseUrl = cacheObject.i18nModel.searchNPromoteUrl;
                    fetchSearchResults(handleServiceRequestOnload, params + searchCheckParam);
                    cacheObject.backBtnArray.push(params);

                }

                function searchSubmitted(e) {
                    e.stopImmediatePropagation();
                    if (!parseJSON) {
                        setTimeout(function() {
                            //wait for configured(cacheObject.suggestionWaitTime) milliseconds till the smartlogic auto-suggestion gets loaded
                            searchByInput();
                        }, cacheObject.suggestionWaitTime);
                    } else {
                        searchByInput();
                    }
                }

                function hideSearchSuggestion(e) {
                    $(".ui-autocomplete.ui-front.ui-menu.ui-widget.ui-widget-content").hide();
                }

                function searchOnKeyPress(e) {

                    e.stopImmediatePropagation();

                    var keycode = (e.keyCode ? e.keyCode : e.which);
                    if (keycode === 13) {
                        e.preventDefault();
                        if (!parseJSON) {
                            setTimeout(function() {
                                //wait for configured(cacheObject.suggestionWaitTime) milliseconds till the smartlogic auto-suggestion gets loaded
                                searchByInput();
                            }, cacheObject.suggestionWaitTime);
                        } else {
                            searchByInput();
                        }
                    }
                }

                function searchInThisSite(e) {
                    //var query = searchResultsModel.totalResults.searchQuery || cacheObject.searchInput.val();
                    var searchTxt = cacheObject.searchInput.val();
                    if (searchResultsModel.queries.SES) {
                        searchTxt = searchTxt.concat(' ', searchResultsModel.queries.SES);
                    }
                    searchTxt = searchTxt.replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, "");
                    var ecode_search = encodeURIComponent(searchTxt);

                    var params = '?q=' + ecode_search;
                    params += '&sp_p=any&facets=false';
                    resultList.currentPage = 1;
                    e.stopImmediatePropagation();
                    searchResultsModel.reset = true;
                    searchResultsModel.queries.all_sites = false;
                    cacheObject.loaderOverlay.show();
                    ajaxService.params.baseUrl = cacheObject.i18nModel.searchNPromoteUrl;
                    fetchSearchResults(handleServiceRequestOnload, params + requestUrls.localSearchParam);
                    cacheObject.backBtnArray.push(requestUrls.localSearchParam);
                    cacheObject.allSitesBtn.prop("checked", false);
                    cacheObject.thisSiteBtn.prop("checked", true);
                }

                function searchInAllSites(e) {
                    //var query = searchResultsModel.totalResults.searchQuery || cacheObject.searchInput.val();
                    var searchTxt = cacheObject.searchInput.val();
                    if (searchResultsModel.queries.SES) {
                        searchTxt = searchTxt.concat(' ', searchResultsModel.queries.SES);
                    }
                    searchTxt = searchTxt.replace(/[#&)\*\+=\;"'<>\?\%\\/]/g, "");
                    var ecode_search = encodeURIComponent(searchTxt);
                    var params = '?q=' + ecode_search;
                    params += '&sp_p=any&facets=false';
                    resultList.currentPage = 1;
                    e.stopImmediatePropagation();
                    searchResultsModel.reset = true;
                    searchResultsModel.queries.all_sites = true;
                    cacheObject.loaderOverlay.show();
                    ajaxService.params.baseUrl = cacheObject.i18nModel.searchNPromoteUrl;
                    fetchSearchResults(handleServiceRequestOnload, params + requestUrls.globalSearchParam);
                    cacheObject.backBtnArray.push(requestUrls.globalSearchParam);
                    cacheObject.allSitesBtn.prop("checked", true);
                    cacheObject.thisSiteBtn.prop("checked", false);
                }
            }

            function reverseArr(input) {
                var ret = [];
                for (var i = input.length - 1; i >= 0; i--) {
                    ret.push(input[i]);
                }
                return ret;
            }

            function generateTabs() {
                if (searchResultsModel.tabs) {
                    cacheObject.tabsContainer.empty();
                    $.each(searchResultsModel.tabs, function(index, val) {
                        val = $.extend(true, val, {
                            tab: cacheObject.i18nModel["tab" + index]
                        });

                        if( val.tab !== "Blogs" ||
                            document.referrer.indexOf(window.kpmgPersonalize.blogPath) > 0 ||
                            (val.tab === "Blogs" && parseInt(val['facet-count']) > 0) ) {
                            cacheObject.tabsContainer.append(tabs.tabsTemplate(val));
                        }
                    });
                }
                if (isIE) {
                    $(".tabCount").addClass("tabCount-ie");
                    $("select").addClass("custom-dropdown");
                }
                if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    $("select").addClass("custom-dropdown");
                }
            }

            function generateGridHeader() {
                searchResultsModel.totalResults.searchQuery = searchResultsModel.totalResults.searchQuery.replace(" " + searchResultsModel.queries.SES, "");
                cacheObject.resultsCountContainer.empty();
                cacheObject.resultsCountContainer.append(resultsCount.resultsCountTemplate(searchResultsModel));
                cacheObject.sortResultsContainer.empty();
                cacheObject.sortResultsContainer.append(gridHeader.searchHeaderTemplate(searchResultsModel));

                cacheObject.searchValContainer.removeClass('hidden');
                cacheObject.advancedSearchCta.removeClass('hidden');

                $('.sortOptions').on('change', sortOptions);

                function sortOptions(e) {
                    resultList.currentPage = 1;
                    e.stopImmediatePropagation();
                    cacheObject.loaderOverlay.show();
                    ajaxService.params.baseUrl = cacheObject.i18nModel.searchNPromoteUrl;
                    fetchSearchResults(handleServiceRequestOnload, $(".sortOptions>option:selected").data("link") + '&facets=false', "sort");
                }
            }

            function generateFacets(data, paramUrl, operation) {
                if (kpmgAssetDomain) {
                    data = $.extend(true, data, {
                        "assetDomainName": kpmgAssetDomain
                    });
                }
                searchResultsModel.facets = getFacetFilter(searchResultsModel.facets, Helpers.filterJSON(data, "facet")[0]);

                for (var i = 0; i < searchResultsModel.facets.length; i++) {
                    var facetItemArray = searchResultsModel.facets[i]['facet-values']['facet-item'];

                    facetItemArray = facetItemArray.map(function(facet) {
                        if (facet.link && facet.link.indexOf('facets=true') > -1) {
                            facet.link = facet.link.replace(/&?facets=true/gi, '');
                        } else if (facet.undolink && facet.undolink.indexOf('facets=true') > -1) {
                            facet.undolink = facet.undolink.replace(/&?facets=true/gi, '');
                        }
                        return facet;
                    });

                    searchResultsModel.facets[i]['facet-values']['facet-item'] = facetItemArray;
                }

                var searchInput = $('#search'),
                    searchTxt = cacheObject.searchInput.val();
                searchTxt = searchTxt.replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, "");
                var ecode_search = encodeURIComponent(searchTxt);
                var params = searchResultsModel.totalResults.ses_id ? '?SES_ID=' + searchResultsModel.totalResults.ses_id + '&q=' + ecode_search : '?q=' + ecode_search;
                //query = searchResultsModel.totalResults.searchQuery || searchInput.val();

                if (cacheObject.allSitesBtn.prop('checked') === true) {
                    cacheObject.searchClearAll.attr("data-link", params + requestUrls.globalSearchParam);
                } else if (cacheObject.thisSiteBtn.prop('checked') === true) {
                    cacheObject.searchClearAll.attr("data-link", params + requestUrls.localSearchParam);
                }
                //cacheObject.searchClearAll.attr("data-link", searchResultsModel.breadcrumbs[0].link);

                if (searchResultsModel.facets) {

                    cacheObject.facetsPanel.empty();
                    var i18nLabels = {
                        more: cacheObject.i18nModel.facetMoreButtonCopy,
                        KPMG_Cont_Type_Path: cacheObject.i18nModel.KPMG_Cont_Type_Path,
                        KPMG_Geo_Rel_Path: cacheObject.i18nModel.KPMG_Geo_Rel_Path,
                        KPMG_Market_Path: cacheObject.i18nModel.KPMG_Market_Path,
                        KPMG_Service_Pth_Loc: cacheObject.i18nModel.KPMG_Service_Pth_Loc,
                        KPMG_Topic_Path: cacheObject.i18nModel.KPMG_Topic_Path,
                        KPMG_Ind_Path_Loc: cacheObject.i18nModel.KPMG_Ind_Path_Loc,
                        KPMG_Filter_Year: cacheObject.i18nModel.KPMG_Filter_Year,
                        KPMG_Service_Path: cacheObject.i18nModel.KPMG_Service_Path,
                        KPMG_Ind_Path: cacheObject.i18nModel.KPMG_Ind_Path,
                        KPMG_EVENT_MEM_FIRM: cacheObject.i18nModel.KPMG_EVENT_MEM_FIRM,
                        KPMG_Event_Mem_Firm: cacheObject.i18nModel.KPMG_Event_Mem_Firm,
                        KPMG_Cont_Mem_Firm: cacheObject.i18nModel.KPMG_Cont_Mem_Firm,
                        KPMG_Blog_Topics: cacheObject.i18nModel.KPMG_Blog_Topics,
                        KPMG_FILTER_YEAR: cacheObject.i18nModel.KPMG_FILTER_YEAR,
                        ALL_TEXT: cacheObject.i18nModel.ALL_TEXT
                    };
                    $.each(searchResultsModel.facets, function(index, val) {
                        val["facet-values"] = $.extend(true, val["facet-values"], i18nLabels);
                        val["parent-suffix"] = parentSuffix(val["facet-key"]);
                        val["child-suffix"] = childSuffix(val["facet-key"]);
                        cacheObject.facetsPanel.append(facets.facetsTemplate(val));
                    });
                }
                $(".moreFacetsLink").on('click', moreFacetsView);
                $(".moreNestedFacetsLink").on('click', moreNestedFacetsView);
                $(".nestedFacetsToogleBtn").on('click', nestedFacetsToggleView);
                $(".nestedFacetsToogleBtn").on('focusout', function(evt) {
                    var thisSelector = $(evt.target);
                    thisSelector.removeClass("no-box-shadow");
                });
                $(".LT5Facets").on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).find(".nestedFacetsToogleBtn").trigger("click");
                    }
                });
                $(".LT5Facets").on('contextmenu', function() {
                    return false;
                });
                // add hidden text for accessibility to the facets
                $(".facetTitle").each(function() {
                    $(this).prepend($("<span class='sr-only'>" + $(".advanced-search-cta").data("filterbytext") + ": </span>"));
                });
                $(".facetName").each(function() {
                    $(this).prepend($("<span class='sr-only'>" + $(".advanced-search-cta").data("filterbytext") + ": </span>"));
                });

                function moreFacetsView(evt) {
                    var thisSelector = $(evt.target);
                    thisSelector.parent().prev().children(".facetsOptions").children(".GT5Facets").slideToggle();

                    if (thisSelector.prev().hasClass(stringConstants.chevronUp)) {
                        thisSelector.text(cacheObject.i18nModel.facetMoreButtonCopy);
                        thisSelector.prev().removeClass(stringConstants.chevronUp).addClass(stringConstants.downArrow);
                        thisSelector.attr('aria-expanded', 'false');
                    } else {
                        thisSelector.text(cacheObject.i18nModel.lessButtonCopy);
                        thisSelector.prev().addClass(stringConstants.chevronUp).removeClass(stringConstants.downArrow);
                        thisSelector.attr('aria-expanded', 'true');
                    }
                }

                function moreNestedFacetsView(evt) {
                    $(evt.target).parent().parent().children(".GT5Facets").slideToggle();
                }

                function nestedFacetsToggleView(evt) {
                    var thisSelector = $(evt.target);
                    thisSelector.addClass("no-box-shadow");
                    thisSelector.closest('li.has-nested').children(".nestedFacets").slideToggle();

                    if (thisSelector.hasClass(stringConstants.downArrow)) {
                        thisSelector.removeClass(stringConstants.downArrow).addClass(stringConstants.chevronUp);
                        thisSelector.attr('aria-expanded', 'true');
                    } else {
                        thisSelector.addClass(stringConstants.downArrow).removeClass(stringConstants.chevronUp);
                        thisSelector.attr('aria-expanded', 'false');
                    }
                    if (evt.stopPropagation()) {
                        evt.stopPropagation();
                    }
                    return false;
                }

                $('.moreFacets .icon-chevron-down, .moreFacets .icon-chevron-up').on('click', function() {
                    $(this).next('a').trigger('click');
                });

                $('.facets-spinner').hide();
                cacheObject.facetsOverlay.hide();
                $('.facetsContent').show();
            }

            function handleRegistrationPromo(append) {
                var promoData = {
                        'hbs': {
                            'registrationPromo': {
                                'registrationTitleLabel': window.kpmgPersonalize.i18n.customMsgs.registrationPromoTitle,
                                'registrationDescriptionLabel': window.kpmgPersonalize.i18n.customMsgs.registrationPromoDescription,
                                'search': true
                            }
                        }
                    },
                    smartlogicTags = sessionStorage.getItem('smartLogicTags') ? JSON.parse(sessionStorage.getItem('smartLogicTags')) : {},
                    search = searchResultsModel.queries.q,
                    isMatched = false;

                search = searchResultsModel.queries.SES ? search.replace(searchResultsModel.queries.SES, '') : search;
                if(search){
                    search = search.replace(/\+/g, ' ').trim();
                }

                pickTag(smartlogicTags.tags || []);

                if(window.kpmgPersonalize.isSitePersonalize &&
                    !personalizationUtils.accountUtils.isLoggedIn() &&
                    !sessionStorage.getItem("registrationPromoOnSearch") &&
                    isMatched)
                {

                    sessionStorage.setItem("registrationPromoOnSearch", true);
                    if(append) {
                        cacheObject.resultsPanel.append(registrationPromo.promoTemplate(promoData));
                        $(".module-registration-promo").find('.heading').text($(".module-registration-promo").find('.heading').text().replace('{tag_name}', search));
                        $(".module-registration-promo").find('.description').text($(".module-registration-promo").find('.description').text().replace('{tag_name}', search));
                        $(".module-registration-promo").attr("href", CommonUtils.CONSTANTS.DOMAIN + links.register.url);
                        $(".module-registration-promo").removeClass('component hidden');
                    } else {

                        if(searchResultsModel.results.length === 1) {
                            cacheObject.resultsPanel.find(">a:first-child").after(registrationPromo.promoTemplate(promoData));
                        } else {
                            cacheObject.resultsPanel.find(">a:nth-child(2)").after(registrationPromo.promoTemplate(promoData));
                        }
                        $(".module-registration-promo").find('.heading').text($(".module-registration-promo").find('.heading').text().replace('{tag_name}', search));
                        $(".module-registration-promo").find('.description').text($(".module-registration-promo").find('.description').text().replace('{tag_name}', search));
                        $(".module-registration-promo").attr("href", CommonUtils.CONSTANTS.DOMAIN + links.register.url);
                        $(".module-registration-promo").removeClass('component hidden');
                    }

                    Helpers.triggerSatteliteTracking("searchCTA");

                }

                function pickTag(tagArray) {
                    var tag;

                    for (var i=0; i<tagArray.length; i++) {
                        tag = tagArray[i];
                        if(tag.name && search && tag.name.toLowerCase().trim() === search.toLowerCase().trim()) {
                            isMatched = true;
                        }

                        if(tag.tags && tag.tags.length) {
                            pickTag(tag.tags);
                        }
                    }

                }

            }

            function generateResultList() {

                renderLoadMore(searchResultsModel.pagination, resultList.currentPage);
                if (searchResultsModel.results) {
                    var resultsView = resultsViewCheck();
                    cacheObject.resultsPanel.empty();
                    $.each(searchResultsModel.results, function(index, val) {
                        val = $.extend(true, val, {
                            indexVal: index,
                            quickView: cacheObject.i18nModel.quickViewInTile,
                            resultsView: resultsView,
                            contactFormLinkCopy: cacheObject.i18nModel.contactFormLinkCopy,
                            peopleContactFormLink: searchResultsModel.CQModel.peopleContactFormLink,
                            assetDomainName: kpmgAssetDomain
                        });
                        cacheObject.resultsPanel.append(resultList.resultsTemplate(val));
                        if ((searchResultsModel.results.length - 1) === index) {
                            $('img.lazy', cacheObject.resultsPanel).unveil();
                        }

                        if(sessionStorage.getItem("smartLogicTags") !== null && sessionStorage.getItem("smartLogicTags") !== "") {
                            if(searchResultsModel.results.length === 1) {
                                handleRegistrationPromo(true);
                            } else if(index === 1) {
                                handleRegistrationPromo(true);
                            }
                        } else {
                            //Add promo component when smart logic tags are available
                            document.addEventListener("smartLogicTags", function() {
                                handleRegistrationPromo();
                            });
                        }
                    });

                    $('.secondary-head', cacheObject.resultsPanel).parent().on("click", function(e) {
                        var $row = $(this).find('.secondary-head'),
                            rowText = $row.text();
                        Helpers.triggerTracking({
                            "searchResult1": rowText,
                            "searchResult2": rowText,
                            "searchPosition": $row.closest('.result').index() + 1,
                            "events": "event25"
                        }, "Search Result");
                    });

                    $('.template').on('click', '.pcfLink', function(e) {
                        e.preventDefault();
                        var target = $(e.target);
                        window.kpmg.modalOpenerUrl = target.data('modal-url');
                        $("#kpmgModal").bs3modal({
                            remote: target.data("remote")
                        }).data('opener', target.attr('data-modal-url'));

                    });
                    //Accessibility
                    $(".modal-open, elem").on("keyup", function(e) {
                        if (e.which === 13) {
                            $(this).find("span").trigger("click");
                        }
                    });
                    $(".facetBox, elem").on("keyup", function() {
                        $(this).attr("tabindex", "-1").trigger('focus').parent().addClass("focusOutline");
                    });
                    $(".facetBox, elem").on("blur", function() {
                        $(this).removeAttr("tabindex").parent().removeClass("focusOutline");
                    });
                    $("a, input[type=submit], input[type=text], input[type=radio], select", elem).on("keyup", function(e) {
                        
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            var _thisParent = $(this).parents(".quickView>div");
                            if (_thisParent.length !== 0) {
                                $(this).attr("tabindex", "-1").trigger('focus');
                                _thisParent.addClass("focusOutline");
                            } else if ($(this).attr("type") === "radio") {
                                $(this).next("label").trigger('focus');
                                $(this).closest('.search-radio-form-group').addClass("focusOutline");
                            } else if ($(this).hasClass("sortOptions")) {
                                $(this).trigger('focus').parent(".custom-select").addClass("focusOutline");
                            } else if ($(this).parent().hasClass('resultSet')) {
                                $(this).trigger('focus').addClass("focusOutline");
                            } else {
                                $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            }
                        }
                    });
                    $("a, input[type=submit], input[type=text], input[type=radio], select", elem).on("blur", function() {
                        
                        var _thisParent = $(this).parents(".quickView>div");
                        if (_thisParent.length !== 0) {
                            $(this).removeAttr("tabindex", "-1");
                            _thisParent.removeClass("focusOutline");
                        } else if ($(this).attr("type") === "radio") {
                            //$(this).next("label").removeClass("focusOutline");
                            $(this).closest('.search-radio-form-group').removeClass("focusOutline");
                        } else if ($(this).hasClass("sortOptions")) {
                            $(this).parent(".custom-select").removeClass("focusOutline");
                        } else if ($(this).parent().hasClass('resultSet')) {
                            $(this).removeClass("focusOutline");
                        } else {
                            $(this).removeAttr("tabindex").removeClass("focusOutline");
                        }
                    });

                    $(".resultsContainer a", elem).on("keyup", function(e) {
                        if( e.which === 9 ) {
                            $(this).attr("tabindex", "-1").find(".result, .promo-wrapper").trigger('focus').addClass("focusOutline");
                        }
                    });

                    $(".resultsContainer a", elem).on("keydown", function(e) {
                        if( e.which === 9 ) {
                            $(this).find(".result, .promo-wrapper").removeClass("focusOutline");
                        }
                        else if( e.which === 13 ) {
                            window.location.href = $(this).attr('href');
                        }
                    });

                    $('.module-searchresults  .contact-btn, elem').on('keyup', function (e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).trigger('focus').addClass('focusOutline');
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });

                    $('.module-searchresults .contact-btn, elem').on('keydown', function(e) {
                        if( e.which === 9 ) {
                            $(this).removeClass('focusOutline');
                        }
                        if (e.which === 13) {
                            $(this).find('.modal-open').trigger("click");
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });

                    $('.module-searchresults .modal-open, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });

                    $('.module-searchresults .modal-open, elem').on('blur', function(e) {
                        $(this).removeClass('focusOutline');
                    });

                    $('.module-searchresults .quickview-btn, elem').on('keydown', function(e) {
                        if (e.which === 13) {
                            $(this).find('.component-link').trigger("click");
                        }
                    });

                    $('.module-searchresults .quickview-btn, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });

                    $('.module-searchresults .quickview-btn, elem').on('blur', function(e) {
                        $(this).removeClass('focusOutline');
                    });

                    $('#search-results-quick-view .contact-btn, elem').on('keydown', function(e) {
                        if (e.which === 13) {
                            $(this).find('.modal-inside-modal').trigger("click");
                        }
                    });

                    $('#search-results-quick-view .modal-inside-modal, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });

                    $('#search-results-quick-view .modal-inside-modal, elem').on('blur', function(e) {
                        $(this).removeClass('focusOutline');
                    });


                }

                function resultsViewCheck() {
                    return stringConstants.desktopContainer + ' col-md-12';
                }

                function renderLoadmoreResults(data, length) {
                    var resultsView = resultsViewCheck();
                    $.each(data, function(index, val) {
                        val = $.extend(true, val, {
                            indexVal: length + index,
                            quickView: cacheObject.i18nModel.quickViewInTile,
                            resultsView: resultsView,
                            contactFormLinkCopy: cacheObject.i18nModel.contactFormLinkCopy,
                            peopleContactFormLink: searchResultsModel.CQModel.peopleContactFormLink
                        });
                        cacheObject.resultsPanel.append(resultList.resultsTemplate(val));
                        if ((data.length - 1) === index) {
                            $('img.lazy', cacheObject.resultsPanel).unveil();
                        }
                    });


                    //Accessibility
                    $(".modal-open, elem").on("keyup", function(e) {
                        if (e.which === 13) {
                            $(this).find("span").trigger("click").removeClass(".focusOutline");
                        }
                    });
                    $(".facetBox, elem").on("keyup", function() {
                        $(this).attr("tabindex", "-1").trigger('focus').parent().addClass("focusOutline");
                    });
                    $(".facetBox, elem").on("blur", function() {
                        $(this).removeAttr("tabindex").parent().removeClass("focusOutline");
                    });
                    $("a, input[type=submit], input[type=text], input[type=radio]", elem).on("keyup", function(e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            var _thisParent = $(this).parents(".quickView>div");
                            if (_thisParent.length !== 0) {
                                $(this).attr("tabindex", "-1").trigger('focus');
                                _thisParent.addClass("focusOutline");
                            } else {
                                $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                            }
                        }
                    });
                    $("a, input[type=submit], input[type=text], input[type=radio]", elem).on("blur", function() {
                        var _thisParent = $(this).parents(".quickView>div");
                        if (_thisParent.length !== 0) {
                            $(this).removeAttr("tabindex", "-1");
                            _thisParent.removeClass("focusOutline");
                        } else {
                            $(this).removeAttr("tabindex").removeClass("focusOutline");
                        }
                    });

                    $('.module-searchresults .contact-btn, elem').on('keydown', function(e) {
                        if (e.which === 13) {
                            $(this).find('.modal-open').trigger("click");
                        }
                    });

                    $('.module-searchresults .modal-open, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });

                    $('.module-searchresults .modal-open, elem').on('blur', function(e) {
                        $(this).removeClass('focusOutline');
                    });

                    $('.module-searchresults .quickview-btn, elem').on('keydown', function(e) {
                        if (e.which === 13) {
                            $(this).find('.component-link').trigger("click");
                        }
                    });

                    $('.module-searchresults .quickview-btn, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });

                    $('.module-searchresults .quickview-btn, elem').on('blur', function(e) {
                        $(this).removeClass('focusOutline');
                    });

                    $('#search-results-quick-view .contact-btn, elem').on('keydown', function(e) {
                        if (e.which === 13) {
                            $(this).find('.modal-inside-modal').trigger("click");
                        }
                    });
                    $('#search-results-quick-view .modal-inside-modal, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });

                    $('#search-results-quick-view .modal-inside-modal, elem').on('blur', function(e) {
                        $(this).removeClass('focusOutline');
                    });
                }
                $(window).off().on('scroll', function() {
                    var scrollDown = false;
                    if ((resultList.currentPage >= 1) && ($('.resultSet>a').length >= 9)) {
                        if ($('.resultSet a:last', elem)[0]) {
                            scrollDown = CommonUtils.isScrolledIntoView($('.resultSet a:last', elem)[0]);
                        }
                    }
                    if (scrollDown && loadMore) {
                        $loader.show();
                        handleLoadMoreClick();
                    }
                });

                function renderLoadMore(data, currentPage) {
                    $loader.hide();
                    resultList.totalPages = data["total-pages"];
                    if (currentPage === parseInt(resultList.totalPages)) {
                        cacheObject.loadMoreContainer.hide();
                        loadMore = false;
                    } else {
                        if ((currentPage >= 1) && data['next-page']) {
                            loadMore = true;
                        }
                        if (isMobile) {
                            resultList.recordSize = 3;
                        }
                        cacheObject.loadMoreContainer.show();
                        var path = data["next-page"];                    
                        cacheObject.loadMoreBtn.attr('href', path);
                    }
                }

                function handleLoadMoreClick(e) {
                    loadMore = false;
                    cacheObject.loaderOverlay.show();
                    resultList.currentPage = resultList.currentPage + 1;
                    ajaxService.params.baseUrl = cacheObject.i18nModel.searchNPromoteUrl;
                    fetchSearchResults(handleServiceRequestLoadMore, cacheObject.loadMoreBtn.attr('href') + '&facets=false');
                    //ajaxService.searchFetch(handleServiceRequestLoadMore, cacheObject.loadMoreBtn.attr('href') + '&facets=false');
                }

                function handleServiceRequestLoadMore(data) {

                    if (kpmgAssetDomain) {
                        data = $.extend(true, data, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }

                    cacheObject.loaderOverlay.hide();
                    var featuredResults = Helpers.filterJSON(data, "featured_products")[0],
                        results = Helpers.filterJSON(data, "resultset")[0].results;
                    if (featuredResults.result[0]) {
                        $.each(featuredResults.result, function(index, val) {
                            val.favourite = true;
                        });
                    }
                    var loadMoreResults = $.merge(results.result, featuredResults.result),
                        resultSetLength = searchResultsModel.results.length;
                    searchResultsModel.results = $.merge(searchResultsModel.results, loadMoreResults);

                    var dateReg = /^\d{2}\s.*,\s\d{4},.*/,
                        timeexp = /(.*)\s(\d{2}:\d{2}.*)/,
                        eventStartTime;

                    renderLoadmoreResults(loadMoreResults, resultSetLength);
                    renderLoadMore(data['customer-results'].pagination, resultList.currentPage);
                    generateHighlighter();
                }
            }

            function globalLoadingElements(operation) {
                $(elem).on("click", ".clear-all-filters, .hasResults", function(evt) {
                    resetSearchResults(evt, true);
                });
                $(elem).on('click', ".facetsCheckbox input, .didyoumeanlink", resetSearchResults);
            }

            function resetSearchResults(evt, reset) {
                var targetText = $('.pull-left', $(evt.currentTarget)).text(),
                    _thisTarget = $(evt.currentTarget);

                if (_thisTarget.hasClass('clear-all-filters')) {
                    cacheObject.allSitesBtn.prop("checked", false);
                    cacheObject.thisSiteBtn.prop("checked", true);
                }
                resultList.currentPage = 1;
                evt.stopImmediatePropagation();
                evt.preventDefault();

                if ($(evt.currentTarget).data('key')) {
                    toggleFacetItemSelection($(evt.currentTarget).data('key'), $(evt.currentTarget).data('name') + "", $(evt.currentTarget).data());
                    searchResultsModel.currentSelection = $(evt.currentTarget).data('key');
                }
                cacheObject.loaderOverlay.show();
                ajaxService.params.baseUrl = cacheObject.i18nModel.searchNPromoteUrl;
                if (reset) {
                    searchResultsModel.reset = true;
                }

                if (_thisTarget.hasClass("hasResults")) {
                    fetchSearchResults(handleServiceRequestOnload, $(evt.currentTarget).attr("data-link") + '&facets=false', targetText);
                } else if (_thisTarget.hasClass("facetBox")) {
                    fetchSearchResults(handleServiceRequestOnload, $(evt.currentTarget).attr("data-link") + '&facets=false', "checkBoxFilters");
                } else if (_thisTarget.hasClass("didyoumeanlink")) {
                    fetchSearchResults(handleServiceRequestOnload, $(evt.currentTarget).attr("data-link") + '&facets=false', '');
                    highLighterDidYouMean = 1;
                    Helpers.triggerTracking({
                        "dym": encodeURI(_thisTarget.text()),
                        "events": "event24"
                    }, "DYM Click");
                } else if (_thisTarget.hasClass('clear-all-filters')) {
                    fetchSearchResults(handleServiceRequestOnload, $(evt.currentTarget).attr("data-link") + '&facets=false&sp_p=any', '');
                } else {
                    fetchSearchResults(handleServiceRequestOnload, $(evt.currentTarget).attr("data-link") + '&facets=false', '');
                }
                cacheObject.backBtnArray.push($(evt.currentTarget).attr("data-link"));
            }

            function loadPerviousPage(event) {
                var hasHttps, redirectLink;
                /*set back btn clicked flag to true*/
                window.sessionStorage.setItem("backBtnClicked", true);

                /*	Store the session storage values into an array,split using ','
					reload the page with the url based on the length-2
					pop out the last item in the array
					update the array into the session storage.
					If the length of the array is less than 2, which means
					the array has the current url and the document.referrer url

				*/
                var newTempArr = [];
                var backBtnDetails = sessionStorage.getItem("backBtnItems");
                newTempArr = backBtnDetails.split(',');
                var templen = newTempArr.length;
                //

                //
                redirectLink = newTempArr[templen - 2];
                hasHttps = (redirectLink && (redirectLink.indexOf('https:') === 0));
                var hacking = CommonUtils.isPhishing(redirectLink);

                if(hasHttps && !hacking) {
                    window.location.replace(redirectLink);
                }
                newTempArr.pop();
                if (newTempArr.length < 2) {
                    window.sessionStorage.setItem("backBtnItems", "");
                    window.sessionStorage.setItem("backBtnClicked", "");
                } else {
                    window.sessionStorage.setItem("backBtnItems", newTempArr.toString());
                }
            }
            // Keep the following lines at the bottom of the SearchResults function
            var trck = new Tracking(elem, 'SearchResults');
            $(document).trigger('template.loaded');
        };
        return SearchResults;
    }
);
