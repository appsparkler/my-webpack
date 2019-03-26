/* global s */
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
        'autoscroll',
        'personalizationUtils','common-utils',
        'cookiemgr', 'jqueryui', 'underscore',
        'handlebarshelpers'
    ],
    function($, $clamp, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers, Router, autoScroll, personalizationUtils,CommonUtils) {
        'use strict';
        var Resultlistingb = function(elem) {
            var loadMore = false,
                $loader = $('.web-spinner', elem),
                isMobile = personalizationUtils.commonUtils.isMobile();
            

            function getJSON(json, key) {
                var hits = [];
                $.each(json, function(k, v) {
                    if (k === key) {
                        hits.push(v);
                    }
                    if (typeof(v) === "string") {
                        return true;
                    } else if ($.isArray(v) || $.isPlainObject(v)) {
                        var r = getJSON(v, key);
                        if (r.length > 0) {
                            hits = hits.concat(r);
                        }
                    }
                });
                return hits;
            }
            var searchResultsModel = {
                    facets: {},
                    facetSelected: {},
                    facetDeselected: {},
                    facetChildSelected: {},
                    currentSelection:"",
                    tabs: {},
                    results: {},
                    SelectBoxOptions: {},
                    eventDropdownOptions: {},
                    activeUpcoming: "",
                    currentQuery: "",
                    pagination: {},
                    CQModel: JSON.parse($("#CQModel").attr('data-CQModal')),
                    totalResults: {},
                    breadcrumbs: {},
                    queries: Helpers.getUrlParams(decodeURIComponent(location.href)),
                    reset: false,
                    initialSearch: false,
                    deeplinked: false,
                    globalTaxFacets: ['KPMG_Ser_Path','KPMG_Ind_Path'],
                    defaultParentFacets: ['KPMG_Cont_Type_Path','KPMG_Geo_Rel_Path','KPMG_Market_Path','KPMG_Filter_Year','KPMG_Cont_Mem_Firm','KPMG_Event_Mem_Firm']
                },
                loadCounter = 0,
                mobileLatestFacetSelected = '',
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
                    "KPMG_Cont_Mem_Firm":{
                        "key": "KPMG_Cont_Mem_Firm",
                        "has-child" : false
                    },
                    "KPMG_Event_Mem_Firm": {
                        "key": "KPMG_Event_Mem_Firm",
                        "has-child": false
                    }
                },
                cacheObject = {
                    resultsContainer: $(".resultsSet"),
                    facetsContainer: $(".facets-container"),
                    tabsResultsContainer: $(".resultsListingcontainer"),
                    facetsTemp: 'resultlistingb-facets',
                    gridHeaderTemp: 'resultlistingb-searchHeader',
                    resultsTemp: 'resultlistingb-resultSet',
                    facetsPanel: $('.resp-tabs-list'),
                    sortResultsContainer: $('.sortResults'),
                    resultsPanel: $('.resultSet'),
                    modalContentPanel: $('.modal-content-panel'),
                    loadMoreBtn: $(".btn-more", elem),
                    loadMoreContainer: $(".loadMore"),
                    loaderOverlay: $(".overlay"),
                    loaderImg: $(".loaderImg"),
                    i18nModel: searchResultsModel.CQModel.i18nModel,
                    latestTemp: 'latestdropdown',
                    latestEventsTemp: 'latesteventsdropdown',
                    latestDropdown: $(".latest-dropdown"),
                    upcomingDropdown: $(".upcoming-dropdown")
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
                generateQuery = function() {
                    var queryUrl = window.location.search ? "/search/"+window.location.search : searchResultsModel.CQModel.globalSearchUrl;
                    var decodedUrl = decodeURIComponent(queryUrl);
                    toggleFacetItemSelectionFromURL(decodedUrl);
                    searchResultsModel.queries = Helpers.getUrlParams(decodedUrl);

                    if (decodedUrl.indexOf('facets=true') > -1 || decodedUrl.indexOf('facets=false') > -1) {
                        decodedUrl = decodedUrl.replace(/&?facets=(true|false)/gi, '');
                    }
                    return decodedUrl;
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
                latestTmp = {
                    latestTemplate: PrecompiledHandlebars[cacheObject.latestTemp],
                    latestEventsTemplate: PrecompiledHandlebars[cacheObject.latestEventsTemp]
                },
                gridHeader = {
                    searchHeaderTemplate: PrecompiledHandlebars[cacheObject.gridHeaderTemp]
                },
                resultList = {
                    resultsTemplate: PrecompiledHandlebars[cacheObject.resultsTemp],
                    currentPage: 1,
                    recordSize: 9,
                    totalPages: 0
                },
                pageMetaObject = personalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
                currentResultLength = 0;

            var router = new Router();
            router.config({
                    root: window.location.pathname,
                    mode: 'history'
                })
                .check(window.location.pathname + window.location.search)
                .listen();
            ajaxService.searchFetch(generateFacets, "&facets=true");
            if (window.KPMG.snpResults) {
                handleServiceRequestOnload(window.KPMG.snpResults, window.KPMG.snpParams);
            } else {
                //To handle when S&P call is taking time
                document.addEventListener("snpResultsPrioritize", function() {
                    handleServiceRequestOnload(window.KPMG.snpResults, window.KPMG.snpParams);
                });
            }
            if (dateFormatProperties) {
                $.merge(dateFormatProperties.fields, [{
                    "item4": "time"
                }]);
            }

            function fetchSnPResults(params, operation) {
                var searchParams = params || '',
                    facetParams = params || '';
                //Load results
                if (ajaxService.params.baseUrl.indexOf('facets=true') > -1 || ajaxService.params.baseUrl.indexOf('facets=false') > -1) {
                    ajaxService.params.baseUrl = ajaxService.params.baseUrl.replace(/&?facets=(true|false)/gi, '');
                }
                if (searchParams && searchParams.indexOf('facets=true') > -1 || searchParams && searchParams.indexOf('facets=false') > -1) {
                    searchParams = searchParams.replace(/&?facets=(true|false)/gi, '');
                }
                searchParams = searchParams + '&facets=false';
                ajaxService.searchFetch(handleServiceRequestOnload, searchParams, operation);

                //Load factes
                if (ajaxService.params.baseUrl.indexOf('facets=false') > -1 || ajaxService.params.baseUrl.indexOf('facets=true') > -1) {
                    ajaxService.params.baseUrl = ajaxService.params.baseUrl.replace(/&?facets=(true|false)/gi, '');
                }
                if (facetParams && facetParams.indexOf('facets=false') > -1 || facetParams && facetParams.indexOf('facets=true') > -1) {
                    facetParams = facetParams.replace(/&?facets=(true|false)/gi, '');
                }
                facetParams = facetParams + '&facets=true';
                ajaxService.searchFetch(generateFacets, facetParams);
            }

            function hex2char ( hex ) {
                // converts a single hex number to a character
                // note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
                // hex: string, the hex codepoint to be converted
                var result = '';
                var n = parseInt(hex, 16);
                if (n <= 0xFFFF) { result += String.fromCharCode(n); }
                else if (n <= 0x10FFFF) {
                    n -= 0x10000;
                    result += String.fromCharCode(0xD800 || (n > 10)) + String.fromCharCode(0xDC00 || (n && 0x3FF));
                }
                else { result += 'hex2Char error: Code point out of range'; }
                return result;
            }


            function convertHexNCR2Char ( str ) {
                // converts a string containing &#x...; escapes to a string of characters
                // str: string, the input
                str = $("<textarea/>").html(str).text();
                // convert up to 6 digit escapes to characters
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
                    myJson[hash[0]] = decodeURIComponent(hash[1]);
                }

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

            function isParent(key){
                var facetKeyExt = _.last(key.split('_'));

                if(facetKeyExt === 'pa' || facetKeyExt === 'Parent' || _.indexOf(searchResultsModel.defaultParentFacets, key) >= 0 ){
                    return true;
                } else {
                    return false;
                }
            }

            function isChild(key){
                    return !isParent(key);
                }

            function hasChildFacet(){}

            function parentSuffix(key) {
                if(isAllSites() && _.indexOf(searchResultsModel.globalTaxFacets, key) >= 0) {
                    return '_Parent';
                } else {
                    return '_pa';
                }
            }

            function childSuffix(key){
                if(isAllSites() && _.indexOf(searchResultsModel.globalTaxFacets, key) >= 0) {
                    return '_Child';
                } else {
                    return '_ch';
                }
            }

            function getChildFacetKey(key){
                if(isParent(key)) {
                    return key.replace('_pa','_ch').replace('_Parent','_Child');
                } else {
                    return key;
                }

            }

            function getParentFacetKey(key){
                if(!isParent(key)) {
                    return key.replace('_ch','_pa').replace('_Child','_Parent');
                } else {
                    return key;
                }
            }

            function resetFacetsIfParentUnselected(key, facet) {
                var parentKey = getParentFacetKey(key), filteredFacets, filteredChildFacets, i,j,selectedFacet;

                if(isParent(key)) {
                    for(i = 0; i < searchResultsModel.facets.length;i++) {
                        if(searchResultsModel.facets[i]["facet-title"] === facet.title) {
                            selectedFacet = _.where(searchResultsModel.facets[i]["facet-values"]["facet-item"],{"facet-name":facet.name})[0];

                            // removeFacetItemSelection(parentKey, selectedFacet["facet-name"]);
                            if(typeof selectedFacet !== "undefined" && selectedFacet["facet-has-children"] && selectedFacet["facet-has-children"] === "1") {
                                _.map(selectedFacet["facet-children"]["facet-child"], function(child){
                                    if(child["facet-selected"]) {
                                        delete child["facet-selected"];
                                        removeFacetItemSelection(getChildFacetKey(key), child["facet-name"]);
                                    }
                                });
                            }
                        }
                    }
                }
            }

            function resetFacetsIfChildSelected(key, facet){

                var i,j,selectedFacet;

                if(!facet) {
                    return;
                }
                // if a facet child is selected, all other facet with nested facet should get unselected
                var parentKey = getParentFacetKey(key), filteredFacets, filteredChildFacets;
                searchResultsModel.facetChildSelected[parentKey] = true;
                filteredFacets = searchResultsModel.facetSelected[parentKey];

                // get the parent selcted if the selected item is a child.
                if(isChild(key)) {

                    filteredChildFacets = searchResultsModel.facetSelected[getChildFacetKey(key)];
                    for(i = 0; i < searchResultsModel.facets.length;i++) {
                        if(searchResultsModel.facets[i]['facet-title'] === facet.title) {

                            // make parent selected when any child is selected
                            _.map(searchResultsModel.facets[i]['facet-values']['facet-item'], function(parent){
                                if(parent['facet-name'] === facet.parent) {
                                    parent['facet-selected'] = true;
                                    addFacetItemSelection(parentKey,parent['facet-name']);
                                }
                                return facet;
                            });

                            // make other selected removed
                            filteredFacets = searchResultsModel.facetSelected[parentKey];
                            filteredFacets = _.without(filteredFacets,facet.parent);

                            for(j = 0; j < filteredFacets.length; j++) {
                                selectedFacet = _.where(searchResultsModel.facets[i]["facet-values"]["facet-item"],{"facet-name":filteredFacets[j]})[0];
                                delete selectedFacet["facet-selected"];
                                removeFacetItemSelection(parentKey, selectedFacet["facet-name"]);
                                if(selectedFacet["facet-has-children"] === "1") {
                                    _.map(selectedFacet["facet-children"]["facet-child"], function(child){
                                        if(child["facet-selected"]) {
                                            removeFacetItemSelection(getChildFacetKey(key), child["facet-name"]);
                                        }
                                    });
                                }
                            }
                        }
                    }

                }

                if(isParent(key)) {
                    filteredFacets = searchResultsModel.facetSelected[parentKey];
                    filteredFacets = _.without(filteredFacets,facet.name);

                    for(i = 0; i < searchResultsModel.facets.length;i++) {
                        if(searchResultsModel.facets[i]["facet-title"] === facet.title) {
                            for(j = 0; j < filteredFacets.length; j++) {
                                selectedFacet = _.where(searchResultsModel.facets[i]["facet-values"]["facet-item"],{"facet-name":filteredFacets[j]})[0];
                                // if not ALL and not the parent of the selected child, and has children will get unselected.
                                if(selectedFacet["facet-name"] !== "All" &&  selectedFacet["facet-has-children"] === "1" && selectedFacet["facet-children-selected"]) {
                                    removeFacetItemSelection(parentKey, selectedFacet["facet-name"]);
                                    if(selectedFacet["facet-has-children"] === "1") {
                                        _.map(selectedFacet["facet-children"]["facet-child"], function(child){
                                            if(child["facet-selected"]) {
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

            function toggleFacetItemSelectionFromURL(url){
                var urlParams = getUrlVars(url),
                re = new RegExp("^(x|X)[0-9]+$");
                for(var key in urlParams) {
                    if(re.test(key)){
                        var value = urlParams["q"+key.substr(1)].split('|');

                        // when picking values from URL remove the + from it
                        value = _.map(value, function(fac){
                            return decodeURIComponent(fac).replace(/\+/gi," ");
                        });

                        addFacetItemSelection(urlParams[key], value);
                        searchResultsModel.deeplinked = true;
                    }
                }

                // Events-landing template filters
                if(urlParams.upcomingEvents){
                    searchResultsModel.activeUpcoming = getUpcomingLink();
                }else if(urlParams.thisMonth){
                    searchResultsModel.activeUpcoming = getMonthLink();
                }
            }

            function addFacetItemSelection(key, value) {

                if(_.isArray(value)) {
                    searchResultsModel.facetSelected[key] = value;
                    return;
                }

                if(! _.isArray(searchResultsModel.facetSelected[key])) {
                    searchResultsModel.facetSelected[key] = [];
                }

                if(value === "All") {
                    searchResultsModel.facetDeselected[key] = _.without(searchResultsModel.facetSelected[key], value);
                    searchResultsModel.facetSelected[key] = new Array(value);

                    if(searchResultsModel.facetSelected[getChildFacetKey(key)]) {
                        searchResultsModel.facetSelected[getChildFacetKey(key)] = new Array(value);
                    }

                } else if(_.indexOf(searchResultsModel.facetSelected[key],value) < 0) {
                    searchResultsModel.facetSelected[key].push(value);
                }

                // remove all from the list if another item is selected
                if(searchResultsModel.facetSelected[key].length > 1) {
                    searchResultsModel.facetSelected[key] = _.without(searchResultsModel.facetSelected[key],"All");
                }
            }

            function removeFacetItemSelection(key, value) {
                searchResultsModel.facetSelected[key] = _.without(searchResultsModel.facetSelected[key], value);
                searchResultsModel.facetDeselected[key] = new Array(value);

                // add all into the list if everthing is removed
                if(searchResultsModel.facetSelected[key].length  < 1) {
                    searchResultsModel.facetSelected[key].push("All");
                }
            }

            function toggleFacetItemSelection(key, value, data){
                // if the new facet selected is not added before then add it else ignore since we only need one instance
                if(_.indexOf(searchResultsModel.facetSelected[key],value) < 0) {
                    addFacetItemSelection(key, value);

                    // if at any point new facet is getting added and it is achild, make sure to remove other facets.
                    resetFacetsIfChildSelected(key, data);
                } else {
                    removeFacetItemSelection(key, value);
                    // if a parent is unselected all its child should get unselected
                    resetFacetsIfParentUnselected(key, data);
                }

            }

            function reConstructURL(link, selected, currentFacet, type, facetKey, parentFacet, children){
                var sort = function(num){ return num; }, parentChildFacetKey,facetKeyExt,parentChildKey, flattenFacet;
                // convert URL to JSON
                var urlParams = getUrlVars(link);

                // loop through each selected facted update the URL params.
                for(var selectedFacet in selected) {
                    if(selected.hasOwnProperty(selectedFacet)) {
                        var key = [],paramCount = 0, facetValues = [], deselected ='',re = new RegExp("^(x|X)[0-9]+$");

                        for(var paramKey in urlParams) {
                            if(urlParams.hasOwnProperty(paramKey)) {
                                // keep the count. if the param is starting with x and increment count
                                if(re.test(paramKey)) {
                                    paramCount++;
                                }

                                // if param matched one from selected, add it to keys
                                // for example : x12 : KPMG_Filter_Year and selected["KPMG_Filter_Year"] = [2012]
                                if(urlParams[paramKey] === selectedFacet) {
                                    key.push(Number(paramKey.substr(1))); // return the number; x12 becomes 12; this is used to find q12 which has the existing param values.
                                }
                            }
                        }

                        // if length is zero means the key does not exist the param and need to be added.
                        // this happens when previously this filter was never used.
                        if(key.length === 0) {
                            key.push(++paramCount);
                            urlParams['q'+paramCount] = "All";
                            urlParams['x'+paramCount] = selectedFacet;
                        }

                        // sort the keys for each manipulation
                        key = _.sortBy(key, sort);

                        // fetch values by suffixing 'q';
                        // if this call is coming when deselecting a filter. we have to make sure the url should ignore the deselected value as well.
                        $.each(key,function(index, value){
                            try{
                                facetValues.push(urlParams['q'+value].replace(/\+/gi,' ').replace(/\%20/gi,' ').split('|'));
                            }catch(err){
                                facetValues.push(currentFacet["facet-name"]);
                            }
                        });

                        var filterOwnChild= function(selectedFacets) {
                            var filteredSelection = [], parent, child, i;
                            for(i = 0; i < searchResultsModel.facets.length;i++) {
                                if(searchResultsModel.facets[i]["facet-title"] === currentFacet["facet-title"]) {
                                    parent = _.where(searchResultsModel.facets[i]['facet-values']["facet-item"],{"facet-name":currentFacet["facet-parent"]})[0];

                                    if(parent && parent["facet-has-children"] === "1") {
                                        child = _.where(parent["facet-children"]["facet-child"],{"facet-selected":true});
                                        _.map(child, function(childSelection){
                                            filteredSelection.push(childSelection["facet-name"]);
                                        });
                                    }
                                }
                            }

                            filteredSelection.push(currentFacet["facet-name"]);
                            if(facetKey === selectedFacet) {
                                selectedFacets = filteredSelection;
                            }


                            return selectedFacets;
                        };

                        // combine the existing values and all new selection and create one.
                        flattenFacet = _.union(selected[selectedFacet]);

                        // this creates an undolink, ignore of all is not required because if case of ALL, that would the only filter present.
                        if(currentFacet["facet-name"] && currentFacet["facet-name"] !== "All") {
                            // make sure to remove the deselected item from the undolink url of others
                            if(searchResultsModel.facetDeselected[selectedFacet]) {
                                deselected = searchResultsModel.facetDeselected[selectedFacet];
                            }

                            if(type === "UNDOLINK") {
                                if(currentFacet["facet-name"] === "All") {
                                    currentFacet["facet-name"] = '';
                                }

                                // remove the deselected facet and the current facet from the undo link.
                                flattenFacet = _.without(flattenFacet, deselected[0]);
                                flattenFacet = _.without(flattenFacet, currentFacet["facet-name"]);

                            }

                            // this means its creating a link for child. remove the other selected items from the list.
                            if(parentFacet && children && type === "LINK" ) {

                                // chid facets shold only include belonging to its parent
                                flattenFacet =  filterOwnChild(flattenFacet);
                                flattenFacet = _.union(flattenFacet, _.flatten(facetValues));


                                // get all the selected top level facets to know how to create link fir child.
                                var siblingSelections = _.where(parentFacet["facet-values"]["facet-item"],{"facet-selected":true});
                                $.each(siblingSelections, function(index, exceptionFacet){
                                    // all child link should not have any other facet except all or its parent
                                    if(exceptionFacet["facet-name"] !== "All" && exceptionFacet["facet-name"] !== currentFacet["facet-parent"]) {
                                        flattenFacet = _.without(flattenFacet, exceptionFacet["facet-name"]);
                                    }
                                });
                            }


                            // Parent facets should not have facets and its child if a child is selected
                            if(!children && type === "LINK" ) {
                                var parentfacets = _.where(searchResultsModel.facets,{"facet-title":currentFacet["facet-title"]})[0],siblingSelections_;
                                if(parentfacets) {
                                    siblingSelections_ = _.where(parentfacets["facet-values"]["facet-item"],{"facet-children-selected":true});
                                    $.each(siblingSelections_, function(index, exceptionFacet){
                                        if(exceptionFacet["facet-name"] !== "All" && exceptionFacet["facet-name"] !== currentFacet["facet-parent"]) {
                                            flattenFacet = _.without(flattenFacet, exceptionFacet["facet-name"]);
                                            if(getChildFacetKey(exceptionFacet["facet-key"]) === selectedFacet)      {
                                                flattenFacet = ["All"];
                                            }
                                        }
                                    });

                                }
                            }


                            if(type === "LINK" && facetKey === selectedFacet) {
                                flattenFacet = _.union(flattenFacet, [currentFacet["facet-name"]]);
                                // any sibling child selected, then dont add it to link, because it will be deselected on this facet selection

                            }
                        }

                        // create parent/Child key based on the facetKey
                        parentChildFacetKey = _.last(facetKey.split('_'));
                        parentChildFacetKey =  facetKey.replace(parentChildFacetKey, (parentChildFacetKey === parentSuffix(facetKey)) ? childSuffix(facetKey) : parentSuffix(facetKey));

                        // remove all if user has selected more than 2 filters.
                        if(flattenFacet.length > 1) {
                            flattenFacet = _.without(flattenFacet,"All");
                        } else if (flattenFacet.length === 0) {
                            flattenFacet = ["All"];
                        }

                        if(currentFacet["facet-name"] && currentFacet["facet-name"] === "All" && type === "LINK" ) {
                            if((getParentFacetKey(facetKey) === selectedFacet) || getChildFacetKey(facetKey) === selectedFacet) {
                                flattenFacet = ["All"];
                            }
                        }

                        // undo link should not have child facets as well
                        if(type === "UNDOLINK" && selectedFacet === getChildFacetKey(facetKey) && isParent(facetKey)) {
                            if(children){
                                flattenFacet = ["All"];
                            }
                        }

                        // removed duplicated values in the query param.
                        flattenFacet = _.uniq(flattenFacet.map(function(value){
                            //replace all space with +;
                            return encodeURIComponent(value).replace(/ /g,'+').replace(/\%2B/g,'+').replace(/\%20/g,'+').replace(/\%2F/g,'~2F');
                        }));

                        // update the query value with the newly generated pipe seperated filters
                        urlParams['q'+key[0]] = _.sortBy(flattenFacet, sort).join('|');

                        // remove all other filters.
                        urlParams = _.omit(urlParams,
                            _.rest(key).map(function(value){return "q"+value;}).join(','),
                            _.rest(key).map(function(value){return "x"+value;}).join(',')
                        );

                    }
                }



                // reconstructURL based on the updated object.
                return("?"+Object.keys(urlParams).map(function(key){
                    return (key) + '=' + urlParams[key];
                }).join('&'));
            }

            function updateFilterUrl(facets, selected, children, parentFacets){
                var link,facet;
                var facetkey,parentKey;

                // if its coming from child then get child items and rename the key with a _ch
                if(children){
                    facet = facets['facet-children']["facet-child"];
                    parentKey = parentFacets["facet-key"];
                    facetkey = parentKey + childSuffix(parentKey);
                } else {
                    facet = facets['facet-values']["facet-item"];
                    facetkey = (facets["facet-has-children"]) ? facets["facet-key"] + parentSuffix(facets["facet-key"]) : facets["facet-key"];
                }

                for(var j=0; j < facet.length; j++){
                    var facetItem = facet[j];

                    // if the facet is already selected, then look for undolink, else we have to use link
                    link = (facetItem.undolink) ? facetItem.undolink : facetItem.link;

                    if(_.indexOf(selected[facetkey],facet[j]["facet-name"]) >= 0) {
                        facetItem.undolink = reConstructURL(link, selected, facetItem,"UNDOLINK",facetkey,facets,children);

                        if(facetItem["facet-name"] === 'All' && selected[facetkey].length > 1) {
                            facetItem.link = reConstructURL(link, selected, facetItem,"LINK",facetkey,facets,children);
                        }

                        // PARENT AUTO SELECTION
                        // when child is selected, automatically parent gets selected
                        if(children && facetItem["facet-parent"]) {
                            var parentLink = (facets["facet-selected"]) ? facets.undolink : facets.link;
                            facets.undolink = reConstructURL(parentLink, selected, facets,"UNDOLINK",parentKey + parentSuffix(parentKey),facets,children);
                        }

                         // RECURSIVE INTO CHILD
                        if(facetItem["facet-has-children"]) {
                            facetItem = updateFilterUrl(facetItem,selected,true, facets);
                        }
                    } else {
                        facetItem.link = reConstructURL(link, selected, facetItem,"LINK",facetkey,parentFacets,children);
                        // RECURSIVE INTO CHILD
                        if(facetItem["facet-has-children"]) {
                            facetItem = updateFilterUrl(facetItem,selected,true, facets);
                        }
                    }
                    if(facet.length === 2 && !facetItem["facet-parent"]){
                        if(facetItem["facet-name"] === 'All'){
                            facetItem['facet-hide'] = "hide";
                        }
                        else{
                            facetItem.disabled = "disabled";
                            facetItem['facet-selected'] = true;
                        }
                    }
                }
                if(facet.length === 1){
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
            function updateFilter(facets, selected, children, parentFacets){

                var link,facet;
                var facetkey,parentKey;

                // if its coming from child then get child items and rename the key with a _ch
                if(children){
                    facet = facets['facet-children']["facet-child"];
                    parentKey = parentFacets["facet-key"];
                    facetkey = parentKey + childSuffix(parentKey);
                } else {
                    facet = facets['facet-values']["facet-item"];
                    facetkey = (facets["facet-has-children"]) ? facets["facet-key"] + parentSuffix(facets["facet-key"]) : facets["facet-key"];
                }

                for(var j=0; j < facet.length; j++){
                    var facetItem = facet[j];
                    facetItem["facet-name"] = convertHexNCR2Char(facetItem["facet-name"]);

                    // if the facet is already selected, then look for undolink, else we have to use link
                    link = (facetItem["facet-selected"]) ? facetItem.undolink : facetItem.link;

                    // make the facet item selected based on selection. else remove it.
                    if(_.indexOf(selected[facetkey],facetItem["facet-name"]) >= 0) {
                        // FACET SELECTION
                        // set the facet selected to true for all the selection matched facet items.
                        facetItem["facet-selected"] = true;
                        facetItem["facet-parent"] = facets['facet-name'];
                        facetItem["facet-title"] = facets['facet-title'];
                        facetItem["facet-key"] = facetkey;
                        // facetItem.undolink = reConstructURL(link, selected, facetItem,"UNDOLINK",facetkey,parentKey);


                        // ALL FACET UNSELECTION IF OTHER FACET SELECTED
                        if(facetItem["facet-name"] === 'All' && selected[facetkey].length > 1) {
                            delete facetItem["facet-selected"];
                            // facetItem.link = reConstructURL(link, selected, facetItem,"LINK",facetkey,parentKey);
                        }

                        // RECURSIVE INTO CHILD
                        if(facetItem["facet-has-children"]) {
                            facetItem = updateFilter(facetItem,selected,true, facets);
                        }

                    } else {

                        delete facetItem["facet-selected"];
                        facetItem["facet-parent"] = facets['facet-name'];
                        facetItem["facet-title"] = facets['facet-title'];
                        facetItem["facet-key"] = facetkey;

                        // facetItem.link = reConstructURL(link, selected, facetItem,"LINK", facetkey,parentKey);

                        // RECURSIVE INTO CHILD
                        if(facetItem["facet-has-children"]) {
                            facetItem = updateFilter(facetItem,selected,true, facets);
                        }
                    }
                }

                if(children) {
                    if(_.where(facet,{"facet-selected": true}).length) {
                        facets["facet-children-selected"] = true;
                    } else {
                        delete facets["facet-children-selected"];
                    }
                }

                return facets;
            }

            function mergeDeep(target, source, currentSelection){
                var linkName, datalink;
                if (typeof target === 'object' && typeof source === 'object') {
                    var targetFacetItem = target['facet-values']['facet-item'];
                    var sourceFacetItem = source['facet-values']['facet-item'];

                    // if the filter is not the current selected then update with latest from snp.
                    if(currentSelection !== '' && currentSelection.indexOf(source["facet-key"]) < 0 ) {
                        target = source;
                    }

                    // loop through each new section and find the same in the target, if found replace it with updated one.
                    for(var j = 0;  j < targetFacetItem.length; j++) {

                        targetFacetItem[j]['facet-name'] = convertHexNCR2Char(targetFacetItem[j]['facet-name']);
                        var index = sourceFacetItem
                            .map( function (e) {
                                return convertHexNCR2Char(e['facet-name']);
                            })
                            .indexOf(targetFacetItem[j]['facet-name']);

                        if(index > -1) {
                            targetFacetItem[j] = $.extend(false,targetFacetItem[j],sourceFacetItem[index]);

                            // if its first time then create the selection object based on facet selected
                            if(targetFacetItem[j]["facet-selected"] && searchResultsModel.initialSearch) {
                                var facetKey = (target["facet-has-children"]) ? target["facet-key"] + parentSuffix(target["facet-key"]) : target["facet-key"];
                                addFacetItemSelection(facetKey,targetFacetItem[j]['facet-name']);
                            }
                        }
                    }

                }
                return target;
            }

            function getFacetFilter(previousSelection, currentSelection){
                var i,j;

                // if there is previous selection, then return the new selection
                // this is useful when the page is loaded for first time.
                // if user clicks on clear all, reset the facets to default (which can be currently the currentselection)
                if(Object.keys(previousSelection).length <= 0 || searchResultsModel.reset) {
                    searchResultsModel.initialSearch = true;
                    searchResultsModel.reset = false;
                    // if this request initiated from URL then dont clean the selection because its created from the URL. we need it to create the
                    // facet selection
                    if(!searchResultsModel.deeplinked) {
                        searchResultsModel.facetSelected = {};
                        searchResultsModel.deeplinked = false;
                    }
                    searchResultsModel.facetDeselected = {};
                    previousSelection = currentSelection;
                } else {
                    searchResultsModel.initialSearch = false;
                }

                for(i=0;i<previousSelection.length;i++){
                    if(currentSelection[i]) {

                        currentSelection[i]["facet-key"] = queryKey[currentSelection[i]["facet-title"]].key;
                        currentSelection[i]["facet-has-children"] = queryKey[currentSelection[i]["facet-title"]]["has-child"];
                        previousSelection[i] = mergeDeep(previousSelection[i],currentSelection[i], searchResultsModel.currentSelection);
                    }
                }

                // update facet selection based on many logics
                for(i=0;i<previousSelection.length;i++){
                    previousSelection[i] = updateFilter(previousSelection[i], searchResultsModel.facetSelected);
                }

                // now that the facet selection is decided, construct the URL.
                for(i=0;i<previousSelection.length;i++){
                    previousSelection[i] = updateFilterUrl(previousSelection[i], searchResultsModel.facetSelected);
                }


                // once the URLs are been completely reconstructed, reset the facetDeselected object for future.
                searchResultsModel.facetDeselected = {};

                return previousSelection;
            }

            function getUpcomingLink() {
                var today = new Date();
                var formattedDate = searchResultsModel.CQModel.upcomingEventsParam.replace('DATE', today.getDate()).replace('MONTH', today.getMonth() + 1).replace('YEAR', today.getFullYear());
                return "&" + formattedDate;
            }
            function getMonthLink() {
                return "&" + searchResultsModel.CQModel.thisMonthParam;
            }

            function getEventDropdown(){
                return [
                    {"display-name":searchResultsModel.CQModel.i18nModel.sortingDate, link:""},
                    {"display-name":searchResultsModel.CQModel.i18nModel.eventsThisMonth, link: getMonthLink()},
                    {"display-name":searchResultsModel.CQModel.i18nModel.upcomingEvent, link:getUpcomingLink()}
                ];
            }

            function handleServiceRequestOnload(data, paramUrl, operation) {
                if (kpmgAssetDomain) {
                    data = $.extend(true, data, {
                        "assetDomainName": kpmgAssetDomain
                    });
                }
                var resultCollection = getJSON(data, "resultset")[0],
                featuredResultCollection = getJSON(data, "featured_products")[0];
                featuredResultCollection = Helpers.filterJSON(data, "featured_products")[0];
                if (featuredResultCollection.result[0]) {
                    $.each(featuredResultCollection.result, function(index, val) {
                        val.favourite = true;
                    });
                }
                searchResultsModel.results = $.merge(featuredResultCollection.result, getJSON(resultCollection, "result")[0]);
                //KPMG_Article_Date

                searchResultsModel.totalResults = Helpers.filterJSON(data, "searchheader")[0];
                searchResultsModel.SelectBoxOptions = Helpers.filterJSON(data, "sort-option")[0];
                if(searchResultsModel.CQModel.thisMonthParam){
                    searchResultsModel.eventDropdownOptions = getEventDropdown();
                }
                searchResultsModel.pagination = Helpers.filterJSON(data, "pagination")[0];
                searchResultsModel.suggestions = Helpers.filterJSON(data, "suggestions")[0];
                searchResultsModel.pagination = getJSON(data, "pagination")[0];
                searchResultsModel.breadcrumbs = getJSON(data, "breadcrumb-item")[0];

                /** ----------- Populate latest dropdown - START ------------ **/
                if(cacheObject.latestDropdown.length > 0 &&
                    (pageMetaObject.KPMG_Template_Type === "pressreleases-template" || pageMetaObject.KPMG_Template_Type === "insightslanding-template")) {
                    cacheObject.latestDropdown.find('.facet-list').empty();
                    cacheObject.latestDropdown.removeClass('no-results').find('.facet-list').append(latestTmp.latestTemplate(searchResultsModel));
                }else if(cacheObject.upcomingDropdown.length > 0 && pageMetaObject.KPMG_Template_Type === "eventslanding-template"){
                    cacheObject.upcomingDropdown.find('.facet-list').empty();
                    cacheObject.upcomingDropdown.removeClass('no-results').find('.facet-list').append(latestTmp.latestEventsTemplate(searchResultsModel));

                    //Hide upcoming filters if Year Facet < current year
                    var today = new Date();
                    if(searchResultsModel.facetSelected.KPMG_Filter_Year && !isNaN(searchResultsModel.facetSelected.KPMG_Filter_Year[0]) && Number(searchResultsModel.facetSelected.KPMG_Filter_Year[0]) < today.getFullYear()){
                        $('.upcoming-dropdown .LT5Facets').not(':first-child').hide();
                    }else{
                        $('.upcoming-dropdown .LT5Facets').show();
                    }
                }
                /** ----------- Populate latest dropdown - END ------------ **/

                generateGridHeader();
                if (searchResultsModel.results[0]) {
                    $(".noDataFound").hide();
                    generateResultList();
                    cacheObject.resultsContainer.show();
                    cacheObject.facetsContainer.show();
                    cacheObject.resultsPanel.addClass('results-active');
                } else {
                    $(".noDataFound").show();
                    cacheObject.resultsContainer.hide();
                    cacheObject.facetsContainer.hide();
                    cacheObject.resultsPanel.removeClass('results-active');
                    if(searchResultsModel.activeUpcoming){
                        $(".upcomingResults .upcoming-error").addClass('visually-hidden');
                        if(searchResultsModel.activeUpcoming.indexOf('thisMonth') > -1){
                            $(".noDataFound .this-month").removeClass('visually-hidden');
                        }else if(searchResultsModel.activeUpcoming.indexOf('upcomingEvents') > -1){
                            $(".noDataFound .upcoming-events").removeClass('visually-hidden');
                        }
                        cacheObject.sortResultsContainer.find('.noDataFound').hide();
                    }
                }
                if (operation === 'mobSearch' || operation === 'sort') {
                    if (personalizationUtils.commonUtils.isMobile()) {
                        cacheObject.facetsContainer.hide();
                        cacheObject.sortResultsContainer.show();
                    }
                }
                paramUrl.url=(paramUrl.url===searchResultsModel.CQModel.globalSearchUrl.split('/search')[1])?"":'?'+encodeURIComponent(paramUrl.url.split('?')[1]);
                router.navigate(paramUrl.url);
            }

            function removeParameter(url, parameter) {
                var urlparts = url;
                var prefix = encodeURIComponent(parameter) + '=';
                var pars = urlparts.split(/[&;]/g);
                for (var i = pars.length; i-- > 0;) {
                    if (pars[i].lastIndexOf(prefix, 0) !== -1)
                    {
                        pars.splice(i, 1);
                    }
                }
                url = pars.join('&');
                return url;
            }

            function reverseArr(input) {
                var ret = [];
                for (var i = input.length - 1; i >= 0; i--) {
                    ret.push(input[i]);
                }
                return ret;
            }

            function generateGridHeader() {
                cacheObject.sortResultsContainer.empty();
                cacheObject.sortResultsContainer.append(gridHeader.searchHeaderTemplate(searchResultsModel));
                var searchParams;
                cacheObject.latestDropdown.on('click','.facetsOptions li', sortOptions);
                cacheObject.upcomingDropdown.on('click','.facetsOptions li', upcomingOptions);

                function sortOptions(e) {
                    resultList.currentPage = 1;
                    e.stopImmediatePropagation();
                    cacheObject.loaderOverlay.show();
                    searchParams = $(e.currentTarget).data("link");
                    ajaxService.params.baseUrl = cacheObject.i18nModel.baseUrl;
                    fetchSnPResults( searchParams , "sort");
                    $('.facetFilters').removeClass('active');

                }

                function upcomingOptions(e) {
                    var rootQuery = (searchResultsModel.currentQuery) ? searchResultsModel.currentQuery : searchResultsModel.CQModel.globalSearchUrl.split('/search/')[1];
                    resultList.currentPage = 1;
                    e.stopImmediatePropagation();
                    cacheObject.loaderOverlay.show();
                    searchResultsModel.activeUpcoming = $(e.currentTarget).data('link');
                    searchParams = rootQuery + $(e.currentTarget).data("link");
                    ajaxService.params.baseUrl = cacheObject.i18nModel.baseUrl;
                    fetchSnPResults( searchParams, "sort");
                    $('.facetFilters').removeClass('active');
                }
            }

            function generateFacets(data, paramUrl, operation) {
                var clearAllUrl = cacheObject.i18nModel.searchNPromoteUrl.split("/"),
                    clearAllUrlStripped = clearAllUrl[2];

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

                if (searchResultsModel.facets) {
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
                        KPMG_FILTER_YEAR: cacheObject.i18nModel.KPMG_FILTER_YEAR,
                        ALL_TEXT: cacheObject.i18nModel.ALL_TEXT
                    };
                    $.each(searchResultsModel.facets, function(index, val) {
                        var facetWrapper = '.' + val["facet-title"];
                        val["facet-values"] = $.extend(true, val["facet-values"], i18nLabels);
                        val["parent-suffix"] = parentSuffix(val["facet-key"]);
                        val["child-suffix"] = childSuffix(val["facet-key"]);
                        if (val["category-hide"] === "hide") {
                            $(facetWrapper, cacheObject.facetsPanel).addClass('no-results');
                        }
                        if (val["category-hide"] !== "hide" && $(facetWrapper, cacheObject.facetsPanel).length) {
                            $(facetWrapper, cacheObject.facetsPanel).find('.facet-list').empty();
                            $(facetWrapper, cacheObject.facetsPanel).removeClass('no-results').find('.facet-list').append(facets.facetsTemplate(val));
                        }
                    });
                    autoScroll('.facetsContainer', '.facetName');

                    //Disable facets on events template if no results are returned
                    if(pageMetaObject.KPMG_Template_Type === "eventslanding-template" && !searchResultsModel.results.length){
                        $('.facetFilters:not(.upcoming-dropdown)').addClass('no-results');
                    }

                    $(document).on('keyup', function(e) {
                        var activeFacetFiltersDom = $('.facetFilters.active');
                        if (e.which === 27 && activeFacetFiltersDom.length) {
                            activeFacetFiltersDom.removeClass('active').addClass('focusOutline');
                            activeFacetFiltersDom.find('.facet-head').trigger('focus').attr('aria-expanded', 'false');
                        }
                    });
                }

                $(".nestedFacetsToogleBtn").on('click', nestedFacetsToggleView);
                $(".nestedFacetsToogleBtn").on('focusout', function(evt) {
                    var thisSelector = $(evt.target);
                    thisSelector.removeClass("no-box-shadow");
                });
                $(".LT5Facets").on('keydown', '.nestedFacetsToogleBtn', function(e) {
                    if (e.which === 13) {
                        $(this).trigger("click");
                    }
                });
                $(".LT5Facets").on('contextmenu', function() {
                    return false;
                });
                $(".facet-head", cacheObject.facetsPanel).off("click").on("click", handleFacetDropdown);
                globalLoadingElements(operation);

                function nestedFacetsToggleView(evt) {
                    var thisSelector = $(evt.target);
                    thisSelector.closest('li.has-nested').children(".nestedFacets").slideToggle();
                    if (thisSelector.hasClass(stringConstants.downArrow)) {
                        thisSelector.removeClass(stringConstants.downArrow).addClass(stringConstants.chevronUp).attr('aria-expanded', 'true');
                    } else {
                        thisSelector.addClass(stringConstants.downArrow).removeClass(stringConstants.chevronUp).attr('aria-expanded', 'false');
                    }
                    if (evt.stopPropagation()) {
                        evt.stopPropagation();
                    }
                    return false;
                }

                function handleFacetDropdown(e) {
                    var $this = $(e.currentTarget),
                        $facetList = $('.facet-list');

                    if ($this.closest(".facetFilters").hasClass("no-results")) {
                        return false;
                    }

                    if ($this.closest('.facetFilters').hasClass('active')) {
                        $this.closest('.facetFilters').removeClass('active');
                        $this.attr('aria-expanded', 'false');
                    } else {
                        $('.facetFilters').removeClass('active');
                        $this.closest('.facetFilters').addClass('active');
                        $this.attr('aria-expanded', 'true');
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
                    });

                    var gridColumn = $(elem).parent().hasClass('col-md-9') ? 'col-md-6' : 'col-md-4';
                    if (gridColumn === 'col-md-6') {
                        $('.facets-container', elem).addClass('col-md-4').removeClass('col-md-3');
                        $('.resultsListingcontainer', elem).addClass('col-md-8').removeClass('col-md-9');
                    }
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
                            $(this).find("span").trigger("click");
                        }
                    });
                    $(elem).on("keyup", ".facetBox", function() {
                        $(this).attr("tabindex", "-1").trigger('focus').parent().addClass("focusOutline");
                    });
                    $(elem).on("blur", ".facetBox", function() {
                        $(this).removeAttr("tabindex").parent().removeClass("focusOutline");
                    });
                    $(elem).on("keyup", ".custom-list", function(e) {
                        $(this).addClass("focusOutline");
                        if (e.which === 13) {
                            $(this).trigger("click");
                        }
                    });
                    $(elem).on("blur", ".custom-list", function() {
                        $(this).removeClass("focusOutline");
                    });
                    $("a, input[type=submit], input[type=text], input[type=radio], p", elem).on("keyup", function(e) {
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
                    $("a, input[type=submit], input[type=text], input[type=radio], p", elem).on("blur", function() {
                        var _thisParent = $(this).parents(".quickView>div");
                        if (_thisParent.length !== 0) {
                            $(this).removeAttr("tabindex", "-1");
                            _thisParent.removeClass("focusOutline");
                        } else {
                            $(this).removeAttr("tabindex").removeClass("focusOutline");
                        }
                    });

                    $('.module-resultlistingb  .result').on('keyup', function (e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).trigger('focus').addClass("outline");
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });
                    $('.module-resultlistingb  .result').on('keydown', function(e) {
                        if( e.which === 9 ) {
                            $(this).removeClass("outline");
                        }
                        if (e.which === 13) {
                            $(this).trigger("click");
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });
    
                    $('.module-resultlistingb  .contact-btn').on('keyup', function (e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).trigger('focus').addClass('focusOutline');
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });
                    $('.module-resultlistingb .contact-btn').on('keydown', function(e) {
                        if( e.which === 9 ) {
                            $(this).removeClass('focusOutline');
                        }
                        if (e.which === 13) {
                            $(this).find('.modal-open').trigger("click");
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });

                    $('.module-resultlistingb .modal-open, elem').on('keydown', function(e) {
                        if (e.which === 13) {
                            $(this).trigger("click");
                        }
                    });
                    $('.module-resultlistingb .modal-open, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });
                    $('.module-resultlistingb .modal-open, elem').on('blur', function(e) {
                        $(this).removeClass('focusOutline');
                    });
                    $('.module-resultlistingb .quickview-btn, elem').on('keydown', function(e) {
                        if (e.which === 13) {
                            $(this).find('.component-link').trigger("click");
                        }
                    });
                    $('.module-resultlistingb .quickview-btn, elem').on('focus', function(e) {
                        $(this).addClass('focusOutline');
                    });

                    $('.module-resultlistingb .quickview-btn, elem').on('blur', function(e) {
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
                    ajaxService.params.baseUrl = cacheObject.i18nModel.baseUrl;
                    currentResultLength = $(".resultSet.results-active a").length;
                    ajaxService.searchFetch(handleServiceRequestLoadMore, cacheObject.loadMoreBtn.attr('href'));
                }

                function handleServiceRequestLoadMore(data) {
                    if (kpmgAssetDomain) {
                        data = $.extend(true, data, {
                            "assetDomainName": kpmgAssetDomain
                        });
                    }
                    cacheObject.loaderOverlay.hide();
                    cacheObject.loaderImg.hide();
                    var featuredResults = getJSON(data, "featured_products")[0],
                        results = getJSON(data, "resultset")[0].results;
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
                    // focus on the first new article added
                    $($(".resultSet.results-active a .result")[currentResultLength + 1]).trigger('focus').addClass("outline");

                }
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
                $(elem).on("keyup", ".facetBox", function() {
                    $(this).attr("tabindex", "-1").trigger('focus').parent().addClass("focusOutline");
                });
                $(elem).on("blur", ".facetBox", function() {
                    $(this).removeAttr("tabindex").parent().removeClass("focusOutline");
                });
                $(elem).on("keyup", ".custom-list", function(e) {
                    $(this).addClass("focusOutline");
                    if (e.which === 13) {
                        $(this).trigger("click");
                    }
                });
                $(elem).on("blur", ".custom-list", function() {
                    $(this).removeClass("focusOutline");
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
                $("a, input[type=submit], input[type=text], input[type=radio]", elem).on("blur", function(e) {
                    var _thisParent = $(this).parents(".quickView>div");
                    if (_thisParent.length !== 0) {
                        $(this).removeAttr("tabindex", "-1");
                        _thisParent.removeClass("focusOutline");
                    } else {
                        $(this).removeAttr("tabindex").removeClass("focusOutline");
                    }
                });

                $('.module-resultlistingb  .result').on('keyup', function (e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).trigger('focus').addClass('outline');
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
                $('.module-resultlistingb .result').on('keydown', function(e) {
                    if( e.which === 9 ) {
                        $(this).removeClass('outline');
                    }
                    if (e.which === 13) {
                        $(this).trigger("click");
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });

                $('.module-resultlistingb  .contact-btn').on('keyup', function (e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).trigger('focus').addClass('focusOutline');
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
                $('.module-resultlistingb .contact-btn').on('keydown', function(e) {
                    if( e.which === 9 ) {
                        $(this).removeClass('focusOutline');
                    }
                    if (e.which === 13) {
                        $(this).find('.modal-open').trigger("click");
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });

                $('.module-resultlistingb .modal-open, elem').on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).trigger("click");
                    }
                });
                
                $('.module-resultlistingb .modal-open, elem').on('focus', function(e) {
                    $(this).addClass('focusOutline');
                });
                $('.module-resultlistingb .modal-open, elem').on('blur', function(e) {
                    $(this).removeClass('focusOutline');
                });
                $('.module-resultlistingb .quickview-btn, elem').on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).find('.component-link').trigger("click");
                    }
                });
                $('.module-resultlistingb .quickview-btn, elem').on('focus', function(e) {
                    $(this).addClass('focusOutline');
                });
                $('.module-resultlistingb .quickview-btn, elem').on('blur', function(e) {
                    $(this).removeClass('focusOutline');
                });
            }

            function globalLoadingElements(operation) {
                cacheObject.loaderOverlay.hide();
                cacheObject.loaderImg.hide();
                if ($(document).width() <= 640) {
                    if (typeof operation === "undefined") {
                        //cacheObject.resultsViewContainer.hide();
                        cacheObject.facetsContainer.hide();
                        cacheObject.tabsResultsContainer.show();
                    }
                    $(".facetsCheckbox input").on('click', function(evt) {
                        mobileLatestFacetSelected = $(this);
                        var searchQuery = $(evt.currentTarget).attr("data-link");
                        searchResultsModel.currentQuery = searchQuery;
                        resultList.currentPage = 1;
                        evt.stopImmediatePropagation();
                        evt.preventDefault();
                        cacheObject.loaderOverlay.show();
                        if($(evt.currentTarget).data('key')){
                            toggleFacetItemSelection($(evt.currentTarget).data('key'), $(evt.currentTarget).data('name') + "", $(evt.currentTarget).data());
                            searchResultsModel.currentSelection = $(evt.currentTarget).data('key');
                        }
                        if(searchResultsModel.activeUpcoming){
                            searchQuery += searchResultsModel.activeUpcoming;
                        }
                        cacheObject.loaderImg.show();
                        ajaxService.params.baseUrl = cacheObject.i18nModel.baseUrl;
                        fetchSnPResults(searchQuery, "mobSearch");
                        $('.facetFilters').removeClass('active');
                    });
                    $(".cancelFilter").on('click', function(evt) {
                        cacheObject.facetsContainer.hide();
                        cacheObject.sortResultsContainer.show();
                    });
                    $(".component-head").addClass("mblAccordion");
                    $(".mblAccordion").on('click', mobileAccordionView);
                    cacheObject.sortResultsContainer.off().on('click', ".facets-refine-btn", mobileRefineView);
                } else {
                    $(".facetsCheckbox input").on('click', resetSearchResults);
                    $(".hasResults").on("click",function(evt){
                        resetSearchResults(evt, true);
                    });
                }
                if ($('.social-tabs-nav')) {
                    var guideHeight = $('.social-tabs-nav .social-tabs-tab input[type=radio]:checked ~ .social-tabs-content').height();
                    $(".social-tabs-nav", elem).attr('style', 'min-height :' + parseInt(guideHeight + 94) + "px !important");
                }
            }

            function resetSearchResults(evt,reset) {
                resultList.currentPage = 1;
                evt.stopImmediatePropagation();
                evt.preventDefault();
                var searchQuery = $(evt.currentTarget).attr("data-link");
                searchResultsModel.currentQuery = searchQuery;
                if($(evt.currentTarget).data('key')){
                    toggleFacetItemSelection($(evt.currentTarget).data('key'), $(evt.currentTarget).data('name') + "", $(evt.currentTarget).data());
                    searchResultsModel.currentSelection = $(evt.currentTarget).data('key');
                }
                if(reset) {
                    searchResultsModel.reset = true;
                }
                if(searchResultsModel.activeUpcoming){
                    searchQuery += searchResultsModel.activeUpcoming;
                }
                cacheObject.loaderOverlay.show();
                cacheObject.loaderImg.show();
                ajaxService.params.baseUrl = cacheObject.i18nModel.baseUrl;
                fetchSnPResults(searchQuery);
                $('.facetFilters').removeClass('active');
            }

            function mobileAccordionView(evt) {
                var thisSelector = $(evt.target);
                thisSelector.parent().children(".facetsContainer").slideToggle();
                thisSelector.parent().children(".moreFacets").slideToggle();
                if (thisSelector.children().hasClass(stringConstants.chevronUp)) {
                    thisSelector.find("." + stringConstants.chevronUp).removeClass(stringConstants.chevronUp).addClass(stringConstants.downArrow).attr('aria-expanded', 'false');
                } else {
                    thisSelector.find("." + stringConstants.downArrow).removeClass(stringConstants.downArrow).addClass(stringConstants.chevronUp).attr('aria-expanded', 'true');
                }
            }

            function mobileRefineView() {
                cacheObject.facetsContainer.show();
                cacheObject.sortResultsContainer.hide();
            }
            $('.loadMore').removeClass('visually-hidden');
            // Keep the following lines at the bottom of the  function
            var trck = new Tracking(elem, 'Resultlistingb');
            $(document).trigger('template.loaded');
        };
        return Resultlistingb;
    }
);
