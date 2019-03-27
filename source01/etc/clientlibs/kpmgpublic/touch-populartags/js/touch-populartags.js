define(['jquery', 'tracking', 'genericErrorDialog'],
    function($, Tracking, genericErrorDialog) {
        'use strict';

        var TouchPopulartags = function(elem) {
            var snpParams = window.kpmgPersonalize.snp.params;

            function fetchPopularTags() {
                var snpCacheData = getSetSnPCache(),
                    url = '/search?',
                    paramData = '',
                    deferred = $.Deferred();

                if(snpCacheData && Array.isArray(snpCacheData) && snpCacheData.length) {
                    //resolve the popular tags array from cache
                    deferred.resolve(snpCacheData);
                } else {
                    paramData = 'all_sites=false&x1=KPMG_Tab_Type&q1=Blogs&facets=true';
                    if(snpParams && snpParams.languageCode && snpParams.countryCode) {
                        paramData += "&language=" + snpParams.languageCode;
                        paramData += "&site=" + snpParams.countryCode + "_" + snpParams.languageCode;
                    }

                    url += paramData;

                    $.ajax({
                        url: url
                    })
                    .done(function(results) {
                        var facetsArray = results && results['facet-results'] && results['facet-results']['facets-rail'] && results['facet-results']['facets-rail'].facet,
                            popularTagObjs = {},
                            popularTagList = [],
                            IndPathArr = [],
                            ServicePthArr = [],
                            TopicPathArr = [];

                        if(Array.isArray(facetsArray) && facetsArray.length > 0) {
                            popularTagObjs = facetsArray.filter( function(facet) {                                
                                if( (facet['facet-title'] === 'KPMG_Ind_Path_Loc') || 
                                    (facet['facet-title'] === 'KPMG_Service_Pth_Loc') || 
                                    (facet['facet-title'] === 'KPMG_Topic_Path') ){
                                    return true;
                                }
                            });

                            IndPathArr = popularTagObjs && popularTagObjs[0] && popularTagObjs[0]['facet-values'] && popularTagObjs[0]['facet-values']['facet-item'];
                            ServicePthArr = popularTagObjs && popularTagObjs[1] && popularTagObjs[1]['facet-values'] && popularTagObjs[1]['facet-values']['facet-item'];
                            TopicPathArr = popularTagObjs && popularTagObjs[2] && popularTagObjs[2]['facet-values'] && popularTagObjs[2]['facet-values']['facet-item'];

                            popularTagList = IndPathArr.concat( ServicePthArr, TopicPathArr );

                            // Move all facet-children to single level and sort.
                            popularTagList = moveAllToSingleLevelAndSorted(popularTagList);

                            if(Array.isArray(popularTagList) && popularTagList.length > 0) {
                                popularTagList = popularTagList.splice(0,7);
                                popularTagList = getSetSnPCache(popularTagList);
                                deferred.resolve(popularTagList);
                            }
                        }
                    })
                    .fail(function() {
                        deferred.reject();
                    });
                }

                return deferred;
            }

            /*
                // ...PURPOSE...
                // Move facet-children from level 3 to level 2.
                // Remove object with Title - All.
                // Sort array based on facet count in descending order.
            */
            function moveAllToSingleLevelAndSorted(pPopularArrList){
                var pNewArrayList = [];

                // loop through all the objects
                for(var i=0 ; i < pPopularArrList.length ; i++ ){
                    // ignore ALL
                    if(pPopularArrList[i]['facet-name'].toUpperCase() === "ALL" ){
                        continue;
                    }
                    pNewArrayList.push(pPopularArrList[i]);

                    // loop through Level-3 if available
                    if( pPopularArrList[i].hasOwnProperty('facet-has-children')  ){
                        for(var y=0; y < pPopularArrList[i]['facet-children']['facet-child'].length ; y++ ){
                            pNewArrayList.push(pPopularArrList[i]['facet-children']['facet-child'][y] );
                        }
                    }
                }

                pNewArrayList.sort(function(a, b) {
                    return parseInt(b['facet-count']) - parseInt(a['facet-count']);                    
                });

                return pNewArrayList;
            }

            function renderPopularTagsList(blogTagsArray) {
                var $popularTagsDom = $('.popular-tags-list', elem),
                    popularTag = '',
                    facetName = '',
                    href = '',
                    customHref = '';

                if(Array.isArray(blogTagsArray) && blogTagsArray.length > 0) {
                    for(var i=0; i<blogTagsArray.length; i++) {
                        facetName = blogTagsArray[i]['facet-name'] ? (blogTagsArray[i]['facet-name']).trim() : '';
                        customHref  = blogTagsArray[i].link.replace("facets=true", "facets=false").replace("&i=1","");
                        
                        href = $popularTagsDom.data('search') + customHref;
                        popularTag += '<li class="list-item"><a href="' + href + '">' + facetName + ' (' + blogTagsArray[i]['facet-count'] + ')</a></li>';
                    }

                    $popularTagsDom.html(popularTag);
                }
            }

            function showGenericErrorDialog() {
                genericErrorDialog.showDialog();
            }

            function initializeComponent() {
                if(window.kpmgPersonalize.misc.isAuthor) {
                    return false;
                }

                $.when(fetchPopularTags())
                    .done(renderPopularTagsList)
                    .fail(showGenericErrorDialog);
            }

            function getSnPCacheKey() {
                var snpCacheKey,
                    snpCacheKeyArr = [];

                snpCacheKeyArr.push("g", snpParams.countryCode, snpParams.languageCode);

                snpCacheKey = snpCacheKeyArr.join('||');

                return snpCacheKey;
            }

            function getSetSnPCache(data) {
                var parsedSnpData = [],
                    snpCacheKey = getSnPCacheKey();

                //To ensure that snpCacheData is declared and initialized in sessionStorage
                sessionStorage.popularTags = sessionStorage.popularTags || '{}';
                parsedSnpData = JSON.parse(sessionStorage.popularTags);

                //If data is passed, update the cache
                if (data) {
                    //Limit caching to maximum of 6 entries
                    if (Object.keys(parsedSnpData).length > 6) {
                        delete parsedSnpData[Object.keys(parsedSnpData)[0]];
                    }
                    parsedSnpData[snpCacheKey] = data;
                    sessionStorage.popularTags = JSON.stringify(parsedSnpData);
                }

                return JSON.parse(sessionStorage.popularTags)[snpCacheKey];
            }

            initializeComponent();
			// Keep the following lines at the bottom of the TouchPopulartags function
            var trck = new Tracking(elem, 'TouchPopulartags');
			$(document).trigger('template.loaded');
        };

        return TouchPopulartags;
    }
);
