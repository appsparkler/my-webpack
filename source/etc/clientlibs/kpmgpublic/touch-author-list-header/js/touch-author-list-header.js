define(['jquery', 'tracking', 'handlebars', 'precompile', 'genericErrorDialog', 'helpers', 'personalizationUtils', 'common-utils'],
    function($, Tracking, Handlebars, PrecompiledHandlebars, genericErrorDialog, Helpers, PersonalizationUtils, CommonUtils) {
        'use strict';

        var TouchAuthorListHeader = function(elem) {
            var snpParams = window.kpmgPersonalize.snp.params,
                totalBlogs = [],
                $blogsContainerDom = $('.details-container>.content-wrapper', elem),
                $loader = $('.web-spinner', elem),
                $noResultsDom = $('.details-container>.no-results',elem),
                compName = 'touch-promotional',
                promoTemplate = PrecompiledHandlebars[compName],
                currentAuthor = $('.inline-list-elements').data('author-name').split('.')[0],
                defaultBlogsCount = 9,
                currentPage = 1,
                loadMoreCounter = 0,
                isMobile = PersonalizationUtils.commonUtils.isMobile(),
                loadCount = isMobile ? 3 : 9,
                loadMore = false;

            function fetchSiteBlogs(count) {
                var deferred = $.Deferred(),
                url = '/search/?',
                paramData = 'all_sites=false&facets=false&sort=KPMG_Filter_Date&x1=KPMG_Tab_Type&q1=Blogs&x2=KPMG_Template_Type&q2=touch-blog-post-template&x3=KPMG_Blog_Author&q3='+currentAuthor;

                paramData += '&sp_c=' + count;
                paramData += '&page=' + currentPage;

                if(snpParams && snpParams.languageCode && snpParams.countryCode) {
                    paramData += "&language=" + snpParams.languageCode;
                    paramData += "&site=" + snpParams.countryCode + "_" + snpParams.languageCode;
                }

                url += paramData;

                $.ajax({
                    url: url,
                    success: function (response) {
                        deferred.resolve(response);
                    },
                    error: function (response) {
                        deferred.reject();
                    }
                });

                return deferred;
            }

            function compileAuthorDetailsBlogs(authorsList) {
                var blogDom = '',
                    blogsDom = '',
                    data = {},
                    date = '',
                    topic = '',
                    formattedDate = '';
                if(Array.isArray(authorsList) && authorsList.length > 0) {
                    for(var i=0; i<authorsList.length; i++) {
                        date = authorsList[i].KPMG_Blog_Date_Time;
                        topic = (authorsList[i].KPMG_Blog_Topics && authorsList[i].KPMG_Blog_Topics.split('|')[0]) || '';
                        if(date && window.calanderProperties && window.dateFormatProperties) {
                            formattedDate = Helpers.dateFormat(date, window.calanderProperties, window.dateFormatProperties);
                        } else if (date) {
                            formattedDate = date;
                        }
                        data = {
                            'hbs': {
                                'promotional': {
                                    'title': authorsList[i].KPMG_Title,
                                    'shortTitle': authorsList[i].KPMG_Title,
                                    'longDescription': authorsList[i].KPMG_Description,
                                    'shortDescription': authorsList[i].KPMG_Short_Desc,
                                    'imageFileReference': authorsList[i].KPMG_Image,
                                    'primaryUrl': authorsList[i].KPMG_URL,
                                    'altText': authorsList[i].KPMG_Title,
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

                    if(blogsDom) {
                        $blogsContainerDom.append(blogsDom);
                    }
                }
                else {
                    $noResultsDom.removeClass('hidden');
                }
            }

            function showGenericErrorDialog() {
                genericErrorDialog.showDialog();
            }

            function renderAuthorBlogs(result) {
                $loader.hide();
                var currentResults = [];
                if( result &&
                    result['customer-results'] && result['customer-results'].resultset &&
                    result['customer-results'].resultset.results && result['customer-results'].resultset.results.result ) {
                    currentResults = result['customer-results'].resultset.results.result;
                }

                if( result &&
                    result['customer-results'] && result['customer-results'].pagination &&
                    result['customer-results'].pagination['next-page']
                ) {
                    loadMore = true;
                    if(isMobile) {
                        if(currentPage === 1) {
                            currentPage += Math.round(defaultBlogsCount / loadCount);
                        } else {
                            currentPage += 1;
                        }
                    } else {
                        currentPage += 1;
                    }
                } else {
                    loadMore = false;
                }

                compileAuthorDetailsBlogs(currentResults);
            }

            function initializeComponent() {
                if(window.kpmgPersonalize.misc.isAuthor) {
                    return false;
                }

                $.when(fetchSiteBlogs(defaultBlogsCount))
                    .done(renderAuthorBlogs)
                    .fail(showGenericErrorDialog);
            }

            initializeComponent();

            $(elem).on('keyup', '.list-item, a, .inline-list-elements', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $(elem).on('keydown', '.list-item, a, .inline-list-elements', function(e) {
                if( e.which === 9 ) {
                    $(this).removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

            $('.inline-list-elements', elem).on('click', '.social-link', function(e) {
                var linkName = $(e.target).closest('.inline-list-elements').find('.list-item-title').text();
                trck.track('componentLink', linkName, false, $(this).text());
            });

            $(window).on('scroll', function() {
                var scrollDown = false;

                if($('.content-wrapper>div:last', elem)[0]) {
                    scrollDown = CommonUtils.isScrolledIntoView($('.content-wrapper>div:last', elem)[0]);
                }

                if(scrollDown && loadMore && !$loader.is(':visible')) {
                    $loader.show();
                    $.when(fetchSiteBlogs(loadCount))
                        .done(renderAuthorBlogs)
                        .fail(showGenericErrorDialog);

                    window.digitalData.page.article.loadSection = ++loadMoreCounter;
                }
            });

			// Keep the following lines at the bottom of the TouchAuthorListHeader function
            var trck = new Tracking(elem, 'TouchAuthorListHeader');
			$(document).trigger('template.loaded');
        };

        return TouchAuthorListHeader;
    }
);
