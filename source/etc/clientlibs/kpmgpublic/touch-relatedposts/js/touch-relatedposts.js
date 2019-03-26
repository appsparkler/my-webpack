define(['jquery', 'underscore', 'tracking', 'handlebars', 'precompile', 'genericErrorDialog', 'helpers', 'personalizationUtils', 'cqservice'],
    function($, _, Tracking, Handlebars,  PrecompiledHandlebars, genericErrorDialog, Helpers, personalizationUtils, Service) {
        'use strict';

        var TouchRelatedposts = function(elem) {
            if (personalizationUtils.commonUtils.isDomInitialized(elem)) {
                return;
            }
            personalizationUtils.commonUtils.initializeDom(elem);

            var compName = 'touch-promotional',
                promoTemplate = PrecompiledHandlebars[compName],
                $blogsContainerDom = $('.content-wrapper', elem),
                $headingDom = $('.relatedposts-heading', elem),
                resultsCount = $blogsContainerDom.data('items') || 3,
                zthesIdQueryStr = getZthesIdQueryStr(),
                url = $blogsContainerDom.data('path'),
                snpParams = window.kpmgPersonalize.snp.params,
                timeboxParamVal=$blogsContainerDom.data('timeboxparam'),
                alteredUrl;

            if (zthesIdQueryStr) {
                alteredUrl = url.replace(/q=(.*?)-id:\(/, zthesIdQueryStr + ' -id:(');
                //appending the timebox param into the url only for personalized results.
                var modified_url = url.split("&fq=templatepath:");
                if(modified_url.length>1){
                    alteredUrl=modified_url[0]+timeboxParamVal+"&fq=templatepath:"+modified_url[1];
                }
                fetchRelatedPosts(alteredUrl, checkResultCount);
            } else {
                fetchRelatedPosts(url, renderRelatedPosts);
            }

            function getZthesIdQueryStr() {
                var metaObject = personalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
                    queryKeys = {
                        KPMG_Industry_ID_Loc: 'sl-industry-id-local',
                        KPMG_Topic_ID: 'sl-topics-id',
                        KPMG_Service_ID_Loc: 'sl-service-id-local'
                    },
                    queryArr = [],
                    queryStr = '',
                    userInterests;

                if (metaObject.KPMG_Template_Type === 'touch-blog-post-template') {
                    userInterests = personalizationUtils.accountUtils.getCategoryPreferences().split(',');

                    Object.keys(queryKeys).forEach(function(key) {
                        var metaTag, commonZthesIds,
                            subQueryArr = [];

                        if (metaObject[key]) {
                            metaTag = metaObject[key].split(',');
                            commonZthesIds = _.intersection(metaTag, userInterests);
                            if (commonZthesIds.length) {
                                for (var i = 0; i < commonZthesIds.length; i++) {
                                    subQueryArr.push(queryKeys[key] + ':"' + commonZthesIds[i] + '"');
                                }
                                queryArr.push(subQueryArr.join(' | '));
                            }
                        }
                    });

                    if (queryArr.length) {
                        queryStr = queryArr.join(' | ');
                    }
                }

                return queryStr ? ('q=' + queryStr) : queryStr;
            }

            function fetchRelatedPosts(url, cb) {
                var options = {
                        baseUrl: url
                    },
                    relatedContentService = new Service('relatedPosts', options);

                relatedContentService.SOLRFetch(cb, 'results', resultsCount, 0);
            }

            function checkResultCount(data) {
                if (data.length < 3) {
                    fetchRelatedPosts(url, renderRelatedPosts);
                } else {
                    renderRelatedPosts(data);
                }
            }

            function renderRelatedPosts(results) {
                var blogDom = '',
                    blogsDom = '',
                    rowBlogs = [],
                    data = {},
                    date = '',
                    topic = '',
                    formattedDate = '',
                    totalBlogs = results;

                $('.web-spinner', elem).hide();

                if(Array.isArray(totalBlogs) && totalBlogs.length >= 3) {
                    $headingDom.removeClass('hidden');
                    rowBlogs = totalBlogs.splice(0,3);//Get the first 3 blogs from totalBlogs array everytime when user clicks loadmore

                    for(var i=0; i<rowBlogs.length; i++) {
                        date = rowBlogs[i].articleDate;
                        date = date.replace(/Z/gi, '');
                        topic = (rowBlogs[i].blogTopics && rowBlogs[i].blogTopics.split('/')[0]) || '';

                        if(date && window.calanderProperties && window.dateFormatProperties) {
                            formattedDate = Helpers.dateFormat(date, window.calanderProperties, window.dateFormatProperties);
                        } else if (date) {
                            formattedDate = date;
                        }

                        data = {
                            'hbs': {
                                'promotional': {
                                    'title': rowBlogs[i].shortTitle,
                                    'shortTitle': rowBlogs[i].shortTitle,
                                    'longDescription': rowBlogs[i].shortDescription,
                                    'shortDescription': rowBlogs[i].shortDescription,
                                    'imageFileReference': rowBlogs[i].imageFileReference,
                                    'primaryUrl': rowBlogs[i].primaryCTAURL,
                                    'altText': rowBlogs[i].imageAltText,
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

                    $blogsContainerDom.append(blogsDom);
                } else {
                    $(elem).addClass('hidden');
                }
            }

            $(elem).on('keyup', 'a', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $(elem).on('keydown', 'a', function(e) {
                if( e.which === 9 ) {
                    $(this).removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

			// Keep the following lines at the bottom of the TouchRelatedposts function
            var trck = new Tracking(elem, 'TouchRelatedposts');
			$(document).trigger('template.loaded');
        };

        return TouchRelatedposts;
    }
);
