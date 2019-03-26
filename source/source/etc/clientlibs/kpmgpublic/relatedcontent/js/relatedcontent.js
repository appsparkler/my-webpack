/* global s */
/* global kpmgAssetDomain */
define(['jquery', 'underscore', 'handlebars', 'precompile', 'cqservice', 'tracking', 'helpers', 'addtolibrary', 'personalizationUtils'],
    function ($, _, Handlebars, PrecompiledHandlebars, Service, Tracking, Helpers, AddToLibrary, PersonalizationUtils) {
        'use strict';
        var RelatedContent = function (elem) {
            if (PersonalizationUtils.commonUtils.isDomInitialized(elem)) {
                return;
            }
            PersonalizationUtils.commonUtils.initializeDom(elem);
            var relatedContentPanel = $(".relatedcomponent-innerContainer", elem),
                relatedContentPartial = $('#relatedcontent-partial'),
                compName = 'relatedcontent',
                loadMoreTemplate = PrecompiledHandlebars[compName],
                zthesIdQueryStr = getZthesIdQueryStr(),
                url = relatedContentPanel.data('path'),
                timeboxParamVal=relatedContentPanel.data('timeboxparam'),
                alteredUrl,
                personalizedDefaultdata=[];

            /* /solr/xx_en/select?q=sl-service-id-local:"<<ZtheId's>>" | sl-industry-id-local:"<<ZtheId's>>" | sl-topics-id:"<<ZtheId's>>" -id:("/content/kpmgpublic/xx/en/home/insights/2016/11/hidden-growth-within-family-businesses.html")&fq=templatepath:"/apps/kpmgpublic/templates/article-details-template"&sort=score+desc,articleDate+desc&df=templatepath&wt=xslt&tr=content.xsl */
            if (zthesIdQueryStr) {
                alteredUrl = url.replace(/q=(.*?)-id:\(/, zthesIdQueryStr + ' -id:(');
                //appending the timebox param into the url only for personalized results.
                var modified_url = alteredUrl.split("&fq=templatepath:");
                if(modified_url.length>1){
                    alteredUrl=modified_url[0]+timeboxParamVal+"&fq=templatepath:"+modified_url[1];
                }
                fetchRelatedArticles(alteredUrl, checkResultCount);
            } else {        
                fetchRelatedArticles(url, handleServiceResultForPub);
            }

            function getZthesIdQueryStr() {
                var metaObject = PersonalizationUtils.commonUtils.getMetaObject('meta[name^=KPMG]'),
                    queryKeys = {
                        KPMG_Industry_ID_Loc: 'sl-industry-id-local',
                        KPMG_Topic_ID: 'sl-topics-id',
                        KPMG_Service_ID_Loc: 'sl-service-id-local'
                    },
                    queryArr = [],
                    queryStr = '',
                    userInterests;

                if (metaObject.KPMG_Template_Type === 'article-details-template' || metaObject.KPMG_Template_Type === 'insights-flexible-template') {
                    userInterests = PersonalizationUtils.accountUtils.getCategoryPreferences().split(',');

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

            function fetchRelatedArticles(url, cb) {
                var options = {
                        baseUrl: url
                    },
                    relatedContentService = new Service('relatedContent', options);

                relatedContentService.SOLRFetch(cb, 'results', relatedContentPanel.data('items'), 0);
            }

            function checkResultCount(data) {
                if (data.length < 3) {
                    personalizedDefaultdata=data;
                    fetchRelatedArticles(url, handleServiceResultForPub);
                } else {
                    handleServiceResultForPub(data);
                }
            }

            function handleServiceResultForPub(data) {
                if (typeof personalizedDefaultdata !== 'undefined' && personalizedDefaultdata.length > 0) {
                    var personalizedAndDefaultContent = personalizedDefaultdata.concat(data);
                    var result = [];
                    $.each(personalizedAndDefaultContent, function (i, e) {
                        var matchingItems = $.grep(result, function (item) {
                            return item.shortTitle === e.shortTitle && item.shortDescription === e.shortDescription;
                        });
                        if (matchingItems.length === 0){
                            result.push(e);
                        }
                    });
                    data = result.slice(0, relatedContentPanel.data('items'));
                }
                var resources_html = "",
                    articleDetail = $('.relatedcontent-container').attr('data-articledetail');
                if (kpmgAssetDomain) {
                    data = $.extend(true, data, {"assetDomainName" : kpmgAssetDomain});
                }
                $.each(data, function (index, val) {
                    val.articleDetail = (articleDetail === "true") ? true : false;
                    val.isBlog = ( val.hasOwnProperty('templatepath') ? ((val.templatepath.indexOf('touch-blog-post-template') > -1) ? true : false) : false );
                    resources_html += loadMoreTemplate(val);
                    setTimeout(function () {
                        $('img.lazy').unveil();
                    }, 100);
                });

                if ($('.module-relatedcontent.horizontal').length >= 1 ) {
                    var horizontalRelatedDiv = 4 - data.length;
                    if (data.length  < 4) {
                        for(var i=0; i < horizontalRelatedDiv; i++) {
                            resources_html += "<div class='col-md-12 col-xs-12 relatedcomponent-innerContainer'></div>";
                        }
                    }
                }

                resources_html = resources_html.replace(/relatedcomponent-relatedContentLabel/g, relatedContentPanel.data("readmore"));
                relatedContentPanel.html(resources_html);

                //Accessibility
                $("a", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        if ($(this).parent("li").length > 0) {
                            $(this).parent("li").removeAttr("tabindex").addClass("focusOutline");
                        } else {
                            $(this).removeAttr("tabindex").addClass("focusOutline");
                        }
                    }
                });

                $(".relatedcomponent-innerContainer", elem).on("keydown", function(e) {
                    if (e.which === 13) {
                        window.location.href = $(this).find("a").attr('href');
                    }
                });

                $("a", elem).on("blur", function() {
                    if ($(this).parent("li").length > 0) {
                        $(this).parent("li").removeClass("focusOutline");
                    } else {
                        $(this).removeClass("focusOutline");
                    }
                });

                $('.module-addtolibrary', elem).each(function (index, elem) {
                    var $href = $(this).data('href').replace('/content/kpmgpublic', '');
                    $(this).data('href', $href);
                    AddToLibrary(elem);
                });
            }

            $('.module-relatedcontent').on('click', 'a', function() {
                $(this).parents('[data-article-type]').addClass("selected-article");
                var clonedElement = $('.module-relatedcontent').clone();
                clonedElement.find('.tertiary-head:first').remove();
                clonedElement.find('[data-article-type]').not('.selected-article').remove();
                var tracking = new Tracking(clonedElement, 'RelatedContent'),
                    memberFirm = (window.kpmgPersonalize && window.kpmgPersonalize.snp.params.countryCode && window.kpmgPersonalize.snp.params.countryCode.toUpperCase()) || '',
                    articleTitle = $(this).closest('.relatedcomponent-innerContainer').find('.tertiary-head').text();
                if (memberFirm === "XX") {
                    memberFirm = "GLOBAL";
                }
                window.digitalData.page.pageInfo.industryPath = $(this).closest('[data-article-type]').attr('data-article-type');
                window.digitalData.page.article.articleDetails = articleTitle.concat(' | ', 'KPMG', ' | ', memberFirm);
                tracking.track('componentLink', $(this).closest('.relatedcomponent-innerContainer').find('.tertiary-head').text());
            });

            $('.relatedcomponent-innerContainer').on('click', function(e) {
                if($(e.target).is("div")){
                    e.stopImmediatePropagation();
                    window.location.href = $(this).find('a').attr('href');
                }
            });

            // Keep the following line at the bottom of the relatedContents function
            $(document).trigger('template.loaded');
        };
        //
        return RelatedContent;
    }
);
